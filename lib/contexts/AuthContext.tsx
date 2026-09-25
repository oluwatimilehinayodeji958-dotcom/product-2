"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session, LoginCredentials, UserRole } from '@/lib/types/auth';
import { supabase } from '@/lib/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing auth state on mount
    const savedAuth = localStorage.getItem('eagle_auth_state');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      console.log('Checking session...');
      try {
        const { data: { session: supabaseSession } } = await supabase.auth.getSession();
        console.log('Supabase session:', supabaseSession);
        
        if (supabaseSession) {
          // Fetch user details from editorial_users table
          const { data: editorialUser, error: editorialError } = await supabase
            .from('editorial_users')
            .select('*')
            .eq('email', supabaseSession.user.email)
            .single();

          console.log('Editorial user:', editorialUser);
          console.log('Editorial error:', editorialError);

          if (editorialUser) {
            const mappedUser: User = {
              id: editorialUser.id,
              email: editorialUser.email,
              name: editorialUser.full_name,
              role: editorialUser.role === 'Super Admin' ? 'super_admin' : 
                   editorialUser.role === 'Admin' ? 'admin' : 'editor',
              created_at: editorialUser.created_at,
              updated_at: editorialUser.updated_at,
            };

            const newSession: Session = {
              user: mappedUser,
              token: supabaseSession.access_token,
              expires_at: (supabaseSession.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()) as string,
            };

            setSession(newSession);
            setUser(mappedUser);
            setIsAuthenticated(true);
            localStorage.setItem('eagle_auth_state', 'true');
            console.log('Authentication successful:', mappedUser);
          } else {
            console.error('No editorial user found for email:', supabaseSession.user.email);
            setIsAuthenticated(false);
            localStorage.setItem('eagle_auth_state', 'false');
          }
        } else {
          console.log('No Supabase session found');
          setIsAuthenticated(false);
          localStorage.setItem('eagle_auth_state', 'false');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsAuthenticated(false);
        localStorage.setItem('eagle_auth_state', 'false');
      } finally {
        console.log('Session check complete');
      }
    };

    checkSession();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    console.log('Attempting login for:', credentials.email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.error('Supabase auth error:', error);
      return false;
    }

    console.log('Auth successful, session:', data.session);

    if (data.session) {
      // Fetch user details from editorial_users table
      const { data: editorialUser, error: editorialError } = await supabase
        .from('editorial_users')
        .select('*')
        .eq('email', credentials.email)
        .single();

      if (editorialError) {
        console.error('Editorial users fetch error:', editorialError);
      }

      if (editorialUser) {
        const mappedUser: User = {
          id: editorialUser.id,
          email: editorialUser.email,
          name: editorialUser.full_name,
          role: editorialUser.role === 'Super Admin' ? 'super_admin' : 
               editorialUser.role === 'Admin' ? 'admin' : 'editor',
          created_at: editorialUser.created_at,
          updated_at: editorialUser.updated_at,
        };

        const newSession: Session = {
          user: mappedUser,
          token: data.session.access_token,
          expires_at: (data.session.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()) as string,
        };

        setSession(newSession);
        setUser(mappedUser);
        setIsAuthenticated(true);
        console.log('Login successful for user:', mappedUser);
        localStorage.setItem('eagle_auth_state', 'true');
        return true;
      } else {
        console.error('No editorial user found for email:', credentials.email);
        localStorage.setItem('eagle_auth_state', 'false');
      }
    }

    localStorage.setItem('eagle_auth_state', 'false');
    return false;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAuthenticated(false);
    localStorage.setItem('eagle_auth_state', 'false');
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    
    // Super admin has access to everything
    if (user.role === 'super_admin') return true;
    
    // Admin has access to admin and editor roles
    if (user.role === 'admin' && (role === 'admin' || role === 'editor')) return true;
    
    // Editor only has editor role
    return user.role === role;
  };

  return (
    <AuthContext.Provider value={{ user, session, isAuthenticated, isLoading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

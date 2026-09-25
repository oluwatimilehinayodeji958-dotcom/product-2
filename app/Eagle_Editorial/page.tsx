"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import RichTextEditor from "@/components/RichTextEditor";
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Users, 
  Image as ImageIcon, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Upload,
  Save,
  LogOut,
  Shield,
  Mail,
  Lock,
  AlertCircle,
  AlertTriangle,
  Video,
  Film,
  Play,
  ArrowUp,
  ArrowDown,
  Bold,
  Italic,
  Heading,
  Menu,
  Microscope,
  FlaskConical,
  Building2
} from "lucide-react";
import {
  getGalleryImages,
  getGalleryVideos,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  createGalleryVideo,
  updateGalleryVideo,
  deleteGalleryVideo,
  SupabaseGalleryImage,
  SupabaseGalleryVideo,
} from "@/lib/supabase/gallery";
import { galleryCategories } from "@/lib/hooks/data/gallery";
import { 
  getTeamMembers, 
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  SupabaseTeamMember
} from "@/lib/supabase/team";
import type { TeamCategory } from "@/lib/data/team";
import type { VideoType } from "@/lib/hooks/data/gallery";
import { 
  getEvents, 
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  SupabaseEvent
} from "@/lib/supabase/events";
import Link from "next/link";
import { 
  getAllPublications, 
  createPublication, 
  updatePublication, 
  deletePublication, 
  uploadPublicationFile,
  SupabasePublication 
} from "@/lib/supabase/publications";
import { 
  getEditorialUsers,
  createEditorialUser,
  updateEditorialUser,
  deleteEditorialUser,
  SupabaseEditorialUser
} from "@/lib/supabase/editorial-users";
import { supabase } from "@/lib/supabase/client";
import {
  getAllResearchProjects,
  createResearchProject,
  updateResearchProject,
  deleteResearchProject,
  SupabaseResearchProject
} from "@/lib/supabase/research";
import {
  getResearchPhilosophy,
  createResearchPhilosophy,
  updateResearchPhilosophy,
  deleteResearchPhilosophy,
  ResearchPhilosophy
} from "@/lib/supabase/research-sections";
import {
  getResearchAreas,
  createResearchArea,
  updateResearchArea,
  deleteResearchArea,
  ResearchArea
} from "@/lib/supabase/research-sections";
import {
  getResearchMethodology,
  createResearchMethodology,
  updateResearchMethodology,
  deleteResearchMethodology,
  ResearchMethodology
} from "@/lib/supabase/research-sections";
import {
  getResearchCollaborations,
  createResearchCollaboration,
  updateResearchCollaboration,
  deleteResearchCollaboration,
  ResearchCollaboration
} from "@/lib/supabase/research-sections";

// Helper function to format time ago
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;
  return `${Math.floor(seconds / 31536000)} years ago`;
}

export default function EditorialPortal() {
  const { user, isAuthenticated, logout, isLoading, login } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    // Load active tab from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('eagle_editorial_active_tab');
      return savedTab || 'dashboard';
    }
    return 'dashboard';
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPublication, setEditingPublication] = useState<any>(null);
  const [publicationCount, setPublicationCount] = useState(0);
  const [publicationsList, setPublicationsList] = useState<SupabasePublication[]>([]);
  const [loadingPublications, setLoadingPublications] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Individual loading states for each section
  const [isSubmittingTeam, setIsSubmittingTeam] = useState(false);
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isSubmittingGallery, setIsSubmittingGallery] = useState(false);
  const [isSubmittingResearch, setIsSubmittingResearch] = useState(false);
  
  // Gallery Admin states
  const [galleryImagesList, setGalleryImagesList] = useState<SupabaseGalleryImage[]>([]);
  const [galleryVideosList, setGalleryVideosList] = useState<SupabaseGalleryVideo[]>([]);
  const [gallerySubTab, setGallerySubTab] = useState<"images" | "videos">("images");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingImage, setEditingImage] = useState<SupabaseGalleryImage | null>(null);
  const [editingVideo, setEditingVideo] = useState<SupabaseGalleryVideo | null>(null);
  const [teamList, setTeamList] = useState<SupabaseTeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<SupabaseTeamMember | null>(null);
  
  // Editorial Users Management states
  const [editorialUsersList, setEditorialUsersList] = useState<SupabaseEditorialUser[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<SupabaseEditorialUser | null>(null);
  const [userFormData, setUserFormData] = useState({
    id: "",
    email: "",
    full_name: "",
    role: "Editor" as "Super Admin" | "Admin" | "Editor",
    password: "",
    is_active: true,
  });
  
  // Critical warning modal state
  const [showCriticalWarning, setShowCriticalWarning] = useState(false);
  const [criticalWarningMessage, setCriticalWarningMessage] = useState("");
  const [criticalWarningType, setCriticalWarningType] = useState<"self_delete" | "protected_user">("self_delete");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingDeleteEmail, setPendingDeleteEmail] = useState<string | null>(null);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState("");
  
  // Password update state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });
  const [teamFormData, setTeamFormData] = useState({
    id: "",
    slug: "",
    name: "",
    title: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    officeLocation: "",
    profileImage: "",
    biography: "",
    researchInterests: "",
    qualifications: "",
    orcid_url: "",
    googleScholar_url: "",
    researchgate_url: "",
    linkedin_url: "",
    x_url: "",
    instagram_url: "",
    facebook_url: "",
    cv_url: "",
    category: "Research Staff" as TeamCategory,
    featured: false,
    display_order: 0,
    active: true,
    imageFile: null as File | null,
    cvFile: null as File | null
  });
  
  // Gallery Form States
  const [imageFormData, setImageFormData] = useState({
    title: "",
    caption: "",
    category: "Laboratory",
    image_url: "",
    imageFile: null as File | null,
    featured: false,
    display_order: 0,
    event_date: ""
  });

  const [videoFormData, setVideoFormData] = useState({
    title: "",
    caption: "",
    category: "Laboratory",
    video_type: "youtube" as VideoType,
    video_url: "",
    thumbnail_url: "",
    featured: false,
    display_order: 0,
    event_date: ""
  });

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const [images, videos] = await Promise.all([getGalleryImages(), getGalleryVideos()]);
        setGalleryImagesList(images);
        setGalleryVideosList(videos);
      } catch (error) {
        console.error("Error loading gallery data:", error);
      }
    };
    fetchGalleryData();
  }, []);

  const saveImagesList = (newList: SupabaseGalleryImage[]) => {
    setGalleryImagesList(newList);
  };

  const saveVideosList = (newList: SupabaseGalleryVideo[]) => {
    setGalleryVideosList(newList);
  };

  const persistImageOrderAndFeatured = async (newList: SupabaseGalleryImage[]) => {
    setGalleryImagesList(newList);
    try {
      await Promise.all(
        newList.map((item) =>
          updateGalleryImage(item.id, {
            display_order: item.display_order,
            featured: item.featured,
          })
        )
      );
    } catch (error) {
      console.error("Error persisting image order/featured state:", error);
    }
  };

  const persistVideoOrderAndFeatured = async (newList: SupabaseGalleryVideo[]) => {
    setGalleryVideosList(newList);
    try {
      await Promise.all(
        newList.map((item) =>
          updateGalleryVideo(item.id, {
            display_order: item.display_order,
            featured: item.featured,
          })
        )
      );
    } catch (error) {
      console.error("Error persisting video order/featured state:", error);
    }
  };

  const saveTeamList = (newList: SupabaseTeamMember[]) => {
    setTeamList(newList);
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      setTeamLoading(true);
      const members = await getAllTeamMembers();
      setTeamList(members);
      setTeamLoading(false);
    };
    fetchTeamData();
  }, []);

  useEffect(() => {
    const fetchEditorialUsers = async () => {
      const users = await getEditorialUsers();
      setEditorialUsersList(users);
    };
    fetchEditorialUsers();
  }, []);

  const fetchPublications = async () => {
    try {
      setLoadingPublications(true);
      const pubs = await getAllPublications();
      setPublicationsList(pubs);
      setPublicationCount(pubs.length);
    } catch (e) {
      console.error("Error loading publications:", e);
    } finally {
      setLoadingPublications(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);
  
  const handleTeamInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setTeamFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleTeamImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTeamFormData((prev: any) => ({ ...prev, imageFile: file }));
  };

  const handleTeamCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTeamFormData((prev: any) => ({ ...prev, cvFile: file }));
  };

  // User Management handlers
  const handleAddUser = () => {
    setEditingUser(null);
    setUserFormData({
      id: "",
      email: "",
      full_name: "",
      role: "Editor",
      password: "",
      is_active: true,
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user: SupabaseEditorialUser) => {
    setEditingUser(user);
    setUserFormData({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      password: "",
      is_active: user.is_active,
    });
    setShowUserModal(true);
  };

  const canDeleteUser = (currentUserRole: string, currentUserEmail: string, targetUserRole: string, targetUserEmail: string): boolean => {
    const MAIN_SUPER_ADMIN_EMAIL = 'eaglesresearchlaboratory@gmail.com';
    
    // Main superadmin can delete everyone
    if (currentUserEmail === MAIN_SUPER_ADMIN_EMAIL) {
      return true;
    }
    
    // Other superadmins can delete themselves and anyone except main superadmin
    if (currentUserRole === 'super_admin') {
      return targetUserEmail !== MAIN_SUPER_ADMIN_EMAIL;
    }
    
    // Admin and Editor can only delete themselves
    if (currentUserRole === 'admin' || currentUserRole === 'editor') {
      return currentUserEmail === targetUserEmail;
    }
    
    return false;
  };

  const handleDeleteUser = async (id: string, email: string) => {
    const SUPER_ADMIN_EMAIL = 'eaglesresearchlaboratory@gmail.com';
    
    // Prevent deleting the main superadmin
    if (email === SUPER_ADMIN_EMAIL) {
      setCriticalWarningType("protected_user");
      setCriticalWarningMessage('CRITICAL SECURITY WARNING: You cannot delete the main Super Admin account (eaglesresearchlaboratory@gmail.com). This account is essential for system administration.');
      setShowCriticalWarning(true);
      return;
    }
    
    // Serious warning if user is trying to delete their own account
    if (user?.email === email) {
      setCriticalWarningType("self_delete");
      setCriticalWarningMessage(
        '⚠️ CRITICAL WARNING ⚠️\n\n' +
        'You are about to DELETE YOUR OWN ACCOUNT!\n\n' +
        'This action is IRREVERSIBLE and will:\n' +
        '• Immediately log you out of the system\n' +
        '• Delete all your access and permissions\n' +
        '• Remove you from the editorial team\n\n' +
        'Type "DELETE" below to confirm.'
      );
      setPendingDeleteId(id);
      setPendingDeleteEmail(email);
      setDeleteConfirmationInput("");
      setShowCriticalWarning(true);
    } else {
      if (!confirm("Are you sure you want to delete this user?")) return;
      const success = await deleteEditorialUser(id);
      if (success) {
        setEditorialUsersList(editorialUsersList.filter(u => u.id !== id));
      }
    }
  };

  const handleCriticalWarningConfirm = async () => {
    if (criticalWarningType === "protected_user") {
      setShowCriticalWarning(false);
      return;
    }
    
    if (criticalWarningType === "self_delete") {
      if (deleteConfirmationInput !== "DELETE") {
        alert('Please type "DELETE" to confirm.');
        return;
      }
      
      if (pendingDeleteId && pendingDeleteEmail) {
        const success = await deleteEditorialUser(pendingDeleteId);
        if (success) {
          setEditorialUsersList(editorialUsersList.filter(u => u.id !== pendingDeleteId));
          await logout();
        }
      }
    }
    
    setShowCriticalWarning(false);
    setDeleteConfirmationInput("");
    setPendingDeleteId(null);
    setPendingDeleteEmail(null);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match" });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }
    
    setIsUpdatingPassword(true);
    setPasswordMessage({ type: "", text: "" });
    
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });
      
      if (error) {
        setPasswordMessage({ type: "error", text: error.message });
      } else {
        setPasswordMessage({ type: "success", text: "Password updated successfully" });
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      setPasswordMessage({ type: "error", text: "Failed to update password" });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setUserFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingUser) {
        // Update existing user
        const updated = await updateEditorialUser(editingUser.id, {
          email: userFormData.email,
          full_name: userFormData.full_name,
          role: userFormData.role,
          is_active: userFormData.is_active,
          password: userFormData.password || undefined,
        });
        if (updated) {
          setEditorialUsersList(editorialUsersList.map(u => u.id === editingUser.id ? updated : u));
          setShowUserModal(false);
          setEditingUser(null);
          setUserFormData({
            id: "",
            email: "",
            full_name: "",
            role: "Editor",
            password: "",
            is_active: true,
          });
        } else {
          alert("Failed to update user. Check console for details.");
        }
      } else {
        // Create new user
        if (!userFormData.password) {
          alert("Password is required for new users");
          setIsSubmitting(false);
          return;
        }
        const created = await createEditorialUser({
          email: userFormData.email,
          full_name: userFormData.full_name,
          role: userFormData.role,
          is_active: userFormData.is_active,
          password: userFormData.password,
        });
        if (created) {
          setEditorialUsersList([...editorialUsersList, created]);
          setShowUserModal(false);
          setEditingUser(null);
          setUserFormData({
            id: "",
            email: "",
            full_name: "",
            role: "Editor",
            password: "",
            is_active: true,
          });
        } else {
          alert("Failed to create user. The email may already be registered. Please try a different email or check the console for details.");
        }
      }
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetTeamForm = () => {
    setTeamFormData({
      id: "",
      slug: "",
      name: "",
      title: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      officeLocation: "",
      profileImage: "",
      biography: "",
      researchInterests: "",
      qualifications: "",
      orcid_url: "",
      googleScholar_url: "",
      researchgate_url: "",
      linkedin_url: "",
      x_url: "",
      instagram_url: "",
      facebook_url: "",
      cv_url: "",
      category: "Research Staff" as TeamCategory,
      featured: false,
      display_order: teamList.length + 1,
      active: true,
      imageFile: null,
      cvFile: null
    });
  };

  const handleAddTeamMember = () => {
    setEditingTeamMember(null);
    resetTeamForm();
    setShowTeamModal(true);
  };

  const handleEditTeamMember = (member: SupabaseTeamMember) => {
    setEditingTeamMember(member);
    setTeamFormData({
      id: member.id,
      slug: (member.full_name || '').toLowerCase().replace(/\s+/g, '-'),
      name: member.full_name || '',
      title: member.title || '',
      role: member.role || '',
      department: '',
      email: member.email || '',
      phone: '',
      officeLocation: '',
      profileImage: member.image_url || '',
      biography: member.bio || '',
      researchInterests: (member.research_interests || []).join(", "),
      qualifications: '',
      orcid_url: '',
      googleScholar_url: '',
      researchgate_url: '',
      linkedin_url: member.linkedin_url || "",
      x_url: member.x_url || "",
      instagram_url: member.instagram_url || "",
      facebook_url: member.facebook_url || "",
      cv_url: member.cv_url || '',
      category: 'Research Staff' as TeamCategory,
      featured: !!member.is_active,
      display_order: member.display_order ?? 0,
      active: member.is_active ?? true,
      imageFile: null,
      cvFile: null
    });
    setShowTeamModal(true);
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;
    
    const memberToDelete = teamList.find(m => m.id === id);
    const success = await deleteTeamMember(id);
    
    if (success) {
      setTeamList(teamList.filter((member) => member.id !== id));
      
      // Delete from Cloudinary after Supabase deletion succeeds
      if (memberToDelete?.image_url) {
        try {
          await fetch('/api/cloudinary/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId: memberToDelete.image_url })
          });
        } catch (err) {
          console.error('Failed to delete Cloudinary image:', err);
        }
      }
    }
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTeam(true);
    
    try {
      // First, save to Supabase without uploading to Cloudinary yet
      const member: Omit<SupabaseTeamMember, "id" | "created_at" | "updated_at"> = {
        full_name: teamFormData.name,
        role: teamFormData.role,
        title: teamFormData.title || undefined,
        bio: teamFormData.biography || undefined,
        image_url: teamFormData.profileImage || undefined,
        email: teamFormData.email || undefined,
        linkedin_url: teamFormData.linkedin_url || undefined,
        x_url: teamFormData.x_url || undefined,
        instagram_url: teamFormData.instagram_url || undefined,
        facebook_url: teamFormData.facebook_url || undefined,
        cv_url: teamFormData.cv_url || undefined,
        research_interests: teamFormData.researchInterests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        is_active: teamFormData.active,
        display_order: teamFormData.display_order,
      };

      let savedItem: any = null;
      let oldImageUrl: string | undefined = editingTeamMember?.image_url;
      let oldCvUrl: string | undefined = editingTeamMember?.cv_url;

      if (editingTeamMember) {
        const updated = await updateTeamMember(editingTeamMember.id, member);
        if (updated) {
          savedItem = updated;
          setTeamList(teamList.map((item) => (item.id === editingTeamMember.id ? updated : item)));
        } else {
          console.error("Failed to update team member - updateTeamMember returned null");
        }
      } else {
        const created = await createTeamMember(member);
        if (created) {
          savedItem = created;
          setTeamList([...teamList, created]);
        } else {
          console.error("Failed to create team member - createTeamMember returned null");
        }
      }

      // If Supabase save failed, stop here
      if (!savedItem) {
        alert("Failed to save team member. Please try again. Check the browser console for detailed error information.");
        return;
      }

      // If there's a new image file, upload to Cloudinary AFTER Supabase save is confirmed
      if (teamFormData.imageFile) {
        try {
          const fd = new FormData();
          fd.append('file', teamFormData.imageFile);
          const res = await fetch('/api/cloudinary/upload', { method: 'POST', body: fd });
          if (!res.ok) {
            console.error('Cloudinary upload failed:', await res.text());
            alert('Image upload failed. Team member saved to database but image not uploaded.');
            return;
          }
          const json = await res.json();
          const newImageUrl = json.secure_url;

          // Update Supabase with the new Cloudinary URL
          const updatedWithImage = await updateTeamMember(savedItem.id, { image_url: newImageUrl });
          if (updatedWithImage) {
            setTeamList(teamList.map((item) => (item.id === savedItem.id ? updatedWithImage : item)));
            savedItem = updatedWithImage;
            
            // If Supabase update with new image URL succeeded, delete old Cloudinary image
            if (oldImageUrl) {
              try {
                await fetch('/api/cloudinary/delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ publicId: oldImageUrl })
                });
              } catch (err) {
                console.error('Failed to delete old Cloudinary image:', err);
              }
            }
          }
        } catch (err) {
          console.error('Team member image upload error:', err);
          alert('Image upload failed. Team member saved to database but image not uploaded.');
        }
      }

      // If there's a new CV file, upload to Cloudinary AFTER Supabase save is confirmed
      if (teamFormData.cvFile) {
        try {
          const fd = new FormData();
          fd.append('file', teamFormData.cvFile);
          const res = await fetch('/api/cloudinary/upload', { method: 'POST', body: fd });
          if (!res.ok) {
            console.error('Cloudinary CV upload failed:', await res.text());
            alert('CV upload failed. Team member saved to database but CV not uploaded.');
            return;
          }
          const json = await res.json();
          const newCvUrl = json.secure_url;

          // Update Supabase with the new CV URL
          const updatedWithCv = await updateTeamMember(savedItem.id, { cv_url: newCvUrl });
          if (updatedWithCv) {
            setTeamList(teamList.map((item) => (item.id === savedItem.id ? updatedWithCv : item)));
            
            // If Supabase update with new CV URL succeeded, delete old CV from Cloudinary
            if (oldCvUrl) {
              try {
                await fetch('/api/cloudinary/delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ publicId: oldCvUrl })
                });
              } catch (err) {
                console.error('Failed to delete old CV from Cloudinary:', err);
              }
            }
          }
        } catch (err) {
          console.error('Team member CV upload error:', err);
          alert('CV upload failed. Team member saved to database but CV not uploaded.');
        }
      }

      alert(editingTeamMember ? "Team member updated successfully!" : "Team member added successfully!");
      setShowTeamModal(false);
      setEditingTeamMember(null);
      setTeamFormData({
        id: "",
        slug: "",
        name: "",
        title: "",
        role: "Researcher",
        department: "",
        email: "",
        phone: "",
        officeLocation: "",
        profileImage: "",
        biography: "",
        researchInterests: "",
        qualifications: "",
        orcid_url: "",
        googleScholar_url: "",
        researchgate_url: "",
        linkedin_url: "",
        x_url: "",
        instagram_url: "",
        facebook_url: "",
        cv_url: "",
        category: "Research Staff" as TeamCategory,
        featured: false,
        display_order: 0,
        active: true,
        imageFile: null as File | null,
        cvFile: null as File | null
      });
    } catch (err) {
      console.error("Error saving team member:", err);
      alert("An error occurred while saving the team member.");
    } finally {
      setIsSubmittingTeam(false);
    }
  };

  const handleCloseTeamModal = () => {
    setShowTeamModal(false);
    setEditingTeamMember(null);
    setTeamFormData({
      id: "",
      slug: "",
      name: "",
      title: "",
      role: "Researcher",
      department: "",
      email: "",
      phone: "",
      officeLocation: "",
      profileImage: "",
      biography: "",
      researchInterests: "",
      qualifications: "",
      orcid_url: "",
      googleScholar_url: "",
      researchgate_url: "",
      linkedin_url: "",
      x_url: "",
      instagram_url: "",
      facebook_url: "",
      cv_url: "",
      category: "Research Staff" as TeamCategory,
      featured: false,
      display_order: 0,
      active: true,
      imageFile: null as File | null,
      cvFile: null as File | null
    });
  };

  // Research Activities admin state
  const [researchList, setResearchList] = useState<SupabaseResearchProject[]>([]);
  const [showResearchModal, setShowResearchModal] = useState(false);
  const [editingResearch, setEditingResearch] = useState<SupabaseResearchProject | null>(null);
  const [researchFormData, setResearchFormData] = useState({
    title: "",
    description: "",
    lead_investigator: "",
    funding_source: "",
    start_date: "",
    end_date: "",
    status: "ongoing" as "ongoing" | "completed",
    image_url: "",
    is_featured: false,
    imageFile: null as File | null
  });

  // Research subtab and sub-section state hooks
  const [researchSubTab, setResearchSubTab] = useState<"projects" | "philosophy" | "areas" | "methodology" | "collaborations">("projects");
  const [researchPhilosophyList, setResearchPhilosophyList] = useState<ResearchPhilosophy[]>([]);
  const [researchAreasList, setResearchAreasList] = useState<ResearchArea[]>([]);
  const [researchMethodologyList, setResearchMethodologyList] = useState<ResearchMethodology[]>([]);
  const [researchCollaborationsList, setResearchCollaborationsList] = useState<ResearchCollaboration[]>([]);
  const [showResearchSectionModal, setShowResearchSectionModal] = useState(false);
  const [editingResearchSection, setEditingResearchSection] = useState<any>(null);
  const [researchSectionType, setResearchSectionType] = useState<"philosophy" | "areas" | "methodology" | "collaborations">("philosophy");
  const [researchSectionFormData, setResearchSectionFormData] = useState({
    title: "", // used as name for collaborations
    description: "",
    image_url: "",
    websiteUrl: "",
    display_order: 0,
    imageFile: null as File | null
  });

  // Events admin state and persistence
  const [eventsList, setEventsList] = useState<SupabaseEvent[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [eventFormData, setEventFormData] = useState<any>({
    id: "",
    slug: "",
    title: "",
    category: "Conferences",
    shortDescription: "",
    description: "",
    bannerImage: "",
    venue: "",
    organizer: "",
    registrationLink: "",
    registrationDeadline: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    status: "Upcoming",
    featured: false,
    published: true,
    imageFile: null as File | null
  });

  const resetEventForm = () => {
    setEventFormData({
      id: "",
      slug: "",
      title: "",
      category: "Conferences",
      shortDescription: "",
      description: "",
      bannerImage: "",
      venue: "",
      organizer: "",
      registrationLink: "",
      registrationDeadline: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      status: "Upcoming",
      featured: false,
      published: true,
      imageFile: null
    });
  };

  const saveEventsList = (newList: SupabaseEvent[]) => {
    setEventsList(newList);
  };

  useEffect(() => {
    const fetchEventsData = async () => {
      const events = await getAllEvents();
      setEventsList(events);
    };
    fetchEventsData();
  }, []);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setEventFormData({
      id: "",
      slug: "",
      title: "",
      category: "Conferences",
      shortDescription: "",
      description: "",
      bannerImage: "",
      venue: "",
      organizer: "",
      registrationLink: "",
      registrationDeadline: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      status: "Upcoming",
      featured: false,
      published: true,
      imageFile: null
    });
    setShowEventModal(true);
  };

  const handleEditEvent = (ev: SupabaseEvent) => {
    setEditingEvent(ev);
    setEventFormData({
      id: ev.id,
      slug: ev.slug,
      title: ev.title,
      category: "Conferences",
      shortDescription: "",
      description: ev.description ?? "",
      bannerImage: ev.image_url ?? "",
      venue: ev.location ?? "",
      organizer: "",
      registrationLink: ev.registration_url ?? "",
      registrationDeadline: "",
      startDate: ev.event_date,
      endDate: "",
      startTime: ev.event_time ?? "",
      endTime: "",
      status: ev.status === "upcoming" ? "Upcoming" : ev.status === "ongoing" ? "Ongoing" : "Past",
      featured: ev.is_featured ?? false,
      published: true,
      imageFile: null
    });
    setShowEventModal(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Remove this event?")) return;
    
    const eventToDelete = eventsList.find(e => e.id === id);
    const success = await deleteEvent(id);
    
    if (success) {
      setEventsList(eventsList.filter(e => e.id !== id));
      
      // Delete from Cloudinary after Supabase deletion succeeds
      if (eventToDelete?.image_url) {
        try {
          await fetch('/api/cloudinary/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId: eventToDelete.image_url })
          });
        } catch (err) {
          console.error('Failed to delete Cloudinary image:', err);
        }
      }
    }
  };

  const handleEventInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setEventFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleEventImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEventFormData((prev: any) => ({ ...prev, imageFile: file }));
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEvent(true);
    
    try {
      // First, save to Supabase without uploading to Cloudinary yet
      const ev: SupabaseEvent = {
        id: editingEvent?.id || `evt-${Date.now()}`,
        title: eventFormData.title,
        slug: eventFormData.slug || eventFormData.title.toLowerCase().replace(/\s+/g, "-"),
        description: eventFormData.description || eventFormData.shortDescription || undefined,
        event_date: eventFormData.startDate,
        event_time: eventFormData.startTime || undefined,
        location: eventFormData.venue || undefined,
        image_url: eventFormData.bannerImage || undefined,
        registration_url: eventFormData.registrationLink || undefined,
        is_featured: !!eventFormData.featured,
        status: ((eventFormData.status as any) || "Upcoming").toLowerCase(),
        created_at: (editingEvent && editingEvent.created_at) || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as SupabaseEvent;

      let savedItem: any = null;
      let oldImageUrl: string | undefined = editingEvent?.image_url;

      if (editingEvent) {
        const updated = await updateEvent(editingEvent.id, ev);
        if (updated) {
          savedItem = updated;
          setEventsList(eventsList.map(x => x.id === editingEvent.id ? updated : x));
        }
      } else {
        const created = await createEvent(ev);
        if (created) {
          savedItem = created;
          setEventsList([...eventsList, created]);
        }
      }

      // If Supabase save failed, stop here
      if (!savedItem) {
        alert("Failed to save event. Please try again.");
        return;
      }

      // If there's a new image file, upload to Cloudinary AFTER Supabase save is confirmed
      if (eventFormData.imageFile) {
        try {
          const fd = new FormData();
          fd.append('file', eventFormData.imageFile);
          const res = await fetch('/api/cloudinary/upload', { method: 'POST', body: fd });
          if (!res.ok) {
            console.error('Cloudinary upload failed:', await res.text());
            alert('Image upload failed. Event saved to database but image not uploaded.');
            return;
          }
          const json = await res.json();
          const newImageUrl = json.secure_url;

          // Update Supabase with the new Cloudinary URL
          const updatedWithImage = await updateEvent(savedItem.id, { image_url: newImageUrl });
          if (updatedWithImage) {
            setEventsList(eventsList.map(x => x.id === savedItem.id ? updatedWithImage : x));
            
            // If Supabase update with new image URL succeeded, delete old Cloudinary image
            if (oldImageUrl) {
              try {
                await fetch('/api/cloudinary/delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ publicId: oldImageUrl })
                });
              } catch (err) {
                console.error('Failed to delete old Cloudinary image:', err);
              }
            }
          }
        } catch (err) {
          console.error('Cloudinary upload error:', err);
          alert('Image upload failed. Event saved to database but image not uploaded.');
        }
      }

      alert(editingEvent ? "Event updated successfully!" : "Event added successfully!");
      setShowEventModal(false);
      setEditingEvent(null);
      resetEventForm();
    } catch (err) {
      console.error("Error saving event:", err);
      alert("An error occurred while saving the event.");
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setEditingEvent(null);
  };

  // ── Research Activities handlers ──────────────────────────────────────────
  const DEFAULT_RESEARCH = [
    { id: "r-1", title: "Neural Plasticity in Aging Brains", investigator: "Dr. Sarah Chen", summary: "Investigating how neural networks adapt and reorganize during the aging process, with implications for cognitive decline prevention.", status: "ongoing", image: "/eagle2.png" },
    { id: "r-2", title: "BCI-Enhanced Motor Rehabilitation", investigator: "Dr. Michael Torres", summary: "Developing brain-computer interface systems to enhance motor recovery in stroke patients through neural feedback mechanisms.", status: "ongoing", image: "/eagle3.png" },
    { id: "r-3", title: "Molecular Mechanisms of Memory Formation", investigator: "Dr. Emily Rodriguez", summary: "Exploring the molecular pathways involved in long-term memory consolidation and their potential therapeutic applications.", status: "completed", image: "/eagle4.png" },
    { id: "r-4", title: "Neuroinflammation in Neurodegenerative Disease", investigator: "Dr. James Wilson", summary: "Studying the role of inflammatory responses in the progression of Alzheimer's and Parkinson's diseases.", status: "ongoing", image: "/eagle1.webp" },
  ];

  const DEFAULT_PHILOSOPHY = [
    { id: "rp-1", title: "Mission", description: "To advance understanding of brain function and develop innovative treatments for neurological disorders through cutting-edge research.", image: "/eagle2.png" },
    { id: "rp-2", title: "Research Vision", description: "To become a global leader in neuroscience research, fostering discoveries that transform lives and shape the future of brain health.", image: "/eagle3.png" },
    { id: "rp-3", title: "Scientific Approach", description: "Combining rigorous experimental methods with interdisciplinary collaboration to tackle the most challenging questions in neuroscience.", image: "/eagle4.png" }
  ];

  const DEFAULT_AREAS = [
    { id: "ra-1", title: "Cognitive Neuroscience", description: "Investigating neural mechanisms underlying perception, memory, decision-making, and consciousness.", image: "/eagle1.webp" },
    { id: "ra-2", title: "Neurodegenerative Diseases", description: "Studying Alzheimer's, Parkinson's, and other neurodegenerative conditions to develop treatments.", image: "/eagle2.png" },
    { id: "ra-3", title: "Neurotoxicology", description: "Examining the effects of environmental toxins on brain function and developing protective strategies.", image: "/eagle3.png" },
    { id: "ra-4", title: "Brain Development", description: "Understanding neural development from embryonic stages through adolescence and aging.", image: "/eagle4.png" },
    { id: "ra-5", title: "Behavioural Neuroscience", description: "Analyzing the neural basis of behavior, emotions, and social interactions.", image: "/eagle1.webp" },
    { id: "ra-6", title: "Experimental Neuroscience", description: "Conducting cutting-edge experiments to uncover fundamental principles of brain function.", image: "/eagle2.png" }
  ];

  const DEFAULT_METHODOLOGY = [
    { id: "rm-1", title: "Laboratory Experiments", description: "State-of-the-art in vitro and in vivo experiments to study neural function at molecular and cellular levels.", image: "/eagle3.png" },
    { id: "rm-2", title: "Animal Models", description: "Ethically conducted animal studies to understand complex neural systems and disease mechanisms.", image: "/eagle4.png" },
    { id: "rm-3", title: "Histology", description: "Detailed tissue analysis to examine neural structures and pathological changes.", image: "/eagle1.webp" },
    { id: "rm-4", title: "Microscopy", description: "Advanced imaging techniques including confocal and electron microscopy for high-resolution neural visualization.", image: "/eagle2.png" },
    { id: "rm-5", title: "Data Analysis", description: "Computational analysis and machine learning approaches to extract insights from complex neural data.", image: "/eagle3.png" },
    { id: "rm-6", title: "Scientific Collaboration", description: "Interdisciplinary partnerships with leading institutions worldwide to accelerate discovery.", image: "/eagle4.png" }
  ];

  const DEFAULT_COLLABORATIONS = [
    { id: "rc-1", name: "MIT Neuroscience", description: "Collaborative research on neural networks and brain-computer interfaces.", image: "/eagle2.png", websiteUrl: "#" },
    { id: "rc-2", name: "Stanford Medicine", description: "Joint studies on neurodegenerative diseases and therapeutic development.", image: "/eagle3.png", websiteUrl: "#" },
    { id: "rc-3", name: "Oxford Neuroscience", description: "International partnerships in cognitive neuroscience research.", image: "/eagle4.png", websiteUrl: "#" },
    { id: "rc-4", name: "Harvard Medical School", description: "Collaboration on brain development and plasticity studies.", image: "/eagle1.webp", websiteUrl: "#" }
  ];

  useEffect(() => {
    const fetchResearchData = async () => {
      const projects = await getAllResearchProjects();
      setResearchList(projects);
    };
    fetchResearchData();
  }, []);

  useEffect(() => {
    const fetchResearchSections = async () => {
      const philosophy = await getResearchPhilosophy();
      const areas = await getResearchAreas();
      const methodology = await getResearchMethodology();
      const collaborations = await getResearchCollaborations();
      
      setResearchPhilosophyList(philosophy);
      setResearchAreasList(areas);
      setResearchMethodologyList(methodology);
      setResearchCollaborationsList(collaborations);
    };
    fetchResearchSections();
  }, []);

  const handleAddResearch = () => {
    setEditingResearch(null);
    setResearchFormData({ 
      title: "", 
      description: "", 
      lead_investigator: "", 
      funding_source: "", 
      start_date: "", 
      end_date: "", 
      status: "ongoing", 
      image_url: "", 
      is_featured: false 
    });
    setShowResearchModal(true);
  };

  const handleEditResearch = (item: SupabaseResearchProject) => {
    setEditingResearch(item);
    setResearchFormData({ 
      title: item.title, 
      description: item.description || "", 
      lead_investigator: item.lead_investigator || "", 
      funding_source: item.funding_source || "", 
      start_date: item.start_date || "", 
      end_date: item.end_date || "", 
      status: item.status, 
      image_url: item.image_url || "", 
      is_featured: item.is_featured || false 
    });
    setShowResearchModal(true);
  };

  const handleDeleteResearch = async (id: string) => {
    if (!confirm("Delete this research project?")) return;
    
    // Get the item to delete (to get the image URL for Cloudinary deletion)
    const itemToDelete = researchList.find(r => r.id === id);
    
    const success = await deleteResearchProject(id);
    if (success) {
      setResearchList(researchList.filter(r => r.id !== id));
      
      // If Supabase delete succeeded, delete Cloudinary image
      if (itemToDelete?.image_url) {
        try {
          await fetch('/api/cloudinary/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId: itemToDelete.image_url })
          });
        } catch (err) {
          console.error('Failed to delete Cloudinary image:', err);
        }
      }
    }
  };

  const handleResearchInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setResearchFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingResearch(true);
    
    try {
      // First, save to Supabase without uploading to Cloudinary yet
      const projectData = {
        title: researchFormData.title,
        description: researchFormData.description,
        lead_investigator: researchFormData.lead_investigator,
        funding_source: researchFormData.funding_source,
        start_date: researchFormData.start_date || undefined,
        end_date: researchFormData.end_date || undefined,
        status: researchFormData.status,
        image_url: researchFormData.image_url || undefined,
        is_featured: researchFormData.is_featured
      };

      let savedItem: any = null;
      let oldImageUrl: string | undefined = editingResearch?.image_url;

      if (editingResearch) {
        const updated = await updateResearchProject(editingResearch.id, projectData);
        if (updated) {
          savedItem = updated;
          setResearchList(researchList.map(r => r.id === editingResearch.id ? updated : r));
        }
      } else {
        const created = await createResearchProject(projectData);
        if (created) {
          savedItem = created;
          setResearchList([...researchList, created]);
        }
      }

      // If Supabase save failed, stop here
      if (!savedItem) {
        alert("Failed to save research project. Please try again.");
        return;
      }

      // If there's a new image file, upload to Cloudinary AFTER Supabase save is confirmed
      if (researchFormData.imageFile) {
        try {
          const fd = new FormData();
          fd.append('file', researchFormData.imageFile);
          const res = await fetch('/api/cloudinary/upload', { method: 'POST', body: fd });
          if (!res.ok) {
            console.error('Cloudinary upload failed:', await res.text());
            alert('Image upload failed. Project saved to database but image not uploaded.');
            return;
          }
          const json = await res.json();
          const newImageUrl = json.secure_url;

          // Update Supabase with the new Cloudinary URL
          const updatedWithImage = await updateResearchProject(savedItem.id, { image_url: newImageUrl });
          if (updatedWithImage) {
            setResearchList(researchList.map(r => r.id === savedItem.id ? updatedWithImage : r));
            
            // If Supabase update with new image URL succeeded, delete old Cloudinary image
            if (oldImageUrl) {
              try {
                await fetch('/api/cloudinary/delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ publicId: oldImageUrl })
                });
              } catch (err) {
                console.error('Failed to delete old Cloudinary image:', err);
              }
            }
          }
        } catch (err) {
          console.error('Research image upload error:', err);
          alert('Image upload failed. Project saved to database but image not uploaded.');
        }
      }

      alert(editingResearch ? "Research project updated successfully!" : "Research project added successfully!");
      setShowResearchModal(false);
      setEditingResearch(null);
      setResearchFormData({ 
        title: "", 
        description: "", 
        lead_investigator: "", 
        funding_source: "", 
        start_date: "", 
        end_date: "", 
        status: "ongoing", 
        image_url: "", 
        is_featured: false,
        imageFile: null as File | null
      });
    } catch (err) {
      console.error("Error saving research project:", err);
      alert("An error occurred while saving the research project.");
    } finally {
      setIsSubmittingResearch(false);
    }
  };

  const handleResearchImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResearchFormData((prev: any) => ({ ...prev, imageFile: file }));
  };

  // Generic handlers for Philosophy, Areas, Methodology, Collaborations sections
  const handleAddResearchSection = (type: "philosophy" | "areas" | "methodology" | "collaborations") => {
    setResearchSectionType(type);
    setEditingResearchSection(null);
    setResearchSectionFormData({ title: "", description: "", image_url: "", websiteUrl: "", display_order: 0, imageFile: null });
    setShowResearchSectionModal(true);
  };

  const handleEditResearchSection = (item: any, type: "philosophy" | "areas" | "methodology" | "collaborations") => {
    setResearchSectionType(type);
    setEditingResearchSection(item);
    setResearchSectionFormData({
      title: type === "collaborations" ? (item.name || "") : (item.title || ""),
      description: item.description || "",
      image_url: item.image_url || "",
      websiteUrl: item.website_url || "",
      display_order: item.display_order || 0,
      imageFile: null
    });
    setShowResearchSectionModal(true);
  };

  const handleDeleteResearchSection = async (id: string, type: "philosophy" | "areas" | "methodology" | "collaborations") => {
    if (!confirm(`Are you sure you want to delete this item?`)) return;
    
    let success = false;
    let itemToDelete: any = null;
    
    // Get the item to delete (to get the image URL for Cloudinary deletion)
    if (type === "philosophy") {
      itemToDelete = researchPhilosophyList.find(x => x.id === id);
      success = await deleteResearchPhilosophy(id);
      if (success) {
        setResearchPhilosophyList(researchPhilosophyList.filter(x => x.id !== id));
      }
    } else if (type === "areas") {
      itemToDelete = researchAreasList.find(x => x.id === id);
      success = await deleteResearchArea(id);
      if (success) {
        setResearchAreasList(researchAreasList.filter(x => x.id !== id));
      }
    } else if (type === "methodology") {
      itemToDelete = researchMethodologyList.find(x => x.id === id);
      success = await deleteResearchMethodology(id);
      if (success) {
        setResearchMethodologyList(researchMethodologyList.filter(x => x.id !== id));
      }
    } else if (type === "collaborations") {
      itemToDelete = researchCollaborationsList.find(x => x.id === id);
      success = await deleteResearchCollaboration(id);
      if (success) {
        setResearchCollaborationsList(researchCollaborationsList.filter(x => x.id !== id));
      }
    }

    // If Supabase deletion succeeded, delete from Cloudinary
    if (success && itemToDelete?.image_url) {
      try {
        await fetch('/api/cloudinary/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: itemToDelete.image_url })
        });
      } catch (err) {
        console.error('Failed to delete Cloudinary image:', err);
      }
    }
  };

  const handleResearchSectionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResearchSectionFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResearchSectionImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResearchSectionFormData(prev => ({ ...prev, imageFile: file }));
  };

  const handleResearchSectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // First, save to Supabase without uploading to Cloudinary yet
    const baseItem = {
      title: researchSectionFormData.title,
      description: researchSectionFormData.description,
      image_url: researchSectionFormData.image_url || undefined,
      display_order: researchSectionFormData.display_order || 0
    };

    let savedItem: any = null;
    let oldImageUrl: string | undefined = undefined;

    if (researchSectionType === "philosophy") {
      if (editingResearchSection) {
        oldImageUrl = editingResearchSection.image_url;
        const updated = await updateResearchPhilosophy(editingResearchSection.id, baseItem);
        if (updated) {
          savedItem = updated;
          setResearchPhilosophyList(researchPhilosophyList.map(x => x.id === editingResearchSection.id ? updated : x));
        }
      } else {
        const created = await createResearchPhilosophy(baseItem);
        if (created) {
          savedItem = created;
          setResearchPhilosophyList([...researchPhilosophyList, created]);
        }
      }
    } else if (researchSectionType === "areas") {
      if (editingResearchSection) {
        oldImageUrl = editingResearchSection.image_url;
        const updated = await updateResearchArea(editingResearchSection.id, baseItem);
        if (updated) {
          savedItem = updated;
          setResearchAreasList(researchAreasList.map(x => x.id === editingResearchSection.id ? updated : x));
        }
      } else {
        const created = await createResearchArea(baseItem);
        if (created) {
          savedItem = created;
          setResearchAreasList([...researchAreasList, created]);
        }
      }
    } else if (researchSectionType === "methodology") {
      if (editingResearchSection) {
        oldImageUrl = editingResearchSection.image_url;
        const updated = await updateResearchMethodology(editingResearchSection.id, baseItem);
        if (updated) {
          savedItem = updated;
          setResearchMethodologyList(researchMethodologyList.map(x => x.id === editingResearchSection.id ? updated : x));
        }
      } else {
        const created = await createResearchMethodology(baseItem);
        if (created) {
          savedItem = created;
          setResearchMethodologyList([...researchMethodologyList, created]);
        }
      }
    } else if (researchSectionType === "collaborations") {
      const collaborationItem = {
        name: researchSectionFormData.title,
        description: researchSectionFormData.description,
        image_url: researchSectionFormData.image_url || undefined,
        website_url: researchSectionFormData.websiteUrl || undefined,
        display_order: researchSectionFormData.display_order || 0
      };
      
      if (editingResearchSection) {
        oldImageUrl = editingResearchSection.image_url;
        const updated = await updateResearchCollaboration(editingResearchSection.id, collaborationItem);
        if (updated) {
          savedItem = updated;
          setResearchCollaborationsList(researchCollaborationsList.map(x => x.id === editingResearchSection.id ? updated : x));
        }
      } else {
        const created = await createResearchCollaboration(collaborationItem);
        if (created) {
          savedItem = created;
          setResearchCollaborationsList([...researchCollaborationsList, created]);
        }
      }
    }

    // If Supabase save failed, stop here
    if (!savedItem) {
      console.error("Failed to save to Supabase");
      return;
    }

    // If there's a new image file, upload to Cloudinary AFTER Supabase save is confirmed
    if (researchSectionFormData.imageFile) {
      try {
        const fd = new FormData();
        fd.append('file', researchSectionFormData.imageFile);
        const res = await fetch('/api/cloudinary/upload', { method: 'POST', body: fd });
        if (!res.ok) {
          console.error('Cloudinary upload failed:', await res.text());
          return;
        }
        const json = await res.json();
        const newImageUrl = json.secure_url;

        // Update Supabase with the new Cloudinary URL
        let updatedWithImage: any = null;
        if (researchSectionType === "philosophy") {
          updatedWithImage = await updateResearchPhilosophy(savedItem.id, { image_url: newImageUrl });
          if (updatedWithImage) {
            setResearchPhilosophyList(researchPhilosophyList.map(x => x.id === savedItem.id ? updatedWithImage : x));
          }
        } else if (researchSectionType === "areas") {
          updatedWithImage = await updateResearchArea(savedItem.id, { image_url: newImageUrl });
          if (updatedWithImage) {
            setResearchAreasList(researchAreasList.map(x => x.id === savedItem.id ? updatedWithImage : x));
          }
        } else if (researchSectionType === "methodology") {
          updatedWithImage = await updateResearchMethodology(savedItem.id, { image_url: newImageUrl });
          if (updatedWithImage) {
            setResearchMethodologyList(researchMethodologyList.map(x => x.id === savedItem.id ? updatedWithImage : x));
          }
        } else if (researchSectionType === "collaborations") {
          updatedWithImage = await updateResearchCollaboration(savedItem.id, { image_url: newImageUrl });
          if (updatedWithImage) {
            setResearchCollaborationsList(researchCollaborationsList.map(x => x.id === savedItem.id ? updatedWithImage : x));
          }
        }

        // If Supabase update with new image URL succeeded, delete old Cloudinary image
        if (updatedWithImage && oldImageUrl) {
          try {
            await fetch('/api/cloudinary/delete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ publicId: oldImageUrl })
            });
          } catch (err) {
            console.error('Failed to delete old Cloudinary image:', err);
          }
        }
      } catch (err) {
        console.error('Research section image upload error:', err);
      }
    }

    setShowResearchSectionModal(false);
    setEditingResearchSection(null);
    setResearchSectionFormData({ title: "", description: "", image_url: "", websiteUrl: "", display_order: 0, imageFile: null });
  };
  // ─────────────────────────────────────────────────────────────────────────

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    const success = await login({ email: loginEmail, password: loginPassword });

    if (!success) {
      setLoginError('Invalid email or password');
      setIsLoggingIn(false);
      return;
    }

    setIsLoggingIn(false);
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
    router.replace('/Eagle_Editorial');
  };

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    publication_type: "Journal Article",
    authors: "",
    research_area: "",
    abstract: "",
    content: "",
    journal: "",
    doi: "",
    keywords: "",
    featured_image: null as File | null,
    image_url: "",
    pdf: null as File | null,
    pdf_url: "",
    featured: false,
    status: "draft",
    published_at: ""
  });
  const applyFormatting = (format: "bold" | "italic" | "h2" | "h3" | "image") => {
    // Deprecated - now handled by RichTextEditor component
  };

  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Show login form inline
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Login Form */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <img src="/lng-logo.png" alt="Eagle's Lab Logo" className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Eagle Editorial
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sign in to access the staff portal
              </p>
            </div>

            {loginError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">{loginError}</p>
              </div>
            )}

            <form onSubmit={handleLogin} noValidate className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Back to Main Site */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <a 
                href="/" 
                className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Back to Main Site
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "publications", label: "Publications", icon: FileText },
    { id: "research", label: "Research", icon: Microscope },
    { id: "events", label: "Events", icon: Calendar },
    { id: "team", label: "Team", icon: Users },
    ...(user?.role === 'super_admin' || user?.role === 'admin' ? [{ id: "users", label: "Users", icon: Shield }] : []),
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const publicationTypes = [
    "Journal Article",
    "Conference Paper",
    "Research Report",
    "Book Chapter",
    "Thesis & Dissertation",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleEdit = (publication: SupabasePublication) => {
    setEditingPublication(publication);
    
    let mappedType = "Journal Article";
    if (publication.publication_type === "journal") mappedType = "Journal Article";
    else if (publication.publication_type === "conference") mappedType = "Conference Paper";
    else if (publication.publication_type === "book") mappedType = "Book Chapter";
    else if (publication.publication_type === "preprint") {
      mappedType = (publication.category === "Research Report" || publication.category === "Research Reports")
        ? "Research Report" 
        : "Thesis & Dissertation";
    }

    setFormData({
      title: publication.title,
      slug: publication.slug,
      publication_type: mappedType,
      authors: publication.authors?.join(", ") ?? "",
      research_area: publication.research_area ?? "",
      abstract: publication.abstract ?? "",
      content: publication.content || "",
      journal: publication.journal || "",
      doi: publication.doi || "",
      keywords: publication.keywords?.join(", ") ?? "",
      featured_image: null,
      image_url: publication.image || "",
      pdf: null,
      pdf_url: publication.pdf_url || "",
      featured: !!publication.featured,
      status: publication.status || "draft",
      published_at: publication.published_at ? new Date(publication.published_at).toISOString().split("T")[0] : ""
    });
    setShowCreateModal(true);
  };

  const mapPublicationType = (type: string): "journal" | "conference" | "book" | "preprint" => {
    switch (type) {
      case "Journal Article":
        return "journal";
      case "Conference Paper":
        return "conference";
      case "Book Chapter":
        return "book";
      case "Thesis & Dissertation":
      case "Research Report":
      default:
        return "preprint";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const authorsArray = formData.authors.split(",").map(a => a.trim()).filter(Boolean);
      const keywordsArray = formData.keywords.split(",").map(k => k.trim()).filter(Boolean);
      const mappedType = mapPublicationType(formData.publication_type);

      // First, save to Supabase without uploading to Cloudinary yet
      const publicationData = {
        title: formData.title,
        slug: formData.slug,
        publication_type: mappedType,
        authors: authorsArray,
        research_area: formData.research_area || undefined,
        abstract: formData.abstract || undefined,
        content: formData.content || undefined,
        journal: formData.journal || undefined,
        doi: formData.doi || undefined,
        keywords: keywordsArray,
        category: formData.publication_type,
        image: formData.image_url || undefined,
        pdf_url: formData.pdf_url || undefined,
        featured: formData.featured,
        status: formData.status,
        published_at: formData.published_at
          ? new Date(formData.published_at).toISOString()
          : new Date().toISOString(),
      };

      let savedItem;
      if (editingPublication) {
        const updated = await updatePublication(editingPublication.id, publicationData);
        if (!updated) {
          throw new Error(
            "Failed to update publication.\n\nLikely cause: Supabase Row Level Security (RLS) is blocking the anon key from writing.\n\nFix: Run the SQL in fix_supabase_policies.sql in your Supabase SQL Editor."
          );
        }
        savedItem = updated;
      } else {
        const created = await createPublication(publicationData);
        if (!created) {
          throw new Error(
            "Failed to create publication.\n\nLikely cause: Supabase Row Level Security (RLS) is blocking the anon key from writing.\n\nFix: Run the SQL in fix_supabase_policies.sql in your Supabase SQL Editor."
          );
        }
        savedItem = created;
      }

      // If there's a new featured image file, upload to Cloudinary AFTER Supabase save is confirmed
      if (formData.featured_image) {
        try {
          const fd = new FormData();
          fd.append('file', formData.featured_image);
          const res = await fetch('/api/cloudinary/upload', { method: 'POST', body: fd });
          if (!res.ok) {
            console.error('Cloudinary upload failed:', await res.text());
            alert('Featured image upload failed. Publication saved to database but image not uploaded.');
            return;
          }
          const json = await res.json();
          const newImageUrl = json.secure_url;

          // Update Supabase with the new Cloudinary URL
          const updatedWithImage = await updatePublication(savedItem.id, { image: newImageUrl });
          if (updatedWithImage) {
            savedItem = updatedWithImage;
            
            // If Supabase update with new image URL succeeded, delete old Cloudinary image
            if (formData.image_url) {
              try {
                console.log('Deleting old image:', formData.image_url);
                const deleteRes = await fetch('/api/cloudinary/delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ publicId: formData.image_url })
                });
                const deleteResult = await deleteRes.json();
                console.log('Delete image result:', deleteResult);
                if (!deleteRes.ok) {
                  console.error('Failed to delete old Cloudinary image:', deleteResult);
                }
              } catch (err) {
                console.error('Failed to delete old Cloudinary image:', err);
              }
            }
          }
        } catch (err) {
          console.error('Cloudinary upload error:', err);
          alert('Featured image upload failed. Publication saved to database but image not uploaded.');
        }
      }

      // If there's a new PDF file, upload to Cloudinary AFTER Supabase save is confirmed
      if (formData.pdf) {
        try {
          const fd = new FormData();
          fd.append('file', formData.pdf);
          const res = await fetch('/api/cloudinary/upload', { method: 'POST', body: fd });
          if (!res.ok) {
            console.error('Cloudinary PDF upload failed:', await res.text());
            alert('PDF upload failed. Publication saved to database but PDF not uploaded.');
            return;
          }
          const json = await res.json();
          const newPdfUrl = json.secure_url;

          // Update Supabase with the new Cloudinary URL
          const updatedWithPdf = await updatePublication(savedItem.id, { pdf_url: newPdfUrl });
          if (updatedWithPdf) {
            savedItem = updatedWithPdf;
            
            // If Supabase update with new PDF URL succeeded, delete old PDF from Cloudinary
            if (formData.pdf_url) {
              try {
                console.log('Deleting old PDF:', formData.pdf_url);
                const deleteRes = await fetch('/api/cloudinary/delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ publicId: formData.pdf_url })
                });
                const deleteResult = await deleteRes.json();
                console.log('Delete PDF result:', deleteResult);
                if (!deleteRes.ok) {
                  console.error('Failed to delete old PDF from Cloudinary:', deleteResult);
                }
              } catch (err) {
                console.error('Failed to delete old PDF from Cloudinary:', err);
              }
            }
          }
        } catch (err) {
          console.error('Cloudinary PDF upload error:', err);
          alert('PDF upload failed. Publication saved to database but PDF not uploaded.');
        }
      }

      alert(editingPublication ? "Publication updated successfully!" : "Publication created successfully!");
      handleCloseModal();
      fetchPublications();
    } catch (err: any) {
      console.error("Error saving publication:", err);
      alert(err.message || "An error occurred while saving the publication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePublication = async (id: string) => {
    if (confirm("Are you sure you want to delete this publication?")) {
      // Get the publication to delete (to get the image/PDF URLs for Cloudinary deletion)
      const pubToDelete = publicationsList.find(pub => pub.id === id);
      
      try {
        const success = await deletePublication(id);
        if (success) {
          alert("Publication deleted successfully!");
          fetchPublications();
          
          // Delete from Cloudinary after Supabase deletion succeeds
          if (pubToDelete?.image) {
            try {
              await fetch('/api/cloudinary/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publicId: pubToDelete.image })
              });
            } catch (err) {
              console.error('Failed to delete Cloudinary image:', err);
            }
          }
          if (pubToDelete?.pdf_url) {
            try {
              await fetch('/api/cloudinary/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publicId: pubToDelete.pdf_url })
              });
            } catch (err) {
              console.error('Failed to delete Cloudinary PDF:', err);
            }
          }
        } else {
          alert("Failed to delete publication. Please check database configuration.");
        }
      } catch (err) {
        console.error("Error deleting publication:", err);
        alert("An error occurred during deletion.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingPublication(null);
    setFormData({
      title: "",
      slug: "",
      publication_type: "Journal Article",
      authors: "",
      research_area: "",
      abstract: "",
      content: "",
      journal: "",
      doi: "",
      keywords: "",
      featured_image: null,
      image_url: "",
      pdf: null,
      pdf_url: "",
      featured: false,
      status: "draft",
      published_at: ""
    });
  };

  // Gallery handlers: Images
  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setImageFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : name === "display_order" ? parseInt(value) || 0 : value
    }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFormData(prev => ({ ...prev, imageFile: file }));
  };

  const handleEditImage = (img: any) => {
    setEditingImage(img);
    setImageFormData({
      title: img.title,
      caption: img.caption || img.description || "",
      category: img.category,
      image_url: img.image_url || img.src || "",
      imageFile: null,
      featured: !!img.featured,
      display_order: img.display_order || 0,
      event_date: img.event_date || ""
    });
    setShowImageModal(true);
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery image?")) return;
    
    const imageToDelete = galleryImagesList.find(img => img.id === id);
    const deleted = await deleteGalleryImage(id);
    
    if (!deleted) {
      alert("Unable to delete image. Please try again.");
      return;
    }
    
    saveImagesList(galleryImagesList.filter(img => img.id !== id));
    
    // Delete from Cloudinary after Supabase deletion succeeds
    if (imageToDelete?.image_url) {
      try {
        await fetch('/api/cloudinary/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: imageToDelete.image_url })
        });
      } catch (err) {
        console.error('Failed to delete Cloudinary image:', err);
      }
    }
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingGallery(true);
    
    try {
      // First, save to Supabase without uploading to Cloudinary yet
      const payload = {
        title: imageFormData.title,
        caption: imageFormData.caption,
        category: imageFormData.category,
        image_url: imageFormData.image_url,
        featured: imageFormData.featured,
        display_order: imageFormData.display_order,
        event_date: imageFormData.event_date,
      };

      let savedItem;
      if (editingImage) {
        const updated = await updateGalleryImage(editingImage.id, payload);
        if (!updated) {
          alert("Unable to update image. Please try again.");
          return;
        }
        savedItem = updated;
        saveImagesList(galleryImagesList.map(img => img.id === editingImage.id ? updated : img));
      } else {
        const created = await createGalleryImage(payload);
        if (!created) {
          alert("Unable to create image. Please try again.");
          return;
        }
        savedItem = created;
        saveImagesList([...galleryImagesList, created]);
      }

      // If there's a new image file, upload to Cloudinary AFTER Supabase save is confirmed
      if (imageFormData.imageFile) {
        try {
          const fd = new FormData();
          fd.append('file', imageFormData.imageFile);
          const res = await fetch('/api/cloudinary/upload', { method: 'POST', body: fd });
          if (!res.ok) {
            console.error('Cloudinary upload failed:', await res.text());
            alert('Image upload failed. Data saved to database but image not uploaded.');
            return;
          }
          const json = await res.json();
          const newImageUrl = json.secure_url;

          // Update Supabase with the new Cloudinary URL
          const updatedWithImage = await updateGalleryImage(savedItem.id, { image_url: newImageUrl });
          if (updatedWithImage) {
            saveImagesList(galleryImagesList.map(img => img.id === savedItem.id ? updatedWithImage : img));
            savedItem = updatedWithImage;
            
            // If Supabase update with new image URL succeeded, delete old Cloudinary image
            if (imageFormData.image_url) {
              try {
                await fetch('/api/cloudinary/delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ publicId: imageFormData.image_url })
                });
              } catch (err) {
                console.error('Failed to delete old Cloudinary image:', err);
              }
            }
          }
        } catch (err) {
          console.error('Cloudinary upload error:', err);
          alert('Image upload failed. Data saved to database but image not uploaded.');
        }
      }

      alert(editingImage ? "Image updated successfully!" : "Image added successfully!");
      setShowImageModal(false);
      setEditingImage(null);
      setImageFormData({
        title: "",
        caption: "",
        category: "Laboratory",
        image_url: "",
        imageFile: null,
        featured: false,
        display_order: 0,
        event_date: ""
      });
    } catch (err) {
      console.error("Error saving image:", err);
      alert("An error occurred while saving the image.");
    } finally {
      setIsSubmittingGallery(false);
    }
  };

  // Gallery handlers: Videos
  const handleVideoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setVideoFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : name === "display_order" ? parseInt(value) || 0 : value
    }));
  };

  const handleEditVideo = (vid: any) => {
    setEditingVideo(vid);
    setVideoFormData({
      title: vid.title,
      caption: vid.caption || "",
      category: vid.category,
      video_type: vid.video_type,
      video_url: vid.video_url,
      thumbnail_url: vid.thumbnail_url || "",
      featured: !!vid.featured,
      display_order: vid.display_order || 0,
      event_date: vid.event_date || ""
    });
    setShowVideoModal(true);
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery video?")) return;
    const deleted = await deleteGalleryVideo(id);
    if (!deleted) {
      alert("Unable to delete video. Please try again.");
      return;
    }
    saveVideosList(galleryVideosList.filter(vid => vid.id !== id));
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingGallery(true);
    
    try {
      const payload = {
        title: videoFormData.title,
        caption: videoFormData.caption,
        category: videoFormData.category,
        video_type: videoFormData.video_type,
        video_url: videoFormData.video_url,
        thumbnail_url: videoFormData.thumbnail_url,
        featured: videoFormData.featured,
        display_order: videoFormData.display_order,
        event_date: videoFormData.event_date,
      };

      if (editingVideo) {
        const updated = await updateGalleryVideo(editingVideo.id, payload);
        if (!updated) {
          alert("Unable to update video. Please try again.");
          return;
        }
        saveVideosList(galleryVideosList.map(vid => vid.id === editingVideo.id ? updated : vid));
      } else {
        const created = await createGalleryVideo(payload);
        if (!created) {
          alert("Unable to create video. Please try again.");
          return;
        }
        saveVideosList([...galleryVideosList, created]);
      }

      alert(editingVideo ? "Video updated successfully!" : "Video added successfully!");
      setShowVideoModal(false);
      setEditingVideo(null);
      setVideoFormData({
        title: "",
        caption: "",
        category: "Laboratory",
        video_type: "youtube",
        video_url: "",
        thumbnail_url: "",
        featured: false,
        display_order: 0,
        event_date: ""
      });
    } catch (err) {
      console.error("Error saving video:", err);
      alert("An error occurred while saving the video.");
    } finally {
      setIsSubmittingGallery(false);
    }
  };

  const handleReorderImage = async (index: number, direction: 'up' | 'down') => {
    const newList = [...galleryImagesList];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newList.length) {
      const temp = newList[index];
      newList[index] = newList[targetIndex];
      newList[targetIndex] = temp;

      const reordered = newList.map((item, idx) => ({
        ...item,
        display_order: idx + 1,
      }));
      await persistImageOrderAndFeatured(reordered);
    }
  };

  const handleReorderVideo = async (index: number, direction: 'up' | 'down') => {
    const newList = [...galleryVideosList];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newList.length) {
      const temp = newList[index];
      newList[index] = newList[targetIndex];
      newList[targetIndex] = temp;

      const reordered = newList.map((item, idx) => ({
        ...item,
        display_order: idx + 1,
      }));
      await persistVideoOrderAndFeatured(reordered);
    }
  };


  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 md:px-6 py-3 md:py-4 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 md:hidden hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-500"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <img src="/lng-logo.png" alt="Eagle's Lab Logo" className="w-8 h-8 md:w-10 md:h-10" />
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">Eagle Editorial</h1>
              <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-400 leading-none">Staff Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs md:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {publicationCount} Publications
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs md:text-sm font-bold">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role.replace('_', ' ')}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-[61px] md:pt-[73px]">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-[61px] md:top-[73px] w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-[calc(100vh-61px)] md:h-[calc(100vh-73px)] overflow-y-auto z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    localStorage.setItem('eagle_editorial_active_tab', item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Sidebar Backdrop Overlay on Mobile */}
        {isMobileMenuOpen && (
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden pt-[61px]"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-8 transition-all duration-300">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Publications", value: publicationsList.length, color: "indigo" },
                  { label: "Events", value: eventsList.length, color: "green" },
                  { label: "Team Members", value: teamList.length, color: "blue" },
                  { label: "Gallery Items", value: galleryImagesList.length + galleryVideosList.length, color: "purple" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {(() => {
                    // Combine recent items from all sections
                    const recentActivities = [
                      ...publicationsList.slice(0, 2).map(pub => ({
                        action: pub.status === 'published' ? 'Published new article' : 'Updated article',
                        item: pub.title,
                        time: pub.updated_at ? formatTimeAgo(pub.updated_at) : 'Recently'
                      })),
                      ...eventsList.slice(0, 2).map(ev => ({
                        action: 'Added event',
                        item: ev.title,
                        time: ev.created_at ? formatTimeAgo(ev.created_at) : 'Recently'
                      })),
                      ...teamList.slice(0, 2).map(member => ({
                        action: 'Updated team member',
                        item: member.full_name,
                        time: member.updated_at ? formatTimeAgo(member.updated_at) : 'Recently'
                      })),
                      ...galleryImagesList.slice(0, 2).map(img => ({
                        action: 'Uploaded gallery image',
                        item: img.title || 'Untitled',
                        time: img.created_at ? formatTimeAgo(img.created_at) : 'Recently'
                      }))
                    ].sort((a, b) => 0).slice(0, 4); // Show first 4 items

                    if (recentActivities.length === 0) {
                      return <div className="text-sm text-slate-500 dark:text-slate-400">No recent activity. Start by adding content!</div>;
                    }

                    return recentActivities.map((activity, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                        <div>
                          <p className="text-slate-900 dark:text-white font-medium">{activity.action}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{activity.item}</p>
                        </div>
                        <span className="text-xs text-slate-400">{activity.time}</span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          )}

          {activeTab === "publications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Publications</h2>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Publication
                </button>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Journal</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Year</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {loadingPublications ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">
                          Loading publications...
                        </td>
                      </tr>
                    ) : publicationsList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">
                          No publications found. Click "Add Publication" to create one.
                        </td>
                      </tr>
                    ) : (
                      publicationsList.map((pub) => (
                        <tr key={pub.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">{pub.title}</td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                            {pub.journal ?? pub.research_area ?? "—"}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                            {pub.published_at ? new Date(pub.published_at).getFullYear() : "—"}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                            {pub.pdf_url ? (
                              <a 
                                href={pub.pdf_url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                              >
                                View PDF
                              </a>
                            ) : "—"}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                              pub.status === "published" 
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}>
                              {pub.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link 
                                href={`/publications/${pub.id}`}
                                target="_blank"
                                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button 
                                onClick={() => handleEdit(pub)}
                                className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeletePublication(pub.id)}
                                className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "research" && (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Research Management</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage all components of the Research page: philosophy, areas, methodology, ongoing projects, and collaborations.</p>
              </div>

              {/* Subtabs */}
              <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto gap-2">
                {[
                  { id: "projects", label: "Ongoing Projects" },
                  { id: "philosophy", label: "Philosophy" },
                  { id: "areas", label: "Research Areas" },
                  { id: "methodology", label: "Methodology" },
                  { id: "collaborations", label: "Collaborations" }
                ].map((subtab) => (
                  <button
                    key={subtab.id}
                    onClick={() => setResearchSubTab(subtab.id as any)}
                    className={`px-4 py-2 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                      researchSubTab === subtab.id
                        ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                        : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    {subtab.label}
                  </button>
                ))}
              </div>

              {/* View 1: Projects */}
              {researchSubTab === "projects" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ongoing Projects</h3>
                    <button onClick={handleAddResearch} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm shadow-sm">
                      <Plus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-900/90">
                        <tr>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 w-16">Image</th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Title</th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Investigator</th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {researchList.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-500">
                              No research projects yet. Click &ldquo;Add Project&rdquo; to create one.
                            </td>
                          </tr>
                        ) : (
                          researchList.map((item: any) => (
                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                              <td className="px-6 py-3">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center flex-shrink-0">
                                  {item.image_url ? (
                                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <FlaskConical className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-3">
                                <div className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">{item.title}</div>
                                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1 max-w-xs">{item.description}</div>
                              </td>
                              <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">{item.lead_investigator}</td>
                              <td className="px-6 py-3">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${item.status === "ongoing" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="px-6 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => handleEditResearch(item)} className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDeleteResearch(item.id)} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* View 2: Philosophy */}
              {researchSubTab === "philosophy" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Research Philosophy</h3>
                    <button onClick={() => handleAddResearchSection("philosophy")} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm shadow-sm">
                      <Plus className="w-4 h-4" />
                      Add Philosophy Item
                    </button>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-900/90">
                        <tr>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 w-16">Image Card</th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Title</th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Description</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {researchPhilosophyList.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500">
                              No philosophy items yet. Click &ldquo;Add Philosophy Item&rdquo; to create one.
                            </td>
                          </tr>
                        ) : (
                          researchPhilosophyList.map((item: any) => (
                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                              <td className="px-6 py-3">
                                <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700 flex-shrink-0">
                                  {item.image_url ? (
                                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <ImageIcon className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-3 font-semibold text-slate-900 dark:text-white text-sm">{item.title}</td>
                              <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-300 max-w-sm"><div className="line-clamp-2">{item.description}</div></td>
                              <td className="px-6 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => handleEditResearchSection(item, "philosophy")} className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDeleteResearchSection(item.id, "philosophy")} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* View 3: Research Areas */}
              {researchSubTab === "areas" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Research Areas</h3>
                    <button onClick={() => handleAddResearchSection("areas")} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm shadow-sm">
                      <Plus className="w-4 h-4" />
                      Add Research Area
                    </button>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-900/90">
                        <tr>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 w-16">Image Card</th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Title</th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Description</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {researchAreasList.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500">
                              No research areas yet. Click &ldquo;Add Research Area&rdquo; to create one.
                            </td>
                          </tr>
                        ) : (
                          researchAreasList.map((item: any) => (
                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                              <td className="px-6 py-3">
                                <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700 flex-shrink-0">
                                  {item.image_url ? (
                                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <ImageIcon className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-3 font-semibold text-slate-900 dark:text-white text-sm">{item.title}</td>
                              <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-300 max-w-sm"><div className="line-clamp-2">{item.description}</div></td>
                              <td className="px-6 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => handleEditResearchSection(item, "areas")} className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDeleteResearchSection(item.id, "areas")} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* View 4: Methodology */}
              {researchSubTab === "methodology" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Research Methodology</h3>
                    <button onClick={() => handleAddResearchSection("methodology")} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm shadow-sm">
                      <Plus className="w-4 h-4" />
                      Add Methodology Item
                    </button>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-900/90">
                        <tr>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 w-16">Image Card</th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Title</th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Description</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {researchMethodologyList.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500">
                              No methodology items yet. Click &ldquo;Add Methodology Item&rdquo; to create one.
                            </td>
                          </tr>
                        ) : (
                          researchMethodologyList.map((item: any) => (
                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                              <td className="px-6 py-3">
                                <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700 flex-shrink-0">
                                  {item.image_url ? (
                                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <ImageIcon className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-3 font-semibold text-slate-900 dark:text-white text-sm">{item.title}</td>
                              <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-300 max-w-sm"><div className="line-clamp-2">{item.description}</div></td>
                              <td className="px-6 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => handleEditResearchSection(item, "methodology")} className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDeleteResearchSection(item.id, "methodology")} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* View 5: Collaborations */}
              {researchSubTab === "collaborations" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Partner Collaborations</h3>
                    <button onClick={() => handleAddResearchSection("collaborations")} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm shadow-sm">
                      <Plus className="w-4 h-4" />
                      Add Collaboration
                    </button>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-900/90">
                        <tr>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500 w-16">Logo Icon</th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Institution Name</th>
                          <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Description</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {researchCollaborationsList.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500">
                              No collaborations yet. Click &ldquo;Add Collaboration&rdquo; to create one.
                            </td>
                          </tr>
                        ) : (
                          researchCollaborationsList.map((item: any) => (
                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                              <td className="px-6 py-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700 flex-shrink-0">
                                  {item.image_url ? (
                                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <Building2 className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-3 font-semibold text-slate-900 dark:text-white text-sm">{item.name}</td>
                              <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-300 max-w-sm"><div className="line-clamp-2">{item.description}</div></td>
                              <td className="px-6 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => handleEditResearchSection(item, "collaborations")} className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDeleteResearchSection(item.id, "collaborations")} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Events</h2>
                <button onClick={handleAddEvent} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Event
                </button>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-900/90">
                    <tr>
                      <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Title</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Date</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Venue</th>
                      <th className="px-6 py-3 text-xs font-semibold uppercase text-slate-500">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {eventsList.length > 0 ? (
                      eventsList.map((ev) => (
                        <tr key={ev.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                          <td className="px-6 py-4 align-top">
                            <div className="font-semibold text-slate-900 dark:text-white">{ev.title}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{ev.slug}</div>
                          </td>
                          <td className="px-6 py-4 align-top text-sm text-slate-600 dark:text-slate-300">{ev.event_date}{ev.event_date && ev.event_time ? ` • ${ev.event_time}` : ''}</td>
                          <td className="px-6 py-4 align-top text-sm text-slate-600 dark:text-slate-300">{ev.location}</td>
                          <td className="px-6 py-4 align-top">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ev.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-700' : ev.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'}`}>
                              {ev.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEditEvent(ev)} className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteEvent(ev.id)} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">No events created yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Event Modal */}
              {showEventModal && (
                <div className="fixed inset-0 z-[110] overflow-y-auto bg-slate-900/80 p-4">
                  <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Create or update an event for the public site.</p>
                      </div>
                      <button type="button" onClick={handleCloseEventModal} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><X className="w-5 h-5" /></button>
                    </div>

                    <form onSubmit={handleEventSubmit} className="space-y-6 p-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Title *</span>
                          <input type="text" name="title" value={eventFormData.title} onChange={handleEventInputChange} required className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white" />
                        </label>
                        <label className="block">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Slug</span>
                          <input type="text" name="slug" value={eventFormData.slug} onChange={handleEventInputChange} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white" placeholder="event-slug" />
                        </label>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</span>
                          <select name="category" value={eventFormData.category} onChange={handleEventInputChange} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white">
                            {["Conferences", "Workshops", "Seminars", "Webinars"].map((c: string) => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </label>

                        <label className="block">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Venue</span>
                          <input type="text" name="venue" value={eventFormData.venue} onChange={handleEventInputChange} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white" />
                        </label>
                      </div>

                      <label className="block">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Short Description</span>
                        <textarea name="shortDescription" value={eventFormData.shortDescription} onChange={handleEventInputChange} rows={3} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white resize-none" />
                      </label>

                      <label className="block">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Description</span>
                        <textarea name="description" value={eventFormData.description} onChange={handleEventInputChange} rows={6} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white resize-none" />
                      </label>

                      <label className="block">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Banner Image</span>
                        <input type="file" accept="image/*" onChange={handleEventImageUpload} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white" />
                        {eventFormData.bannerImage && (
                          <div className="mt-2">
                            <img src={eventFormData.bannerImage} alt="Banner preview" className="h-32 w-auto rounded-lg object-cover" />
                          </div>
                        )}
                      </label>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <label className="block">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Start Date</span>
                          <input type="date" name="startDate" value={eventFormData.startDate} onChange={handleEventInputChange} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white" />
                        </label>
                        <label className="block">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">End Date</span>
                          <input type="date" name="endDate" value={eventFormData.endDate} onChange={handleEventInputChange} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white" />
                        </label>
                        <label className="block">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Start Time</span>
                          <input type="time" name="startTime" value={eventFormData.startTime} onChange={handleEventInputChange} className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white" />
                        </label>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          <input type="checkbox" name="featured" checked={eventFormData.featured} onChange={handleEventInputChange} className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                          Featured
                        </label>
                        <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                          <input type="checkbox" name="published" checked={eventFormData.published} onChange={handleEventInputChange} className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                          Published
                        </label>
                      </div>

                      <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 sm:flex-row sm:justify-end">
                        <button type="button" onClick={handleCloseEventModal} className="rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200">Cancel</button>
                        <button type="submit" disabled={isSubmittingEvent} className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">{isSubmittingEvent ? 'Saving...' : (editingEvent ? 'Update Event' : 'Save Event')}</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">User Management</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Manage editorial staff and their access permissions.
                  </p>
                </div>
                {user?.role === 'super_admin' && (
                  <button
                    onClick={handleAddUser}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add User
                  </button>
                )}
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-900/90">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Name</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Email</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Role</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Status</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {editorialUsersList.length > 0 ? (
                        editorialUsersList.map((userItem) => (
                          <tr key={userItem.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/70">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-slate-900 dark:text-white">{userItem.full_name}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{userItem.email}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                                userItem.role === 'Super Admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                                userItem.role === 'Admin' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                              }`}>
                                {userItem.role}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${userItem.is_active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}>
                                {userItem.is_active ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {user?.role === 'super_admin' || user?.role === 'admin' ? (
                                  <>
                                    {canDeleteUser(user.role, user.email, userItem.role, userItem.email) && (
                                      <button
                                        onClick={() => handleEditUser(userItem)}
                                        className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </button>
                                    )}
                                    {canDeleteUser(user.role, user.email, userItem.role, userItem.email) && userItem.email !== 'eaglesresearchlaboratory@gmail.com' && (
                                      <button
                                        onClick={() => handleDeleteUser(userItem.id, userItem.email)}
                                        className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  </>
                                ) : null}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                            No users found. Add your first user to get started.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {showUserModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {editingUser ? 'Edit User' : 'Add New User'}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        {editingUser ? 'Update user information and permissions' : 'Create a new editorial staff account'}
                      </p>
                    </div>
                    <form onSubmit={handleUserSubmit}>
                      <div className="space-y-4">
                        <label className="block">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</span>
                          <input
                            type="text"
                            name="full_name"
                            value={userFormData.full_name}
                            onChange={handleUserInputChange}
                            required
                            className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white"
                          />
                        </label>
                        <label className="block">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</span>
                          <input
                            type="email"
                            name="email"
                            value={userFormData.email}
                            onChange={handleUserInputChange}
                            required
                            className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white"
                          />
                        </label>
                        <label className="block">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Role</span>
                          <select
                            name="role"
                            value={userFormData.role}
                            onChange={handleUserInputChange}
                            disabled={editingUser?.email === 'eaglesresearchlaboratory@gmail.com'}
                            className={`mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white ${editingUser?.email === 'eaglesresearchlaboratory@gmail.com' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <option value="Editor">Editor</option>
                            <option value="Admin">Admin</option>
                            <option value="Super Admin">Super Admin</option>
                          </select>
                          {editingUser?.email === 'eaglesresearchlaboratory@gmail.com' && (
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Super Admin role cannot be changed</p>
                          )}
                        </label>
                        {!editingUser && (
                          <label className="block">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</span>
                            <input
                              type="password"
                              name="password"
                              value={userFormData.password}
                              onChange={handleUserInputChange}
                              required
                              className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white"
                            />
                          </label>
                        )}
                        {editingUser && (
                          <label className="block">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">New Password (optional)</span>
                            <input
                              type="password"
                              name="password"
                              value={userFormData.password}
                              onChange={handleUserInputChange}
                              placeholder="Leave blank to keep current password"
                              className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white"
                            />
                          </label>
                        )}
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="is_active"
                            checked={userFormData.is_active}
                            onChange={handleUserInputChange}
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                          />
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Active</span>
                        </label>
                      </div>
                      <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 sm:flex-row sm:justify-end">
                        <button
                          type="button"
                          onClick={() => setShowUserModal(false)}
                          className="rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                        >
                          {isSubmitting ? 'Saving...' : (editingUser ? 'Update User' : 'Create User')}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Critical Warning Modal */}
              {showCriticalWarning && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="w-full max-w-lg rounded-3xl border-2 border-red-500 bg-white p-8 shadow-2xl dark:border-red-600 dark:bg-slate-800">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {criticalWarningType === "protected_user" ? "Access Denied" : "Critical Warning"}
                        </h3>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                        {criticalWarningMessage}
                      </p>
                    </div>

                    {criticalWarningType === "self_delete" && (
                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          Type "DELETE" to confirm:
                        </label>
                        <input
                          type="text"
                          value={deleteConfirmationInput}
                          onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                          className="w-full rounded-xl border-2 border-red-300 bg-white px-4 py-3 text-slate-900 focus:border-red-500 focus:outline-none dark:border-red-700 dark:bg-slate-900 dark:text-white"
                          placeholder="DELETE"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 sm:flex-row sm:justify-end">
                      <button
                        onClick={() => {
                          setShowCriticalWarning(false);
                          setDeleteConfirmationInput("");
                          setPendingDeleteId(null);
                          setPendingDeleteEmail(null);
                        }}
                        className="rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        {criticalWarningType === "protected_user" ? "OK" : "Cancel"}
                      </button>
                      {criticalWarningType === "self_delete" && (
                        <button
                          onClick={handleCriticalWarningConfirm}
                          disabled={deleteConfirmationInput !== "DELETE"}
                          className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Delete Account
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Team Management</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Manage team members, categories, and profile visibility for Eagle Research Lab.
                  </p>
                </div>
                <button
                  onClick={handleAddTeamMember}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Member
                </button>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-900/90">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Name</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Role</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Department</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Category</th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Status</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {teamLoading ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                            Loading team members...
                          </td>
                        </tr>
                      ) : teamList.length > 0 ? (
                        teamList.map((member) => (
                          <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/70">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800">
                                  <img src={member.profileImage} alt={member.name} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-white">{member.name}</div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">{member.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{member.role}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{member.department}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{member.category}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${member.active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}>
                                {member.active ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEditTeamMember(member)}
                                  className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTeamMember(member.id)}
                                  className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                            No team members available. Add a new profile to start building your team.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Gallery Management</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Manage visual assets and research videos for the public site.
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {gallerySubTab === "images" ? (
                    <button 
                      onClick={() => {
                        setEditingImage(null);
                        setImageFormData({
                          title: "",
                          caption: "",
                          category: "Laboratory",
                          image_url: "",
                          featured: false,
                          display_order: galleryImagesList.length + 1,
                          event_date: new Date().toISOString().split('T')[0]
                        });
                        setShowImageModal(true);
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Image
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setEditingVideo(null);
                        setVideoFormData({
                          title: "",
                          caption: "",
                          category: "Laboratory",
                          video_type: "youtube",
                          video_url: "",
                          thumbnail_url: "",
                          featured: false,
                          display_order: galleryVideosList.length + 1,
                          event_date: new Date().toISOString().split('T')[0]
                        });
                        setShowVideoModal(true);
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Video
                    </button>
                  )}
                </div>
              </div>

              {/* Sub-tab Selector */}
              <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setGallerySubTab("images")}
                  className={`px-6 py-3 font-bold text-sm border-b-2 transition-all ${
                    gallerySubTab === "images"
                      ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  Images ({galleryImagesList.length})
                </button>
                <button
                  onClick={() => setGallerySubTab("videos")}
                  className={`px-6 py-3 font-bold text-sm border-b-2 transition-all ${
                    gallerySubTab === "videos"
                      ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  Videos ({galleryVideosList.length})
                </button>
              </div>


              {/* Lists */}
              {gallerySubTab === "images" ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Order</th>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Preview</th>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Title & Category</th>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Featured</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {galleryImagesList.sort((a,b) => (a.display_order || 0) - (b.display_order || 0)).map((img, i) => (
                          <tr key={img.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-semibold text-slate-900 dark:text-white w-6">
                                  {img.display_order}
                                </span>
                                <div className="flex flex-col">
                                  <button 
                                    disabled={i === 0}
                                    onClick={() => handleReorderImage(i, 'up')}
                                    className="p-0.5 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    disabled={i === galleryImagesList.length - 1}
                                    onClick={() => handleReorderImage(i, 'down')}
                                    className="p-0.5 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <img 
                                src={img.image_url}
                                alt={img.title} 
                                className="w-12 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-700" 
                              />
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-semibold text-slate-900 dark:text-white">{img.title}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xs">{img.caption}</div>
                              <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                {img.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                              {img.event_date}
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={() => {
                                  const updated = galleryImagesList.map(item => 
                                    item.id === img.id ? { ...item, featured: !item.featured } : item
                                  );
                                  saveImagesList(updated);
                                }}
                                className={`p-1.5 rounded-full transition-colors ${
                                  img.featured 
                                    ? "text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20" 
                                    : "text-slate-300 hover:text-slate-400 dark:text-slate-600"
                                }`}
                              >
                                ★
                              </button>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleEditImage(img)}
                                  className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteImage(img.id)}
                                  className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Order</th>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Preview</th>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Title & Category</th>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Video Type & URL</th>
                          <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Featured</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {galleryVideosList.sort((a,b) => (a.display_order || 0) - (b.display_order || 0)).map((vid, i) => (
                          <tr key={vid.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-semibold text-slate-900 dark:text-white w-6">
                                  {vid.display_order}
                                </span>
                                <div className="flex flex-col">
                                  <button 
                                    disabled={i === 0}
                                    onClick={() => handleReorderVideo(i, 'up')}
                                    className="p-0.5 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button 
                                    disabled={i === galleryVideosList.length - 1}
                                    onClick={() => handleReorderVideo(i, 'down')}
                                    className="p-0.5 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="relative w-16 aspect-video bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                {vid.thumbnail_url ? (
                                  <img src={vid.thumbnail_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <Video className="w-5 h-5 text-slate-400" />
                                )}
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                  <Play className="w-3 h-3 text-white fill-white" />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-semibold text-slate-900 dark:text-white">{vid.title}</div>
                              <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                {vid.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                              <span className="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-semibold capitalize mr-2">
                                {vid.video_type}
                              </span>
                              <span className="font-mono text-xs">{vid.video_url}</span>
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={async () => {
                                  const updated = galleryVideosList.map(item => 
                                    item.id === vid.id ? { ...item, featured: !item.featured } : item
                                  );
                                  await persistVideoOrderAndFeatured(updated);
                                }}
                                className={`p-1.5 rounded-full transition-colors ${
                                  vid.featured 
                                    ? "text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20" 
                                    : "text-slate-300 hover:text-slate-400 dark:text-slate-600"
                                }`}
                              >
                                ★
                              </button>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleEditVideo(vid)}
                                  className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteVideo(vid.id)}
                                  className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h2>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Change Password</h3>
                <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  {passwordMessage.text && (
                    <div className={`text-sm ${passwordMessage.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                      {passwordMessage.text}
                    </div>
                  )}
                  <button 
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>

              {user?.role === 'editor' && (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-red-200 dark:border-red-900">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
                  <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={() => {
                        setCriticalWarningType("self_delete");
                        setCriticalWarningMessage(
                          '⚠️ CRITICAL WARNING ⚠️\n\n' +
                          'You are about to DELETE YOUR OWN ACCOUNT!\n\n' +
                          'This action is IRREVERSIBLE and will:\n' +
                          '• Immediately log you out of the system\n' +
                          '• Delete all your access and permissions\n' +
                          '• Remove you from the editorial team\n\n' +
                          'Type "DELETE" below to confirm.'
                        );
                        setPendingDeleteId(user?.id || "");
                        setPendingDeleteEmail(user?.email || "");
                        setDeleteConfirmationInput("");
                        setShowCriticalWarning(true);
                      }}
                      className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Team Member Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 z-[110] overflow-y-auto bg-slate-900/80 p-4">
          <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-6 py-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {editingTeamMember ? "Edit Team Member" : "Add Team Member"}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Add or update a profile for the public team page.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseTeamModal}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleTeamSubmit} className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name *</span>
                  <input
                    type="text"
                    name="name"
                    value={teamFormData.name}
                    onChange={handleTeamInputChange}
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Slug</span>
                  <input
                    type="text"
                    name="slug"
                    value={teamFormData.slug}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="profile-slug"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Role *</span>
                  <input
                    type="text"
                    name="role"
                    value={teamFormData.role}
                    onChange={handleTeamInputChange}
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Title</span>
                  <input
                    type="text"
                    name="title"
                    value={teamFormData.title}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Department</span>
                  <input
                    type="text"
                    name="department"
                    value={teamFormData.department}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={teamFormData.email}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone</span>
                  <input
                    type="text"
                    name="phone"
                    value={teamFormData.phone}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Office Location</span>
                  <input
                    type="text"
                    name="officeLocation"
                    value={teamFormData.officeLocation}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Profile Image</span>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleTeamImageUpload}
                  className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {teamFormData.profileImage && (
                  <div className="mt-2">
                    <img src={teamFormData.profileImage} alt="Preview" className="h-20 w-20 object-cover rounded-2xl" />
                  </div>
                )}
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category</span>
                  <select
                    name="category"
                    value={teamFormData.category}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Principal Investigator">Principal Investigator</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Research Staff">Research Staff</option>
                    <option value="Postdoctoral Fellow">Postdoctoral Fellow</option>
                    <option value="PhD Student">PhD Student</option>
                    <option value="Master's Student">Master's Student</option>
                    <option value="Undergraduate Researcher">Undergraduate Researcher</option>
                    <option value="Administrative Staff">Administrative Staff</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">CV</span>
                  <input
                    type="file"
                    name="cv_url"
                    accept=".pdf,.doc,.docx"
                    onChange={handleTeamCVUpload}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {teamFormData.cv_url && (
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Current: {typeof teamFormData.cv_url === 'string' ? teamFormData.cv_url : teamFormData.cv_url.name}
                    </div>
                  )}
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">ORCID URL</span>
                  <input
                    type="text"
                    name="orcid_url"
                    value={teamFormData.orcid_url}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://orcid.org/..."
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Google Scholar URL</span>
                  <input
                    type="text"
                    name="googleScholar_url"
                    value={teamFormData.googleScholar_url}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://scholar.google.com/..."
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">ResearchGate URL</span>
                  <input
                    type="text"
                    name="researchgate_url"
                    value={teamFormData.researchgate_url}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://www.researchgate.net/..."
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">LinkedIn URL</span>
                  <input
                    type="text"
                    name="linkedin_url"
                    value={teamFormData.linkedin_url}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://www.linkedin.com/..."
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">X (Twitter) URL</span>
                  <input
                    type="text"
                    name="x_url"
                    value={teamFormData.x_url}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://x.com/..."
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Instagram URL</span>
                  <input
                    type="text"
                    name="instagram_url"
                    value={teamFormData.instagram_url}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://www.instagram.com/..."
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Facebook URL</span>
                  <input
                    type="text"
                    name="facebook_url"
                    value={teamFormData.facebook_url}
                    onChange={handleTeamInputChange}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://www.facebook.com/..."
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Biography</span>
                <textarea
                  name="biography"
                  value={teamFormData.biography}
                  onChange={handleTeamInputChange}
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Research Interests</span>
                  <textarea
                    name="researchInterests"
                    value={teamFormData.researchInterests}
                    onChange={handleTeamInputChange}
                    rows={3}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Qualifications</span>
                  <textarea
                    name="qualifications"
                    value={teamFormData.qualifications}
                    onChange={handleTeamInputChange}
                    rows={3}
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </label>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={teamFormData.featured}
                    onChange={handleTeamInputChange}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Featured
                </label>
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    name="active"
                    checked={teamFormData.active}
                    onChange={handleTeamInputChange}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Active
                </label>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCloseTeamModal}
                  className="rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTeam}
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingTeam ? "Saving..." : (editingTeamMember ? "Update Member" : "Save Member")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Publication Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 z-[100] flex flex-col h-screen overflow-hidden">
          {/* Modal Header (Fixed) */}
          <div className="flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {editingPublication ? "Edit Publication" : "Create Publication"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-none mt-1">
                  {editingPublication ? "Modify the existing publication record" : "Publish new research, articles, or reports"}
                </p>
              </div>
            </div>
            <button 
              type="button"
              onClick={handleCloseModal}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 hover:text-slate-700 dark:hover:text-slate-350"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Form Scroll Area */}
          <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
            <div className="max-w-5xl mx-auto px-6 py-8">
              <form onSubmit={handleSubmit} className="space-y-8 pb-20">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter publication title"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="publication-url-slug"
                />
              </div>

              {/* Publication Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Publication Type *
                </label>
                <select
                  name="publication_type"
                  value={formData.publication_type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {publicationTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Authors */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Authors *
                </label>
                <input
                  type="text"
                  name="authors"
                  value={formData.authors}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Author 1, Author 2, Author 3"
                />
              </div>

              {/* Research Area */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Research Area *
                </label>
                <input
                  type="text"
                  name="research_area"
                  value={formData.research_area}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Neuroscience, Brain Health"
                />
              </div>

              {/* Abstract */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Abstract *
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Enter publication abstract"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Full Content (Optional)
                </label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  placeholder="Enter full article content..."
                  minHeight={500}
                />
              </div>

              {/* Journal */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Journal (Optional)
                </label>
                <input
                  type="text"
                  name="journal"
                  value={formData.journal}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Nature Neuroscience"
                />
              </div>

              {/* DOI */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  DOI (Optional)
                </label>
                <input
                  type="text"
                  name="doi"
                  value={formData.doi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 10.1234/example.doi"
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Keywords *
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              {/* Publication Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Publication Date *
                </label>
                <input
                  type="date"
                  name="published_at"
                  value={formData.published_at}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Featured Image (Optional)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-center items-center">
                    <input
                      type="file"
                      name="featured_image"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      id="featured-image-upload"
                    />
                    <label
                      htmlFor="featured-image-upload"
                      className="flex flex-col items-center justify-center cursor-pointer text-center"
                    >
                      <Upload className="w-8 h-8 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {formData.featured_image ? formData.featured_image.name : "Upload Image File"}
                      </span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      placeholder="Or enter direct Image URL (e.g., https://...)"
                    />
                    {formData.image_url && (
                      <div className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 truncate">
                        URL: <a href={formData.image_url} target="_blank" rel="noreferrer" className="underline">{formData.image_url}</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* PDF Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  PDF (Optional)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-center items-center">
                    <input
                      type="file"
                      name="pdf"
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="flex flex-col items-center justify-center cursor-pointer text-center"
                    >
                      <Upload className="w-8 h-8 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {formData.pdf ? formData.pdf.name : "Upload PDF File"}
                      </span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="pdf_url"
                      value={formData.pdf_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      placeholder="Or enter direct PDF URL (e.g., https://...)"
                    />
                    {formData.pdf_url && (
                      <div className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 truncate">
                        URL: <a href={formData.pdf_url} target="_blank" rel="noreferrer" className="underline">{formData.pdf_url}</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="featured" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Featured Publication
                </label>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/15"
                >
                  <Save className="w-4 h-4" />
                  {isSubmitting ? "Saving..." : (editingPublication ? "Update Publication" : "Save Publication")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}

      {/* Gallery Image Add/Edit Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/80 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-xl border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingImage ? "Edit Gallery Image" : "Add Gallery Image"}
              </h3>
              <button 
                onClick={() => {
                  setShowImageModal(false);
                  setEditingImage(null);
                }}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleImageSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={imageFormData.title}
                  onChange={handleImageInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter image title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Caption / Description</label>
                <textarea
                  name="caption"
                  value={imageFormData.caption}
                  onChange={handleImageInputChange}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Enter a brief caption or description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Category *</label>
                  <select
                    name="category"
                    value={imageFormData.category}
                    onChange={handleImageInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {galleryCategories.filter(cat => cat !== "All").map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Event Date *</label>
                  <input
                    type="date"
                    name="event_date"
                    value={imageFormData.event_date}
                    onChange={handleImageInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Image File (Upload to Cloudinary)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Upload a new image. This will be saved to Cloudinary after the data is saved to Supabase.</span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Image URL (Existing)</label>
                <input
                  type="text"
                  name="image_url"
                  value={imageFormData.image_url}
                  onChange={handleImageInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://images.unsplash.com/... or /images/..."
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Or enter an existing image URL. If you upload a file above, this will be replaced.</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    name="display_order"
                    value={imageFormData.display_order}
                    onChange={handleImageInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    name="featured"
                    id="img_featured"
                    checked={imageFormData.featured}
                    onChange={handleImageInputChange}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="img_featured" className="text-sm text-slate-700 dark:text-slate-300 font-semibold select-none">
                    Featured Item
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowImageModal(false);
                    setEditingImage(null);
                  }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingGallery}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {isSubmittingGallery ? "Saving..." : (editingImage ? "Update" : "Save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Video Add/Edit Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/80 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-xl border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingVideo ? "Edit Gallery Video" : "Add Gallery Video"}
              </h3>
              <button 
                onClick={() => {
                  setShowVideoModal(false);
                  setEditingVideo(null);
                }}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleVideoSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={videoFormData.title}
                  onChange={handleVideoInputChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Caption / Description</label>
                <textarea
                  name="caption"
                  value={videoFormData.caption}
                  onChange={handleVideoInputChange}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Enter video description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Category *</label>
                  <select
                    name="category"
                    value={videoFormData.category}
                    onChange={handleVideoInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {galleryCategories.filter(cat => cat !== "All").map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Video Type *</label>
                  <select
                    name="video_type"
                    value={videoFormData.video_type}
                    onChange={handleVideoInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="youtube">YouTube Embed</option>
                    <option value="vimeo">Vimeo Embed</option>
                    <option value="uploaded">Self-hosted Video</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Video URL or Code *</label>
                  <input
                    type="text"
                    name="video_url"
                    value={videoFormData.video_url}
                    onChange={handleVideoInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. https://www.youtube.com/embed/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Thumbnail Image URL</label>
                  <input
                    type="text"
                    name="thumbnail_url"
                    value={videoFormData.thumbnail_url}
                    onChange={handleVideoInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://images.unsplash.com/... or /images/..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Event Date *</label>
                  <input
                    type="date"
                    name="event_date"
                    value={videoFormData.event_date}
                    onChange={handleVideoInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    name="display_order"
                    value={videoFormData.display_order}
                    onChange={handleVideoInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    name="featured"
                    id="vid_featured"
                    checked={videoFormData.featured}
                    onChange={handleVideoInputChange}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="vid_featured" className="text-sm text-slate-700 dark:text-slate-300 font-semibold select-none">
                    Featured
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowVideoModal(false);
                    setEditingVideo(null);
                  }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingGallery}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {isSubmittingGallery ? "Saving..." : (editingVideo ? "Update" : "Save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Research Modal ──────────────────────────────────────────────── */}
      {showResearchModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                  <Microscope className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {editingResearch ? "Edit Research Project" : "Add Research Project"}
                  </h3>
                  <p className="text-xs text-slate-400">Changes are saved to local storage and visible site-wide.</p>
                </div>
              </div>
              <button onClick={() => setShowResearchModal(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleResearchSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Project Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={researchFormData.title}
                  onChange={handleResearchInputChange}
                  required
                  placeholder="e.g. Neural Plasticity in Aging Brains"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {/* Lead Investigator */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Lead Investigator <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="lead_investigator"
                  value={researchFormData.lead_investigator}
                  onChange={handleResearchInputChange}
                  required
                  placeholder="e.g. Dr. Sarah Chen"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Description <span className="text-red-500">*</span></label>
                <textarea
                  name="description"
                  value={researchFormData.description}
                  onChange={handleResearchInputChange}
                  required
                  rows={4}
                  placeholder="Brief description of the research project..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                />
              </div>

              {/* Funding Source */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Funding Source</label>
                <input
                  type="text"
                  name="funding_source"
                  value={researchFormData.funding_source}
                  onChange={handleResearchInputChange}
                  placeholder="e.g. NIH Grant #12345"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={researchFormData.start_date}
                  onChange={handleResearchInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={researchFormData.end_date}
                  onChange={handleResearchInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Status</label>
                <select
                  name="status"
                  value={researchFormData.status}
                  onChange={handleResearchInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="is_featured"
                  id="is_featured"
                  checked={researchFormData.is_featured}
                  onChange={(e) => setResearchFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="is_featured" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Featured Project</label>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Project Image</label>
                <div className="flex items-center gap-4">
                  {researchFormData.image_url && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex-shrink-0">
                      <img src={researchFormData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleResearchImageUpload}
                    className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/40"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResearchModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingResearch}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {isSubmittingResearch ? "Saving..." : (editingResearch ? "Update" : "Save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Generic Research Section Modal (Philosophy, Areas, Methodology, Collaborations) ── */}
      {showResearchSectionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                  <Microscope className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                    {editingResearchSection ? `Edit ${researchSectionType}` : `Add ${researchSectionType}`}
                  </h3>
                  <p className="text-xs text-slate-400">Changes will reflect instantly on the public Research page.</p>
                </div>
              </div>
              <button onClick={() => setShowResearchSectionModal(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleResearchSectionSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Title / Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {researchSectionType === "collaborations" ? "Institution Name" : "Item Title"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={researchSectionFormData.title}
                  onChange={handleResearchSectionInputChange}
                  required
                  placeholder={researchSectionType === "collaborations" ? "e.g. MIT Neuroscience" : "e.g. Mission / Cognitive Neuroscience"}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {/* website URL for Collaborations */}
              {researchSectionType === "collaborations" && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Institution website URL</label>
                  <input
                    type="text"
                    name="websiteUrl"
                    value={researchSectionFormData.websiteUrl}
                    onChange={handleResearchSectionInputChange}
                    placeholder="e.g. https://mit.edu or #"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Description <span className="text-red-500">*</span></label>
                <textarea
                  name="description"
                  value={researchSectionFormData.description}
                  onChange={handleResearchSectionInputChange}
                  required
                  rows={4}
                  placeholder="Provide a brief details/description..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {researchSectionType === "collaborations" ? "Institution Logo (Icon)" : "Card Image"}
                </label>
                <div className="flex items-center gap-4">
                  {researchSectionFormData.image_url && (
                    <div className={`overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex-shrink-0 ${
                      researchSectionType === "collaborations" ? "w-12 h-12 rounded-full" : "w-16 h-12 rounded-lg"
                    }`}>
                      <img src={researchSectionFormData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleResearchSectionImageUpload}
                    className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-900/30 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/40"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResearchSectionModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  {editingResearchSection ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



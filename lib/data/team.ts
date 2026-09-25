export type TeamCategory =
  | "Principal Investigator"
  | "Leadership"
  | "Research Staff"
  | "Postdoctoral Fellow"
  | "PhD Student"
  | "Master's Student"
  | "Undergraduate Researcher"
  | "Administrative Staff";

export interface SocialLinks {
  orcid?: string;
  googleScholar?: string;
  researchGate?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface PublicationEntry {
  title: string;
  venue: string;
  year: number;
  link?: string;
}

export interface ProjectEntry {
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  title: string;
  department: string;
  bio: string;
  researchInterests: string[];
  qualifications: string[];
  email: string;
  phone?: string;
  officeLocation?: string;
  profileImage: string;
  cvUrl?: string;
  category: TeamCategory;
  featured?: boolean;
  displayOrder?: number;
  active?: boolean;
  socialLinks: SocialLinks;
  publications: number;
  hIndex: number;
  publicationsList?: PublicationEntry[];
  projects?: ProjectEntry[];
  awards: string[];
  joinDate: string;
}

export interface Collaborator {
  id: string;
  institutionLogo: string;
  institutionName: string;
  name: string;
  position: string;
  country: string;
  institutionUrl?: string;
}

// Removed hardcoded team member data - now using Supabase database
export const teamMembers: TeamMember[] = [];

export const collaborators: Collaborator[] = [];

export const principalInvestigator = teamMembers.find(
  (member) => member.category === "Principal Investigator"
);
export const leadershipTeam = teamMembers.filter(
  (member) => member.category === "Leadership"
);
export const researchTeam = teamMembers.filter(
  (member) =>
    member.category === "Research Staff" || member.category === "Postdoctoral Fellow"
);
export const phdStudents = teamMembers.filter(
  (member) => member.category === "PhD Student"
);
export const mastersStudents = teamMembers.filter(
  (member) => member.category === "Master's Student"
);
export const undergraduateResearchers = teamMembers.filter(
  (member) => member.category === "Undergraduate Researcher"
);
export const administrativeStaff = teamMembers.filter(
  (member) => member.category === "Administrative Staff"
);

export const activeTeamMembers = teamMembers.filter((member) => member.active !== false);

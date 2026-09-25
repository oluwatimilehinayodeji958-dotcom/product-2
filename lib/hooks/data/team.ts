export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  image: string;
  email: string;
  phone?: string;
  office?: string;
  education: string[];
  researchInterests: string[];
  publications: number;
  hIndex: number;
  socialLinks: {
    googleScholar?: string;
    orcid?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  awards: string[];
  joinDate: string;
  isLeadership?: boolean;
  department: string;
}

// Removed hardcoded team member data - now using Supabase database
export const teamMembers: TeamMember[] = [];

export const departments = [
  "All",
  "Neuroscience",
  "Cognitive Neuroscience",
  "Neuroinformatics",
  "Molecular Neurobiology",
  "Systems Neuroscience",
  "Developmental Neuroscience",
  "Computational Neuroscience",
  "Neurobiology",
  "Clinical Neuroscience",
  "Administration",
];

export const leadershipTeam = teamMembers.filter((m) => m.isLeadership);
export const researchTeam = teamMembers.filter((m) => !m.isLeadership && m.role !== "Lab Manager");
export const supportTeam = teamMembers.filter((m) => m.role === "Lab Manager" || m.role === "Research Assistant");
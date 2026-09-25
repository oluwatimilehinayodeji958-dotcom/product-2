export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  icon?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  slug: string;
  summary: string;
  full_description?: string;
  principal_investigator: string;
  research_area_id: string;
  status: 'ongoing' | 'completed';
  cover_image_url?: string;
  gallery_urls?: string[];
  start_date: string;
  end_date?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Collaboration {
  id: string;
  institution_name: string;
  logo_url?: string;
  description: string;
  website?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ResearchStatistics {
  id: string;
  publications: number;
  active_projects: number;
  collaborations: number;
  researchers: number;
  students_mentored: number;
  updated_at: string;
}

export interface CreateResearchAreaInput {
  title: string;
  description: string;
  image?: File;
  icon?: File;
  display_order: number;
}

export interface CreateResearchProjectInput {
  title: string;
  slug: string;
  summary: string;
  full_description?: string;
  principal_investigator: string;
  research_area_id: string;
  status: 'ongoing' | 'completed';
  cover_image?: File;
  gallery?: File[];
  start_date: string;
  end_date?: string;
  featured: boolean;
}

export interface CreateCollaborationInput {
  institution_name: string;
  logo?: File;
  description: string;
  website?: string;
  display_order: number;
}

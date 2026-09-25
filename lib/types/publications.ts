export type PublicationType = 
  | 'Journal Article'
  | 'Conference Paper'
  | 'Research Report'
  | 'Book Chapter'
  | 'Thesis & Dissertation';

export interface Publication {
  id: string;
  title: string;
  slug: string;
  publication_type: PublicationType;
  authors: string[];
  research_area: string;
  abstract: string;
  content?: string;
  journal?: string;
  doi?: string;
  keywords: string[];
  featured_image_url?: string;
  pdf_url?: string;
  published_at: string;
  status: 'draft' | 'published';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePublicationInput {
  title: string;
  slug: string;
  publication_type: PublicationType;
  authors: string[];
  research_area: string;
  abstract: string;
  content?: string;
  journal?: string;
  doi?: string;
  keywords: string[];
  featured_image?: File;
  pdf?: File;
  featured: boolean;
  status: 'draft' | 'published';
  published_at: string;
}

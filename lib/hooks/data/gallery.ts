// ──────────────────────────────────────────────
// Gallery Types
// ──────────────────────────────────────────────

export interface GalleryImage {
  id: string;
  title: string;
  caption: string;
  category: string;
  image_url: string;
  featured: boolean;
  display_order: number;
  event_date: string;
  created_at?: string;
  // legacy aliases kept for compatibility
  src?: string;
  alt?: string;
  description?: string;
  location?: string;
  photographer?: string;
  tags?: string[];
  width?: number;
  height?: number;
}

export type VideoType = "youtube" | "vimeo" | "uploaded";

export interface GalleryVideo {
  id: string;
  title: string;
  caption: string;
  category: string;
  video_type: VideoType;
  video_url: string;
  thumbnail_url: string;
  featured: boolean;
  display_order: number;
  event_date: string;
  created_at?: string;
  duration?: string;
}

// ──────────────────────────────────────────────
// Categories
// ──────────────────────────────────────────────

export const galleryCategories = [
  "All",
  "Laboratory",
  "Research Activities",
  "Conferences",
  "Workshops",
  "Seminars",
  "Community Outreach",
  "Team",
  "Awards",
  "Facilities",
];

// ──────────────────────────────────────────────
// Image Seed Data  (Unsplash for demo)
// ──────────────────────────────────────────────

export const galleryImages: GalleryImage[] = [
  {
    id: "gal-001",
    title: "Neural Recording Session",
    caption: "Real-time neural activity recording using our custom electrode array. Researchers monitor signal quality during a motor imagery task.",
    category: "Research Activities",
    image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&auto=format&fit=crop",
    featured: true,
    display_order: 1,
    event_date: "2024-03-10",
    alt: "High-density neural recording session",
    location: "Eagle's Lab Neural Engineering Suite",
    tags: ["BCI", "Electrophysiology", "Neural Recording"],
    width: 1200, height: 800,
  },
  {
    id: "gal-002",
    title: "fMRI Brain Analysis",
    caption: "The team analyzing functional connectivity patterns from the latest memory encoding study using our high-field MRI facility.",
    category: "Research Activities",
    image_url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&auto=format&fit=crop",
    featured: true,
    display_order: 2,
    event_date: "2024-02-28",
    alt: "fMRI brain imaging analysis",
    location: "Eagle's Lab Imaging Center",
    tags: ["fMRI", "Neuroimaging", "Memory"],
    width: 1200, height: 800,
  },
  {
    id: "gal-003",
    title: "Weekly Lab Meeting",
    caption: "Full team gathered for our weekly research meeting — discussing project progress and planning upcoming experiments.",
    category: "Laboratory",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop",
    featured: true,
    display_order: 3,
    event_date: "2024-03-05",
    alt: "Weekly lab meeting discussion",
    location: "Eagle's Lab Conference Room",
    tags: ["Meeting", "Team", "Collaboration"],
    width: 1200, height: 800,
  },
  {
    id: "gal-004",
    title: "2023 Annual Symposium Keynote",
    caption: "Dr. Jonathan Eagle delivering the opening keynote at the 2023 Eagle's Lab Annual Neuroscience Symposium, attended by over 400 researchers.",
    category: "Conferences",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop",
    featured: true,
    display_order: 4,
    event_date: "2023-09-15",
    alt: "Annual symposium keynote presentation",
    location: "University Grand Auditorium",
    tags: ["Symposium", "Keynote", "Conference"],
    width: 1200, height: 800,
  },
  {
    id: "gal-005",
    title: "Electron Microscopy Facility",
    caption: "State-of-the-art transmission electron microscope used for ultra-high resolution imaging of synaptic structures.",
    category: "Facilities",
    image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop",
    featured: false,
    display_order: 5,
    event_date: "2024-01-20",
    alt: "Transmission electron microscope facility",
    location: "Eagle's Lab Imaging Center",
    tags: ["Microscopy", "Equipment", "Imaging"],
    width: 800, height: 1200,
  },
  {
    id: "gal-006",
    title: "Community Brain Health Screening",
    caption: "Eagle's Lab researchers conducting cognitive assessments and brain health screenings in underserved communities.",
    category: "Community Outreach",
    image_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&auto=format&fit=crop",
    featured: true,
    display_order: 6,
    event_date: "2023-11-08",
    alt: "Community brain health screening",
    location: "Community Health Center, Ogbomoso",
    tags: ["Outreach", "Community", "Health"],
    width: 1200, height: 800,
  },
  {
    id: "gal-007",
    title: "Eagle's Lab Team 2024",
    caption: "The complete Eagle's Lab team photo for 2024, featuring researchers, students, and staff across all divisions.",
    category: "Team",
    image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop",
    featured: true,
    display_order: 7,
    event_date: "2024-01-15",
    alt: "Eagle's Lab team photo 2024",
    location: "University Quad",
    tags: ["Team", "Group Photo", "2024"],
    width: 1600, height: 900,
  },
  {
    id: "gal-008",
    title: "Brain Network Visualization",
    caption: "3D visualization of functional brain networks derived from resting-state fMRI data, showing the default mode network.",
    category: "Research Activities",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop",
    featured: false,
    display_order: 8,
    event_date: "2024-02-15",
    alt: "Neural network visualization",
    location: "Eagle's Lab Visualization Lab",
    tags: ["Networks", "Visualization", "fMRI"],
    width: 1200, height: 1200,
  },
  {
    id: "gal-009",
    title: "Neuroscience Workshop 2023",
    caption: "Participants at the 2023 Neuroscience Workshop working on hands-on projects with mentorship from Eagle's Lab researchers.",
    category: "Workshops",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop",
    featured: false,
    display_order: 9,
    event_date: "2023-08-12",
    alt: "Neuroscience workshop participants",
    location: "Innovation Hub, LAUTECH",
    tags: ["Workshop", "Students", "Innovation"],
    width: 1200, height: 800,
  },
  {
    id: "gal-010",
    title: "Neuronal Cell Culture",
    caption: "Primary cortical neurons cultured in vitro for studying synaptic plasticity. Mature neurons with extensive dendritic arborization.",
    category: "Laboratory",
    image_url: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&auto=format&fit=crop",
    featured: false,
    display_order: 10,
    event_date: "2024-03-01",
    alt: "Primary neuronal cell culture",
    location: "Eagle's Lab Cell Culture Facility",
    tags: ["Cell Culture", "Neurons", "Microscopy"],
    width: 800, height: 800,
  },
  {
    id: "gal-011",
    title: "Research Excellence Award 2023",
    caption: "Eagle's Lab receives the LAUTECH Research Excellence Award for outstanding contributions to biomedical neuroscience.",
    category: "Awards",
    image_url: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1200&auto=format&fit=crop",
    featured: true,
    display_order: 11,
    event_date: "2023-05-20",
    alt: "Research excellence award ceremony",
    location: "University Graduation Hall",
    tags: ["Award", "Achievement", "Recognition"],
    width: 1200, height: 800,
  },
  {
    id: "gal-012",
    title: "Seminar: Neurodegeneration",
    caption: "Distinguished lecture on neurodegeneration mechanisms hosted by Eagle's Lab, with speakers from Lagos and Ibadan universities.",
    category: "Seminars",
    image_url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop",
    featured: false,
    display_order: 12,
    event_date: "2024-03-15",
    alt: "Seminar on neurodegeneration",
    location: "Eagle's Lab Seminar Room",
    tags: ["Seminar", "Neurodegeneration", "Lecture"],
    width: 800, height: 1200,
  },
  {
    id: "gal-013",
    title: "Lab Facilities — PCR Station",
    caption: "Our modern PCR workstation equipped for high-throughput genetic analysis supporting neurodegenerative disease research.",
    category: "Facilities",
    image_url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&auto=format&fit=crop",
    featured: false,
    display_order: 13,
    event_date: "2024-01-10",
    alt: "PCR laboratory facility",
    location: "Eagle's Lab Molecular Suite",
    tags: ["Facilities", "PCR", "Equipment"],
    width: 1200, height: 800,
  },
  {
    id: "gal-014",
    title: "Kids Neuroscience Outreach",
    caption: "Interactive neuroscience workshop for primary school children, featuring brain models and neuron-building activities.",
    category: "Community Outreach",
    image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop",
    featured: false,
    display_order: 14,
    event_date: "2023-10-15",
    alt: "Neuroscience outreach for children",
    location: "St. Joseph Primary School, Ogbomoso",
    tags: ["Outreach", "Education", "Children"],
    width: 1200, height: 800,
  },
  {
    id: "gal-015",
    title: "SFN 2023 Poster Session",
    caption: "Eagle's Lab presenting 8 research posters at the 2023 West African Neuroscience Conference in Lagos.",
    category: "Conferences",
    image_url: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=1200&auto=format&fit=crop",
    featured: false,
    display_order: 15,
    event_date: "2023-11-12",
    alt: "Research poster presentation",
    location: "Eko Hotel Convention Center, Lagos",
    tags: ["Conference", "Poster", "Presentation"],
    width: 800, height: 1200,
  },
  {
    id: "gal-016",
    title: "Graduate Students Research Day",
    caption: "Annual event where graduate students present their ongoing research to faculty and invited guests.",
    category: "Research Activities",
    image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop",
    featured: false,
    display_order: 16,
    event_date: "2024-02-20",
    alt: "Graduate students research day",
    location: "Eagle's Lab, LAUTECH",
    tags: ["Research", "Graduate", "Presentation"],
    width: 1200, height: 800,
  },
];

// ──────────────────────────────────────────────
// Video Seed Data
// ──────────────────────────────────────────────

export const galleryVideos: GalleryVideo[] = [
  {
    id: "vid-001",
    title: "Inside Eagle's Lab: A Day in the Life",
    caption: "Tour of Eagle's Lab — from morning meetings to late-night recordings. Watch this and more from our YouTube channel: UC9jI94TzJWnJmM5z7VhQJyQ.",
    category: "Laboratory",
    video_type: "youtube",
    video_url: "https://www.youtube.com/embed/jTuBnZrLbq0",
    thumbnail_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop",
    featured: true,
    display_order: 1,
    event_date: "2024-03-01",
    duration: "4:32",
  },
  {
    id: "vid-002",
    title: "2023 Annual Symposium Highlights",
    caption: "Keynote addresses, panels, and student research presentations at our annual neuroscience symposium. Published on YouTube channel: UC9jI94TzJWnJmM5z7VhQJyQ.",
    category: "Conferences",
    video_type: "youtube",
    video_url: "https://www.youtube.com/embed/o8NPllzkFhE",
    thumbnail_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    featured: true,
    display_order: 2,
    event_date: "2023-09-18",
    duration: "7:15",
  },
  {
    id: "vid-003",
    title: "Community Brain Health Campaign",
    caption: "Taking neuroscience beyond the laboratory walls — reaching communities across Ogbomoso. Sourced from YouTube channel: UC9jI94TzJWnJmM5z7VhQJyQ.",
    category: "Community Outreach",
    video_type: "youtube",
    video_url: "https://www.youtube.com/embed/6ZfuNTqbHE8",
    thumbnail_url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop",
    featured: false,
    display_order: 3,
    event_date: "2023-11-10",
    duration: "3:48",
  },
  {
    id: "vid-004",
    title: "Neuroscience Workshop: EEG Tutorial",
    caption: "Step-by-step tutorial on EEG signal acquisition and processing from our student workshops. Subscribe to channel UC9jI94TzJWnJmM5z7VhQJyQ.",
    category: "Workshops",
    video_type: "youtube",
    video_url: "https://www.youtube.com/embed/tpg6xsQBFCM",
    thumbnail_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
    featured: false,
    display_order: 4,
    event_date: "2023-08-15",
    duration: "12:04",
  },
];

// ──────────────────────────────────────────────
// Helper Functions
// ──────────────────────────────────────────────

export const getFeaturedGalleryImages = (): GalleryImage[] =>
  galleryImages.filter((img) => img.featured).sort((a, b) => a.display_order - b.display_order);

export const getFeaturedGalleryVideos = (): GalleryVideo[] =>
  galleryVideos.filter((v) => v.featured).sort((a, b) => a.display_order - b.display_order);

export const getGalleryByCategory = (category: string): GalleryImage[] => {
  const sorted = [...galleryImages].sort((a, b) => a.display_order - b.display_order);
  return category === "All" ? sorted : sorted.filter((img) => img.category === category);
};

export const getVideosByCategory = (category: string): GalleryVideo[] => {
  const sorted = [...galleryVideos].sort((a, b) => a.display_order - b.display_order);
  return category === "All" ? sorted : sorted.filter((v) => v.category === category);
};

export const getGalleryImageById = (id: string): GalleryImage | undefined =>
  galleryImages.find((img) => img.id === id);

export const getGalleryVideoById = (id: string): GalleryVideo | undefined =>
  galleryVideos.find((v) => v.id === id);

export const getImageCountByCategory = (): Record<string, number> => {
  const counts: Record<string, number> = { All: galleryImages.length };
  galleryImages.forEach((img) => {
    counts[img.category] = (counts[img.category] || 0) + 1;
  });
  return counts;
};
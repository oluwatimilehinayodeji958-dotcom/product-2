export type EventCategory =
  | "Conferences"
  | "Seminars"
  | "Workshops"
  | "Symposiums"
  | "Training"
  | "Community Outreach"
  | "Public Lectures"
  | "Webinars"
  | "Other";

export type EventStatus = "Upcoming" | "Ongoing" | "Completed" | "Cancelled";

export interface EventSpeaker {
  id: string;
  name: string;
  title?: string;
  institution?: string;
  profileImage?: string;
}

export interface EventGalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
  displayOrder?: number;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: EventCategory | string;
  shortDescription?: string;
  description?: string;
  bannerImage?: string;
  venue?: string;
  organizer?: string;
  registrationLink?: string;
  registrationDeadline?: string | null;
  startDate: string; // YYYY-MM-DD
  endDate?: string | null; // YYYY-MM-DD
  startTime?: string | null; // HH:mm
  endTime?: string | null; // HH:mm
  status: EventStatus;
  featured?: boolean;
  published?: boolean;
  speakers?: EventSpeaker[];
  gallery?: EventGalleryItem[];
  attachments?: { name: string; url: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export const EVENT_CATEGORIES: (EventCategory | string)[] = [
  "All Events",
  "Conferences",
  "Seminars",
  "Workshops",
  "Symposiums",
  "Training",
  "Community Outreach",
  "Public Lectures",
  "Webinars",
];

// Minimal sample events
export const events: EventItem[] = [
  {
    id: "evt-1",
    slug: "neurotech-conference-2026",
    title: "Neurotech Conference 2026",
    category: "Conferences",
    shortDescription: "A multidisciplinary conference on neurotechnology and clinical translation.",
    description:
      "Join leading researchers and industry to discuss advances in brain-computer interfaces, neural engineering, and translational neurotechnology.",
    bannerImage: "/images/events/neurotech-2026.jpg",
    venue: "Auditorium A, Eagle Research Center",
    organizer: "Eagle Research Lab",
    registrationLink: "https://example.com/register/neurotech-2026",
    registrationDeadline: "2026-09-01",
    startDate: "2026-10-12",
    endDate: "2026-10-14",
    startTime: "09:00",
    endTime: "17:00",
    status: "Upcoming",
    featured: true,
    published: true,
    speakers: [
      { id: "s1", name: "Dr. Jonathan Eagle", title: "Professor of Neuroscience", institution: "Eagle University" },
      { id: "s2", name: "Dr. Sarah Chen", title: "Associate Professor", institution: "Eagle University" },
    ],
    gallery: [
      { id: "g1", imageUrl: "/images/events/neurotech-1.jpg", caption: "Keynote" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "evt-2",
    slug: "brain-hackathon-2025",
    title: "Brain Hackathon 2025",
    category: "Workshops",
    shortDescription: "24-hour hackathon applying ML to neural datasets.",
    description: "Teams build prototypes that demonstrate novel analytic approaches to neural time-series.",
    bannerImage: "/images/events/hackathon-2025.jpg",
    venue: "Innovation Lab, Building C",
    organizer: "Eagle Research Lab",
    startDate: "2025-07-10",
    endDate: "2025-07-11",
    startTime: "10:00",
    endTime: "10:00",
    status: "Completed",
    featured: false,
    published: true,
    speakers: [{ id: "s3", name: "Ms. Anika Gupta", title: "PhD Candidate" }],
    gallery: [
      { id: "g2", imageUrl: "/images/events/hack-1.jpg", caption: "Project demo" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "evt-3",
    slug: "community-science-day-2026",
    title: "Community Science Day",
    category: "Community Outreach",
    shortDescription: "Free public day of demos and hands-on activities for families.",
    description: "Engage the public with interactive demos, student presentations, and guided tours of lab facilities.",
    bannerImage: "/images/events/community-day.jpg",
    venue: "Campus Plaza",
    organizer: "Eagle Outreach",
    startDate: "2026-06-05",
    startTime: "11:00",
    endTime: "15:00",
    status: "Upcoming",
    featured: false,
    published: true,
    createdAt: new Date().toISOString(),
  },
];

export function findEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug) || null;
}

export function upcomingEvents() {
  const today = new Date().toISOString().split("T")[0];
  return events.filter((e) => e.startDate >= today && e.published);
}

export function pastEvents() {
  const today = new Date().toISOString().split("T")[0];
  return events.filter((e) => e.startDate < today && e.published);
}

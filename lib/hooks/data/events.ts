export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  type: "conference" | "workshop" | "seminar" | "symposium" | "colloquium" | "training";
  date: string;
  endDate?: string;
  time: string;
  location: string;
  venue: string;
  address: string;
  speakers: Speaker[];
  organizers: string[];
  capacity: number;
  registered: number;
  registrationUrl?: string;
  image: string;
  tags: string[];
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  isFeatured?: boolean;
  agenda?: AgendaItem[];
  sponsors?: string[];
  recordingUrl?: string;
  materialsUrl?: string;
}

export interface Speaker {
  name: string;
  affiliation: string;
  title: string;
  bio: string;
  image: string;
  talkTitle?: string;
  talkAbstract?: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
  type: "talk" | "break" | "panel" | "demo" | "networking";
}

export const events: Event[] = [
  {
    id: "evt-001",
    title: "Eagle's Lab Annual Neuroscience Symposium 2024",
    description:
      "Our flagship annual event bringing together leading neuroscientists from around the world to discuss breakthrough discoveries and emerging trends in brain science.",
    longDescription:
      "The Eagle's Lab Annual Neuroscience Symposium is our premier scientific gathering, attracting over 500 researchers, clinicians, and students. This year's theme, 'Neural Frontiers: From Molecules to Mind,' features keynote lectures from Nobel laureates, panel discussions on ethical AI in neuroscience, and hands-on workshops in cutting-edge techniques. The symposium provides a unique platform for interdisciplinary collaboration and knowledge exchange.",
    type: "symposium",
    date: "2024-09-15",
    endDate: "2024-09-17",
    time: "09:00 - 17:00",
    location: "University Conference Center",
    venue: "Grand Auditorium",
    address: "1234 University Drive, Science District, ST 12345",
    speakers: [
      {
        name: "Dr. John O'Keefe",
        affiliation: "University College London",
        title: "Nobel Laureate in Physiology or Medicine",
        bio: "Discovered place cells in the hippocampus, fundamentally advancing our understanding of spatial memory and navigation.",
        image: "/images/speakers/okeefe.jpg",
        talkTitle: "The Cognitive Map: From Discovery to Application",
      },
      {
        name: "Dr. Ed Boyden",
        affiliation: "MIT Media Lab",
        title: "Professor of Biological Engineering",
        bio: "Pioneer in optogenetics and expansion microscopy, developing revolutionary tools for mapping brain circuits.",
        image: "/images/speakers/boyden.jpg",
        talkTitle: "Tools for Mapping and Repairing the Brain",
      },
      {
        name: "Dr. Nancy Kanwisher",
        affiliation: "MIT",
        title: "Professor of Cognitive Neuroscience",
        bio: "Leading researcher in functional neuroimaging, known for discovering the fusiform face area and other specialized brain regions.",
        image: "/images/speakers/kanwisher.jpg",
        talkTitle: "Functional Specialization in the Human Brain",
      },
    ],
    organizers: ["Dr. Jonathan Eagle", "Dr. Sarah Chen", "Ms. Chioma Okonkwo"],
    capacity: 500,
    registered: 342,
    registrationUrl: "/events/register/symposium-2024",
    image: "/images/events/symposium-2024.jpg",
    tags: ["Symposium", "Keynotes", "Networking", "Neuroscience"],
    status: "upcoming",
    isFeatured: true,
    agenda: [
      { time: "08:30", title: "Registration & Breakfast", type: "networking" },
      { time: "09:00", title: "Opening Remarks", description: "Dr. Jonathan Eagle", type: "talk" },
      { time: "09:30", title: "Keynote: Tools for Mapping and Repairing the Brain", speaker: "Dr. Ed Boyden", type: "talk" },
      { time: "10:30", title: "Coffee Break & Poster Session", type: "break" },
      { time: "11:00", title: "Panel: AI Ethics in Neuroscience", type: "panel" },
      { time: "12:30", title: "Lunch & Networking", type: "networking" },
      { time: "14:00", title: "Keynote: The Cognitive Map", speaker: "Dr. John O'Keefe", type: "talk" },
      { time: "15:00", title: "Workshop: Advanced fMRI Analysis", type: "demo" },
      { time: "16:30", title: "Closing Remarks & Awards", type: "talk" },
    ],
    sponsors: ["NIH", "NSF", "Allen Institute", "Howard Hughes Medical Institute"],
  },
  {
    id: "evt-002",
    title: "Advanced fMRI Analysis Workshop",
    description:
      "Intensive hands-on training in state-of-the-art fMRI data analysis techniques using Python and MATLAB.",
    longDescription:
      "This three-day workshop provides comprehensive training in advanced functional MRI analysis methods. Participants will learn preprocessing pipelines, statistical modeling, connectivity analysis, and machine learning approaches for neuroimaging data. The workshop includes practical sessions with real datasets and expert guidance from Eagle's Lab researchers.",
    type: "workshop",
    date: "2024-07-22",
    endDate: "2024-07-24",
    time: "09:00 - 16:00",
    location: "Eagle's Lab Training Center",
    venue: "Computer Lab B",
    address: "Building C, Room 105, University Campus",
    speakers: [
      {
        name: "Dr. James Kim",
        affiliation: "Eagle's Lab",
        title: "Postdoctoral Fellow",
        bio: "Expert in functional connectivity analysis and neuroimaging methods.",
        image: "/images/team/dr-kim.jpg",
        talkTitle: "Functional Connectivity Analysis",
      },
      {
        name: "Dr. Miguel Rodriguez",
        affiliation: "Eagle's Lab",
        title: "Senior Research Scientist",
        bio: "Specialist in machine learning for neuroimaging and big data analytics.",
        image: "/images/team/dr-rodriguez.jpg",
        talkTitle: "ML for Neuroimaging",
      },
    ],
    organizers: ["Dr. James Kim", "Dr. Miguel Rodriguez"],
    capacity: 40,
    registered: 38,
    registrationUrl: "/events/register/fmri-workshop-2024",
    image: "/images/events/fmri-workshop.jpg",
    tags: ["Workshop", "fMRI", "Training", "Python", "MATLAB"],
    status: "upcoming",
    agenda: [
      { time: "09:00", title: "Introduction to fMRI Preprocessing", type: "talk" },
      { time: "10:30", title: "Hands-on: Preprocessing Pipeline", type: "demo" },
      { time: "12:00", title: "Lunch Break", type: "break" },
      { time: "13:00", title: "Statistical Modeling & Group Analysis", type: "talk" },
      { time: "14:30", title: "Hands-on: GLM Analysis", type: "demo" },
      { time: "16:00", title: "Q&A and Wrap-up", type: "networking" },
    ],
  },
  {
    id: "evt-003",
    title: "Neuroscience Seminar Series: Dr. Lisa Feldman Barrett",
    description:
      "Monthly seminar featuring Dr. Lisa Feldman Barrett discussing the constructed theory of emotion and its implications for neuroscience.",
    longDescription:
      "Dr. Lisa Feldman Barrett presents her groundbreaking theory of constructed emotion, challenging traditional views of emotional brain circuits. Her research demonstrates that emotions are not hardwired but constructed by the brain through predictive processing. This seminar will explore the implications for understanding mental health, social behavior, and brain function.",
    type: "seminar",
    date: "2024-06-20",
    time: "15:00 - 16:30",
    location: "Eagle's Lab Auditorium",
    venue: "Seminar Room A",
    address: "Building A, Room 201",
    speakers: [
      {
        name: "Dr. Lisa Feldman Barrett",
        affiliation: "Northeastern University",
        title: "University Distinguished Professor of Psychology",
        bio: "Pioneer in the psychology of emotion and affective neuroscience, author of 'How Emotions Are Made.'",
        image: "/images/speakers/barrett.jpg",
        talkTitle: "The Construction of Emotion: A New Framework for Neuroscience",
      },
    ],
    organizers: ["Dr. Sarah Chen"],
    capacity: 120,
    registered: 98,
    registrationUrl: "/events/register/seminar-barrett",
    image: "/images/events/seminar-barrett.jpg",
    tags: ["Seminar", "Emotion", "Affective Neuroscience", "Theory"],
    status: "upcoming",
  },
  {
    id: "evt-004",
    title: "Brain-Computer Interface Hackathon",
    description:
      "48-hour hackathon challenging teams to develop innovative BCI applications using provided hardware and datasets.",
    longDescription:
      "Join us for an intense 48-hour hackathon where interdisciplinary teams will develop novel brain-computer interface applications. Participants will have access to EEG headsets, neural signal processing libraries, and mentorship from Eagle's Lab researchers. Prizes include research internships, publication opportunities, and hardware grants.",
    type: "workshop",
    date: "2024-08-10",
    endDate: "2024-08-11",
    time: "09:00 - 09:00 (next day)",
    location: "Innovation Hub",
    venue: "Main Hall",
    address: "456 Innovation Way, Tech District",
    speakers: [
      {
        name: "Dr. Jonathan Eagle",
        affiliation: "Eagle's Lab",
        title: "Principal Investigator",
        bio: "Leading expert in brain-computer interfaces and neural engineering.",
        image: "/images/team/dr-eagle.jpg",
      },
      {
        name: "Ms. Anika Gupta",
        affiliation: "Eagle's Lab",
        title: "Ph.D. Candidate",
        bio: "Developer of real-time neural decoding algorithms.",
        image: "/images/team/anika-gupta.jpg",
      },
    ],
    organizers: ["Dr. Jonathan Eagle", "Ms. Anika Gupta"],
    capacity: 80,
    registered: 64,
    registrationUrl: "/events/register/bci-hackathon-2024",
    image: "/images/events/bci-hackathon.jpg",
    tags: ["Hackathon", "BCI", "Competition", "Innovation", "EEG"],
    status: "upcoming",
    isFeatured: true,
  },
  {
    id: "evt-005",
    title: "Neuroethics Colloquium: AI and Brain Data Privacy",
    description:
      "Interdisciplinary discussion on ethical challenges surrounding AI analysis of neural data and brain privacy rights.",
    longDescription:
      "As AI systems become capable of decoding thoughts and emotions from brain data, critical ethical questions emerge. This colloquium brings together neuroscientists, ethicists, legal scholars, and policymakers to discuss brain privacy, cognitive liberty, and the governance of neurotechnology. The discussion will inform policy recommendations for protecting neural data rights.",
    type: "colloquium",
    date: "2024-05-28",
    time: "14:00 - 16:00",
    location: "Ethics Center",
    venue: "Discussion Hall",
    address: "789 Ethics Boulevard, Humanities District",
    speakers: [
      {
        name: "Dr. Rafael Yuste",
        affiliation: "Columbia University",
        title: "Professor of Biological Sciences",
        bio: "Founder of the NeuroRights Initiative, advocating for ethical guidelines in neurotechnology.",
        image: "/images/speakers/yuste.jpg",
      },
      {
        name: "Dr. Nita Farahany",
        affiliation: "Duke University",
        title: "Professor of Law and Philosophy",
        bio: "Leading scholar on the legal and ethical implications of emerging neurotechnologies.",
        image: "/images/speakers/farahany.jpg",
      },
    ],
    organizers: ["Dr. Jonathan Eagle", "Ethics Center"],
    capacity: 100,
    registered: 87,
    registrationUrl: "/events/register/neuroethics-2024",
    image: "/images/events/neuroethics.jpg",
    tags: ["Ethics", "AI", "Privacy", "Policy", "Neurotechnology"],
    status: "upcoming",
  },
  {
    id: "evt-006",
    title: "Summer School in Computational Neuroscience",
    description:
      "Two-week intensive program introducing graduate students to computational methods in neuroscience research.",
    longDescription:
      "The Summer School in Computational Neuroscience provides foundational training in mathematical modeling, data analysis, and programming for neuroscience research. Topics include neural network modeling, dynamical systems, Bayesian inference, and machine learning applications. Students will complete a capstone project under mentorship from Eagle's Lab faculty.",
    type: "training",
    date: "2024-07-08",
    endDate: "2024-07-19",
    time: "09:00 - 17:00",
    location: "Eagle's Lab Campus",
    venue: "Lecture Hall & Labs",
    address: "University Campus, Science District",
    speakers: [
      {
        name: "Dr. Miguel Rodriguez",
        affiliation: "Eagle's Lab",
        title: "Senior Research Scientist",
        bio: "Expert in computational neuroscience and machine learning.",
        image: "/images/team/dr-rodriguez.jpg",
      },
      {
        name: "Dr. James Kim",
        affiliation: "Eagle's Lab",
        title: "Postdoctoral Fellow",
        bio: "Specialist in systems neuroscience and network analysis.",
        image: "/images/team/dr-kim.jpg",
      },
    ],
    organizers: ["Dr. Miguel Rodriguez", "Dr. James Kim"],
    capacity: 30,
    registered: 28,
    registrationUrl: "/events/register/summer-school-2024",
    image: "/images/events/summer-school.jpg",
    tags: ["Training", "Summer School", "Computational", "Education", "Students"],
    status: "upcoming",
    isFeatured: true,
  },
  {
    id: "evt-007",
    title: "International Conference on Neural Engineering 2023",
    description:
      "Eagle's Lab hosted the 2023 International Conference on Neural Engineering, featuring 200+ presentations from 30 countries.",
    longDescription:
      "The International Conference on Neural Engineering (ICNE) 2023 was a major success with over 800 attendees from academia and industry. The conference covered neural interfaces, neuroprosthetics, neuromodulation, and clinical applications. Eagle's Lab researchers presented 15 papers and received the Best Paper Award for BCI research.",
    type: "conference",
    date: "2023-10-15",
    endDate: "2023-10-18",
    time: "08:00 - 18:00",
    location: "International Convention Center",
    venue: "Main Conference Hall",
    address: "1000 Convention Plaza, Downtown",
    speakers: [
      {
        name: "Multiple International Speakers",
        affiliation: "Various Institutions",
        title: "Keynote and Invited Speakers",
        bio: "Leading researchers in neural engineering from around the world.",
        image: "/images/speakers/multiple.jpg",
      },
    ],
    organizers: ["Dr. Jonathan Eagle", "International Neural Engineering Society"],
    capacity: 1000,
    registered: 847,
    image: "/images/events/icne-2023.jpg",
    tags: ["Conference", "Neural Engineering", "International", "BCI", "Prosthetics"],
    status: "completed",
    recordingUrl: "https://icne2023.org/recordings",
    materialsUrl: "https://icne2023.org/proceedings",
  },
  {
    id: "evt-008",
    title: "Neuroscience Outreach Day 2024",
    description:
      "Annual public engagement event bringing neuroscience to the community through interactive demonstrations and talks.",
    longDescription:
      "Neuroscience Outreach Day is our commitment to sharing the wonder of brain science with the broader community. This family-friendly event features interactive brain demonstrations, virtual reality experiences, neuron art workshops, and talks by Eagle's Lab researchers. Over 2,000 community members attended last year's event.",
    type: "symposium",
    date: "2024-03-15",
    time: "10:00 - 16:00",
    location: "Community Science Center",
    venue: "Exhibition Hall",
    address: "2000 Community Drive, Public District",
    speakers: [
      {
        name: "Eagle's Lab Team",
        affiliation: "Eagle's Lab",
        title: "Researchers and Students",
        bio: "Diverse team of neuroscientists sharing their passion for brain research.",
        image: "/images/team/group.jpg",
      },
    ],
    organizers: ["Ms. Chioma Okonkwo", "Dr. Emily Anderson"],
    capacity: 500,
    registered: 423,
    registrationUrl: "/events/register/outreach-2024",
    image: "/images/events/outreach-2024.jpg",
    tags: ["Outreach", "Public", "Education", "Community", "Family"],
    status: "completed",
    recordingUrl: "https://eagleslab.org/outreach-2024",
  },
];

export const eventTypes = [
  "All",
  "conference",
  "workshop",
  "seminar",
  "symposium",
  "colloquium",
  "training",
];

export const getUpcomingEvents = (): Event[] =>
  events.filter((e) => e.status === "upcoming").sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const getFeaturedEvents = (): Event[] =>
  events.filter((e) => e.isFeatured && e.status === "upcoming");

export const getEventsByType = (type: string): Event[] =>
  type === "All" ? events : events.filter((e) => e.type === type);

export const getEventsByStatus = (status: string): Event[] =>
  events.filter((e) => e.status === status);

export const getEventById = (id: string): Event | undefined =>
  events.find((e) => e.id === id);
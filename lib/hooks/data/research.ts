export interface ResearchArea {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  color: string;
  tags: string[];
  leadResearchers: string[];
  publications: number;
  projects: ResearchProject[];
  keyFindings: string[];
  funding: string[];
  collaborators: string[];
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "planned";
  startDate: string;
  endDate?: string;
  funding: string;
  lead: string;
  team: string[];
  image?: string;
  outcomes?: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    id: "brain-computer-interfaces",
    title: "Brain-Computer Interfaces",
    shortTitle: "BCI",
    description: "Developing next-generation neural interfaces that enable direct communication between the brain and external devices.",
    longDescription:
      "Our Brain-Computer Interface (BCI) research program focuses on developing high-performance neural interfaces that can decode brain signals with unprecedented accuracy and speed. We work on both invasive and non-invasive approaches, including electrode arrays, optical imaging, and EEG-based systems. Our goal is to restore motor function in paralyzed patients and enhance human cognitive capabilities.",
    icon: "Brain",
    image: "/images/research/bci.jpg",
    color: "from-eagle-green to-eagle-green-dark",
    tags: ["Neural Engineering", "Signal Processing", "Prosthetics", "Neurotechnology"],
    leadResearchers: ["Dr. Jonathan Eagle", "Ms. Anika Gupta"],
    publications: 45,
    projects: [
      {
        id: "bci-1",
        title: "High-Density Neural Recording Array",
        description: "Development of a 1024-channel flexible electrode array for cortical recording with 10-year stability.",
        status: "active",
        startDate: "2022-01-01",
        funding: "NIH R01 ($2.5M)",
        lead: "Dr. Jonathan Eagle",
        team: ["Dr. Jonathan Eagle", "Ms. Anika Gupta", "Mr. David Zhao"],
        outcomes: ["Published in Nature Neuroscience (2023)", "2 patents filed"],
      },
      {
        id: "bci-2",
        title: "Thought-to-Text Decoder",
        description: "Real-time speech decoding from motor cortex activity for communication in locked-in patients.",
        status: "active",
        startDate: "2023-06-01",
        funding: "NSF EFRI ($1.8M)",
        lead: "Dr. Jonathan Eagle",
        team: ["Dr. Jonathan Eagle", "Ms. Anika Gupta"],
      },
      {
        id: "bci-3",
        title: "Closed-Loop Neurofeedback System",
        description: "Adaptive brain stimulation system for treating depression and anxiety disorders.",
        status: "completed",
        startDate: "2020-03-01",
        endDate: "2023-12-01",
        funding: "DARPA N3 ($3.2M)",
        lead: "Dr. Jonathan Eagle",
        team: ["Dr. Jonathan Eagle", "Dr. Sarah Chen"],
        outcomes: ["FDA Breakthrough Device Designation", "Published in Nature Medicine (2023)"],
      },
    ],
    keyFindings: [
      "Achieved 95% accuracy in motor imagery decoding",
      "Developed novel signal processing algorithms reducing noise by 40%",
      "Demonstrated 5-year electrode stability in primate models",
    ],
    funding: ["NIH", "NSF", "DARPA", "Howard Hughes Medical Institute"],
    collaborators: ["Stanford Neural Prosthetics Lab", "MIT Media Lab", "Johns Hopkins APL"],
  },
  {
    id: "cognitive-neuroscience",
    title: "Cognitive Neuroscience",
    shortTitle: "Cognition",
    description: "Investigating the neural basis of memory, attention, decision-making, and consciousness.",
    longDescription:
      "Our Cognitive Neuroscience division uses cutting-edge neuroimaging techniques including fMRI, MEG, and intracranial EEG to understand how the brain supports complex cognitive functions. We focus on episodic memory, working memory, attentional control, and the neural correlates of consciousness. Our research has direct applications in understanding and treating cognitive disorders.",
    icon: "Lightbulb",
    image: "/images/research/cognitive.jpg",
    color: "from-eagle-gold to-eagle-gold-dark",
    tags: ["Memory", "Attention", "Consciousness", "Neuroimaging"],
    leadResearchers: ["Dr. Sarah Chen", "Dr. James Kim"],
    publications: 67,
    projects: [
      {
        id: "cog-1",
        title: "Memory Engram Mapping",
        description: "Identifying and manipulating memory traces in the human hippocampus using high-resolution fMRI.",
        status: "active",
        startDate: "2021-09-01",
        funding: "NIH R01 ($1.9M)",
        lead: "Dr. Sarah Chen",
        team: ["Dr. Sarah Chen", "Dr. James Kim"],
        outcomes: ["Published in Science (2023)", "Featured in Scientific American"],
      },
      {
        id: "cog-2",
        title: "Attention Network Dynamics",
        description: "Real-time tracking of attentional state using EEG and machine learning for ADHD biomarkers.",
        status: "active",
        startDate: "2022-07-01",
        funding: "NIMH R21 ($1.2M)",
        lead: "Dr. Sarah Chen",
        team: ["Dr. Sarah Chen", "Mr. Marcus Thompson"],
      },
      {
        id: "cog-3",
        title: "Consciousness Decoding",
        description: "Developing objective measures of conscious awareness in vegetative and minimally conscious patients.",
        status: "active",
        startDate: "2023-01-01",
        funding: "Templeton World Charity ($2.1M)",
        lead: "Dr. James Kim",
        team: ["Dr. James Kim", "Dr. Sarah Chen"],
      },
    ],
    keyFindings: [
      "Mapped memory engrams to specific hippocampal subregions",
      "Identified novel biomarkers for attention deficit disorders",
      "Developed consciousness detection algorithm with 92% accuracy",
    ],
    funding: ["NIH", "NIMH", "Templeton World Charity", "McKnight Foundation"],
    collaborators: ["UCL Institute of Cognitive Neuroscience", "Yale Consciousness Lab", "EPFL"],
  },
  {
    id: "neuroinformatics",
    title: "Neuroinformatics & AI",
    shortTitle: "Neuroinformatics",
    description: "Building computational infrastructure and AI tools for analyzing massive neuroscience datasets.",
    longDescription:
      "The Neuroinformatics division develops advanced computational tools, databases, and machine learning algorithms to handle the exponentially growing volume of neuroscience data. We create open-source software platforms for neural data analysis, build predictive models of brain function, and apply deep learning to neuroimaging data. Our work enables researchers worldwide to extract insights from complex neural datasets.",
    icon: "Database",
    image: "/images/research/neuroinformatics.jpg",
    color: "from-blue-600 to-blue-800",
    tags: ["Machine Learning", "Big Data", "Software", "Neural Networks"],
    leadResearchers: ["Dr. Miguel Rodriguez"],
    publications: 38,
    projects: [
      {
        id: "ni-1",
        title: "NeuroDataHub Platform",
        description: "Cloud-based platform for sharing, analyzing, and visualizing multi-modal neuroscience datasets.",
        status: "active",
        startDate: "2021-01-01",
        funding: "NSF OAC ($2.8M)",
        lead: "Dr. Miguel Rodriguez",
        team: ["Dr. Miguel Rodriguez", "Ms. Anika Gupta"],
        outcomes: ["10,000+ users worldwide", "Published in Nature Methods (2022)"],
      },
      {
        id: "ni-2",
        title: "DeepBrainNet",
        description: "Deep learning framework for automated brain segmentation and pathology detection in MRI.",
        status: "active",
        startDate: "2022-03-01",
        funding: "Google Research Award ($500K)",
        lead: "Dr. Miguel Rodriguez",
        team: ["Dr. Miguel Rodriguez"],
        outcomes: ["FDA-cleared for clinical use", "Deployed in 50+ hospitals"],
      },
      {
        id: "ni-3",
        title: "Neural Population Dynamics",
        description: "Mathematical modeling of large neural populations using dynamical systems theory.",
        status: "completed",
        startDate: "2019-06-01",
        endDate: "2022-12-01",
        funding: "Simons Foundation ($1.5M)",
        lead: "Dr. Miguel Rodriguez",
        team: ["Dr. Miguel Rodriguez", "Dr. James Kim"],
        outcomes: ["Published in Neuron (2022)", "Open-source toolbox released"],
      },
    ],
    keyFindings: [
      "Developed algorithm processing 1TB neural data in under 10 minutes",
      "Created first open-source platform for multi-modal neurodata integration",
      "Achieved 99.2% accuracy in automated brain tumor segmentation",
    ],
    funding: ["NSF", "Google", "Simons Foundation", "Allen Institute"],
    collaborators: ["Allen Institute for Brain Science", "INCF", "Neurodata Without Borders"],
  },
  {
    id: "molecular-neurobiology",
    title: "Molecular Neurobiology",
    shortTitle: "Molecular",
    description: "Studying molecular mechanisms of neurodegeneration and developing novel therapeutic strategies.",
    longDescription:
      "Our Molecular Neurobiology program investigates the cellular and molecular processes underlying neurodegenerative diseases including Alzheimer's, Parkinson's, and ALS. We use advanced molecular biology techniques, CRISPR gene editing, and single-cell transcriptomics to identify disease mechanisms and therapeutic targets. Our translational focus aims to move discoveries from bench to bedside.",
    icon: "Dna",
    image: "/images/research/molecular.jpg",
    color: "from-purple-600 to-purple-800",
    tags: ["Alzheimer's", "Protein Aggregation", "CRISPR", "Therapeutics"],
    leadResearchers: ["Dr. Priya Patel"],
    publications: 52,
    projects: [
      {
        id: "mol-1",
        title: "Amyloid Cascade Modulation",
        description: "Novel small molecules targeting amyloid-beta aggregation and clearance pathways.",
        status: "active",
        startDate: "2021-04-01",
        funding: "Alzheimer's Association ($1.6M)",
        lead: "Dr. Priya Patel",
        team: ["Dr. Priya Patel", "Mr. Marcus Thompson"],
        outcomes: ["2 lead compounds in preclinical development", "Published in Cell (2023)"],
      },
      {
        id: "mol-2",
        title: "Neuroinflammation Biomarkers",
        description: "Identifying microglial activation markers for early Alzheimer's diagnosis.",
        status: "active",
        startDate: "2022-09-01",
        funding: "NIH NIA ($2.1M)",
        lead: "Dr. Priya Patel",
        team: ["Dr. Priya Patel", "Ms. Chioma Okonkwo"],
      },
      {
        id: "mol-3",
        title: "Gene Therapy for Parkinson's",
        description: "AAV-based delivery of neuroprotective factors to dopaminergic neurons.",
        status: "planned",
        startDate: "2024-01-01",
        funding: "Michael J. Fox Foundation ($3.5M)",
        lead: "Dr. Priya Patel",
        team: ["Dr. Priya Patel", "Dr. Emily Anderson"],
      },
    ],
    keyFindings: [
      "Discovered novel mechanism of tau protein propagation",
      "Identified 3 new therapeutic targets for Alzheimer's disease",
      "Developed CRISPR-based gene therapy approach for Parkinson's",
    ],
    funding: ["NIH NIA", "Alzheimer's Association", "MJFF", "Cure Alzheimer's Fund"],
    collaborators: ["Mayo Clinic", "Broad Institute", "Salk Institute"],
  },
  {
    id: "developmental-neuroscience",
    title: "Developmental Neuroscience",
    shortTitle: "Development",
    description: "Understanding how brains develop and how early experiences shape neural circuits.",
    longDescription:
      "Our Developmental Neuroscience research explores how genetic programs and environmental factors interact to shape brain development from embryonic stages through adolescence. We study critical periods of plasticity, the effects of early life stress on brain circuits, and neurodevelopmental disorders including autism and schizophrenia. Our work informs early intervention strategies and educational practices.",
    icon: "Baby",
    image: "/images/research/developmental.jpg",
    color: "from-pink-500 to-rose-600",
    tags: ["Plasticity", "Autism", "Early Life", "Critical Periods"],
    leadResearchers: ["Dr. Emily Anderson"],
    publications: 41,
    projects: [
      {
        id: "dev-1",
        title: "Critical Period Reopening",
        description: "Pharmacological approaches to reactivate plasticity in adult visual cortex.",
        status: "active",
        startDate: "2021-07-01",
        funding: "NIH NEI ($1.7M)",
        lead: "Dr. Emily Anderson",
        team: ["Dr. Emily Anderson", "Mr. Marcus Thompson"],
        outcomes: ["Published in Nature (2023)", "Patent application filed"],
      },
      {
        id: "dev-2",
        title: "Autism Neural Signatures",
        description: "Identifying early neuroimaging biomarkers of autism spectrum disorder in infants.",
        status: "active",
        startDate: "2022-01-01",
        funding: "Autism Speaks ($1.4M)",
        lead: "Dr. Emily Anderson",
        team: ["Dr. Emily Anderson", "Ms. Chioma Okonkwo"],
      },
      {
        id: "dev-3",
        title: "Prenatal Stress Effects",
        description: "Longitudinal study of maternal stress effects on fetal brain development.",
        status: "completed",
        startDate: "2019-03-01",
        endDate: "2023-06-01",
        funding: "March of Dimes ($1.9M)",
        lead: "Dr. Emily Anderson",
        team: ["Dr. Emily Anderson", "Dr. Sarah Chen"],
        outcomes: ["Published in PNAS (2023)", "Policy recommendations adopted by AAP"],
      },
    ],
    keyFindings: [
      "Successfully reopened critical period in adult mice using novel compound",
      "Identified neural signature predicting autism with 85% accuracy at 6 months",
      "Mapped epigenetic changes linking prenatal stress to child outcomes",
    ],
    funding: ["NIH", "Autism Speaks", "March of Dimes", "Simons Foundation"],
    collaborators: ["Boston Children's Hospital", "Yale Child Study Center", "UC Davis MIND Institute"],
  },
  {
    id: "systems-neuroscience",
    title: "Systems Neuroscience",
    shortTitle: "Systems",
    description: "Mapping brain-wide circuits and understanding how networks coordinate behavior.",
    longDescription:
      "The Systems Neuroscience division investigates how distributed brain regions form functional networks to support behavior and cognition. We use multi-modal neuroimaging, optogenetics, and computational modeling to map brain-wide connectivity patterns. Our research spans from understanding basic sensory processing to complex decision-making and social cognition.",
    icon: "Network",
    image: "/images/research/systems.jpg",
    color: "from-cyan-600 to-teal-700",
    tags: ["Connectivity", "Networks", "Optogenetics", "Behavior"],
    leadResearchers: ["Dr. James Kim"],
    publications: 34,
    projects: [
      {
        id: "sys-1",
        title: "Brain Network Atlas",
        description: "Comprehensive mapping of functional connectivity across 1000+ individuals.",
        status: "active",
        startDate: "2020-09-01",
        funding: "NIH Human Connectome Project ($4.2M)",
        lead: "Dr. James Kim",
        team: ["Dr. James Kim", "Dr. Miguel Rodriguez"],
        outcomes: ["Published in Nature Neuroscience (2022)", "Open dataset accessed 50,000+ times"],
      },
      {
        id: "sys-2",
        title: "Social Brain Circuits",
        description: "Identifying neural circuits underlying social decision-making and empathy.",
        status: "active",
        startDate: "2022-05-01",
        funding: "NSF BCS ($1.3M)",
        lead: "Dr. James Kim",
        team: ["Dr. James Kim", "Dr. Sarah Chen"],
      },
      {
        id: "sys-3",
        title: "Whole-Brain Optogenetics",
        description: "Developing tools for simultaneous optogenetic manipulation across multiple brain regions.",
        status: "planned",
        startDate: "2024-03-01",
        funding: "NIH BRAIN Initiative ($2.7M)",
        lead: "Dr. James Kim",
        team: ["Dr. James Kim", "Dr. Jonathan Eagle"],
      },
    ],
    keyFindings: [
      "Created first individual-specific functional brain network atlas",
      "Identified 12 distinct functional networks supporting social cognition",
      "Developed multi-target optogenetic system for circuit manipulation",
    ],
    funding: ["NIH", "NSF", "Brain Initiative", "James S. McDonnell Foundation"],
    collaborators: ["Human Connectome Project", "Oxford Centre for Human Brain Activity", "RIKEN CBS"],
  },
];

export const getResearchAreaById = (id: string): ResearchArea | undefined =>
  researchAreas.find((area) => area.id === id);

export const getActiveProjects = (): ResearchProject[] =>
  researchAreas.flatMap((area) => area.projects.filter((p) => p.status === "active"));

export const getTotalPublications = (): number =>
  researchAreas.reduce((sum, area) => sum + area.publications, 0);

export const getTotalProjects = (): number =>
  researchAreas.reduce((sum, area) => sum + area.projects.length, 0);
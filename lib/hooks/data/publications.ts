export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi: string;
  abstract: string;
  keywords: string[];
  category: string;
  type: "journal" | "conference" | "book" | "preprint";
  citations: number;
  impactFactor: number;
  pdfUrl?: string;
  supplementaryUrl?: string;
  dataUrl?: string;
  codeUrl?: string;
  featured?: boolean;
  image?: string;
}

export const publications: Publication[] = [
  {
    id: "pub-001",
    title: "High-fidelity neural decoding of motor imagery using deep recurrent networks",
    authors: ["Eagle J.", "Gupta A.", "Rodriguez M.", "Chen S."],
    journal: "Nature Neuroscience",
    year: 2024,
    volume: "27",
    issue: "3",
    pages: "412-425",
    doi: "10.1038/s41593-024-01567-8",
    abstract:
      "We present a novel deep learning architecture that achieves 95% accuracy in decoding motor imagery from intracranial EEG recordings. The model uses attention mechanisms to identify task-relevant neural features across multiple time scales, enabling real-time brain-computer interface applications with unprecedented fidelity.",
    keywords: ["BCI", "Deep Learning", "Motor Imagery", "Intracranial EEG", "Attention Mechanisms"],
    category: "Brain-Computer Interfaces",
    type: "journal",
    citations: 127,
    impactFactor: 24.884,
    pdfUrl: "/publications/eagle-2024-nature-neuroscience.pdf",
    codeUrl: "https://github.com/eagleslab/bci-decoder",
    featured: true,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: "pub-002",
    title: "Memory engram reactivation during sleep enhances consolidation in humans",
    authors: ["Chen S.", "Kim J.", "Anderson E.", "Eagle J."],
    journal: "Science",
    year: 2023,
    volume: "382",
    issue: "6673",
    pages: "891-896",
    doi: "10.1126/science.adk1234",
    abstract:
      "Using simultaneous fMRI and intracranial recordings, we demonstrate that targeted reactivation of hippocampal memory engrams during slow-wave sleep significantly enhances next-day recall. Closed-loop stimulation of identified engram cells improved memory performance by 40% compared to control conditions.",
    keywords: ["Memory", "Sleep", "Hippocampus", "Engrams", "Consolidation"],
    category: "Cognitive Neuroscience",
    type: "journal",
    citations: 234,
    impactFactor: 56.9,
    pdfUrl: "/publications/chen-2023-science.pdf",
    dataUrl: "https://osf.io/chen-memory-2023",
    featured: true,
    image: "/images/publications/memory-sleep.jpg",
  },
  {
    id: "pub-003",
    title: "NeuroDataHub: A cloud platform for multi-modal neuroscience data analysis",
    authors: ["Rodriguez M.", "Eagle J.", "Gupta A.", "Kim J."],
    journal: "Nature Methods",
    year: 2023,
    volume: "20",
    issue: "8",
    pages: "1156-1162",
    doi: "10.1038/s41592-023-01945-6",
    abstract:
      "NeuroDataHub is an open-source cloud computing platform that enables researchers to analyze, share, and visualize multi-modal neuroscience datasets. The platform integrates tools for electrophysiology, neuroimaging, and behavioral data, supporting collaborative analysis workflows across institutions worldwide.",
    keywords: ["Neuroinformatics", "Cloud Computing", "Data Sharing", "Open Source", "Platform"],
    category: "Neuroinformatics",
    type: "journal",
    citations: 89,
    impactFactor: 48.0,
    pdfUrl: "/publications/rodriguez-2023-nature-methods.pdf",
    codeUrl: "https://github.com/eagleslab/neurodatahub",
    dataUrl: "https://neurodatahub.org",
    featured: true,
    image: "/images/publications/neurodatahub.jpg",
  },
  {
    id: "pub-004",
    title: "Novel tau propagation mechanism identified in Alzheimer's disease models",
    authors: ["Patel P.", "Thompson M.", "Eagle J."],
    journal: "Cell",
    year: 2023,
    volume: "186",
    issue: "22",
    pages: "4891-4908",
    doi: "10.1016/j.cell.2023.09.012",
    abstract:
      "We discovered a previously unknown mechanism of tau protein propagation through extracellular vesicles in Alzheimer's disease. Inhibition of this pathway using a novel small molecule reduced tau pathology by 70% in mouse models and prevented cognitive decline, identifying a promising therapeutic target.",
    keywords: ["Alzheimer's", "Tau", "Extracellular Vesicles", "Therapeutics", "Pathology"],
    category: "Molecular Neurobiology",
    type: "journal",
    citations: 178,
    impactFactor: 64.5,
    pdfUrl: "/publications/patel-2023-cell.pdf",
    supplementaryUrl: "/publications/patel-2023-cell-supp.pdf",
    featured: true,
    image: "/images/publications/tau-propagation.jpg",
  },
  {
    id: "pub-005",
    title: "Critical period plasticity can be reactivated in adult visual cortex through HDAC inhibition",
    authors: ["Anderson E.", "Chen S.", "Thompson M.", "Eagle J."],
    journal: "Nature",
    year: 2023,
    volume: "620",
    issue: "7974",
    pages: "345-352",
    doi: "10.1038/s41586-023-06432-1",
    abstract:
      "We demonstrate that systemic administration of a selective HDAC inhibitor reopens the critical period for ocular dominance plasticity in adult mice. This pharmacological approach restored visual acuity in amblyopic animals and enhanced learning of visual tasks, with implications for treating developmental disorders.",
    keywords: ["Critical Period", "Plasticity", "HDAC", "Visual Cortex", "Amblyopia"],
    category: "Developmental Neuroscience",
    type: "journal",
    citations: 156,
    impactFactor: 64.8,
    pdfUrl: "/publications/anderson-2023-nature.pdf",
    codeUrl: "https://github.com/eagleslab/critical-period",
    featured: true,
    image: "/images/publications/critical-period.jpg",
  },
  {
    id: "pub-006",
    title: "Individual-specific functional brain network atlas from 1000 participants",
    authors: ["Kim J.", "Rodriguez M.", "Chen S.", "Eagle J."],
    journal: "Nature Neuroscience",
    year: 2022,
    volume: "25",
    issue: "11",
    pages: "1567-1578",
    doi: "10.1038/s41593-022-01189-4",
    abstract:
      "We constructed the first individual-specific functional brain network atlas using precision functional mapping in 1000 participants. The atlas reveals stable, unique connectivity patterns that predict individual differences in cognition and behavior with high accuracy, enabling personalized neuroscience approaches.",
    keywords: ["Connectomics", "Networks", "Individual Differences", "Precision Mapping", "Atlas"],
    category: "Systems Neuroscience",
    type: "journal",
    citations: 312,
    impactFactor: 24.884,
    pdfUrl: "/publications/kim-2022-nature-neuroscience.pdf",
    dataUrl: "https://eagleslab.org/brain-atlas-2022",
    featured: true,
    image: "/images/publications/brain-atlas.jpg",
  },
  {
    id: "pub-007",
    title: "Closed-loop neurofeedback for treatment-resistant depression: A randomized controlled trial",
    authors: ["Eagle J.", "Chen S.", "Okonkwo C.", "Patel P."],
    journal: "Nature Medicine",
    year: 2023,
    volume: "29",
    issue: "6",
    pages: "1456-1464",
    doi: "10.1038/s41591-023-02345-7",
    abstract:
      "This randomized controlled trial demonstrates that real-time fMRI neurofeedback targeting the amygdala significantly reduces symptoms in treatment-resistant depression. Patients receiving neurofeedback showed 50% greater improvement than sham controls, with effects persisting at 6-month follow-up.",
    keywords: ["Depression", "Neurofeedback", "fMRI", "Amygdala", "Clinical Trial"],
    category: "Clinical Neuroscience",
    type: "journal",
    citations: 203,
    impactFactor: 82.9,
    pdfUrl: "/publications/eagle-2023-nature-medicine.pdf",
    featured: true,
    image: "/images/publications/neurofeedback-depression.jpg",
  },
  {
    id: "pub-008",
    title: "DeepBrainNet: Automated brain tumor segmentation using 3D convolutional neural networks",
    authors: ["Rodriguez M.", "Gupta A.", "Eagle J."],
    journal: "IEEE Transactions on Medical Imaging",
    year: 2023,
    volume: "42",
    issue: "4",
    pages: "1023-1035",
    doi: "10.1109/TMI.2023.3245678",
    abstract:
      "DeepBrainNet achieves state-of-the-art performance in automated brain tumor segmentation from multi-modal MRI, with 99.2% accuracy on the BraTS 2023 benchmark. The model generalizes across scanners and institutions, receiving FDA clearance for clinical deployment in 2023.",
    keywords: ["Deep Learning", "Segmentation", "Brain Tumor", "MRI", "Clinical AI"],
    category: "Neuroinformatics",
    type: "journal",
    citations: 67,
    impactFactor: 11.037,
    pdfUrl: "/publications/rodriguez-2023-ieee-tmi.pdf",
    codeUrl: "https://github.com/eagleslab/deepbrainnet",
    featured: false,
  },
  {
    id: "pub-009",
    title: "Neural population dynamics underlying decision-making in prefrontal cortex",
    authors: ["Kim J.", "Rodriguez M.", "Eagle J."],
    journal: "Neuron",
    year: 2022,
    volume: "110",
    issue: "18",
    pages: "2987-3002",
    doi: "10.1016/j.neuron.2022.07.014",
    abstract:
      "Using large-scale electrophysiological recordings and dynamical systems analysis, we reveal how neural populations in prefrontal cortex evolve during decision-making. The dynamics form a low-dimensional manifold that predicts choice outcomes and reaction times, providing insights into the neural basis of cognitive control.",
    keywords: ["Decision Making", "Prefrontal Cortex", "Population Dynamics", "Manifold", "Electrophysiology"],
    category: "Systems Neuroscience",
    type: "journal",
    citations: 145,
    impactFactor: 17.173,
    pdfUrl: "/publications/kim-2022-neuron.pdf",
    codeUrl: "https://github.com/eagleslab/decision-dynamics",
    featured: false,
  },
  {
    id: "pub-010",
    title: "Epigenetic programming of stress vulnerability by maternal care quality",
    authors: ["Anderson E.", "Chen S.", "Patel P.", "Eagle J."],
    journal: "Proceedings of the National Academy of Sciences",
    year: 2023,
    volume: "120",
    issue: "25",
    pages: "e2305678120",
    doi: "10.1073/pnas.2305678120",
    abstract:
      "Our longitudinal study of 500 mother-infant dyads reveals that maternal care quality during the first year of life programs DNA methylation patterns at glucocorticoid receptor gene promoters. These epigenetic marks predict stress reactivity and mental health outcomes through adolescence, identifying a biological mechanism linking early environment to later vulnerability.",
    keywords: ["Epigenetics", "Early Life Stress", "DNA Methylation", "Development", "Mental Health"],
    category: "Developmental Neuroscience",
    type: "journal",
    citations: 98,
    impactFactor: 11.1,
    pdfUrl: "/publications/anderson-2023-pnas.pdf",
    dataUrl: "https://osf.io/anderson-epigenetics-2023",
    featured: false,
  },
  {
    id: "pub-011",
    title: "Real-time speech synthesis from motor cortex in a paralyzed patient",
    authors: ["Eagle J.", "Gupta A.", "Kim J.", "Chen S."],
    journal: "New England Journal of Medicine",
    year: 2024,
    volume: "390",
    issue: "8",
    pages: "712-724",
    doi: "10.1056/NEJMoa2312345",
    abstract:
      "We report the first successful demonstration of real-time speech synthesis directly from motor cortex neural activity in a paralyzed patient with anarthria. The system decoded intended speech at 60 words per minute with 95% accuracy, restoring natural communication after 8 years of silence.",
    keywords: ["Speech Synthesis", "Motor Cortex", "Paralysis", "BCI", "Clinical"],
    category: "Brain-Computer Interfaces",
    type: "journal",
    citations: 89,
    impactFactor: 91.245,
    pdfUrl: "/publications/eagle-2024-nejm.pdf",
    featured: true,
    image: "/images/publications/speech-synthesis.jpg",
  },
  {
    id: "pub-012",
    title: "Consciousness detection algorithm for vegetative state patients using high-density EEG",
    authors: ["Kim J.", "Chen S.", "Eagle J."],
    journal: "The Lancet Neurology",
    year: 2023,
    volume: "22",
    issue: "10",
    pages: "923-935",
    doi: "10.1016/S1474-4422(23)00289-1",
    abstract:
      "We developed and validated a machine learning algorithm that detects covert consciousness in vegetative and minimally conscious patients with 92% accuracy using high-density EEG. The tool enables objective assessment of consciousness levels, improving diagnostic accuracy and informing treatment decisions.",
    keywords: ["Consciousness", "Vegetative State", "EEG", "Machine Learning", "Diagnosis"],
    category: "Cognitive Neuroscience",
    type: "journal",
    citations: 134,
    impactFactor: 59.935,
    pdfUrl: "/publications/kim-2023-lancet-neurology.pdf",
    codeUrl: "https://github.com/eagleslab/consciousness-detector",
    featured: true,
    image: "/images/publications/consciousness-detection.jpg",
  },
];

export const publicationCategories = [
  "All",
  "Brain-Computer Interfaces",
  "Cognitive Neuroscience",
  "Neuroinformatics",
  "Molecular Neurobiology",
  "Developmental Neuroscience",
  "Systems Neuroscience",
  "Clinical Neuroscience",
];

export const publicationTypes = ["All", "journal", "conference", "book", "preprint"] as const;

export const getFeaturedPublications = (): Publication[] =>
  publications.filter((p) => p.featured);

export const getPublicationsByCategory = (category: string): Publication[] =>
  category === "All" ? publications : publications.filter((p) => p.category === category);

export const getPublicationsByYear = (year: number): Publication[] =>
  publications.filter((p) => p.year === year);

export const getRecentPublications = (count: number = 5): Publication[] =>
  [...publications].sort((a, b) => b.year - a.year).slice(0, count);

export const getTopCitedPublications = (count: number = 5): Publication[] =>
  [...publications].sort((a, b) => b.citations - a.citations).slice(0, count);

export const getPublicationYears = (): number[] =>
  Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);

export const getTotalCitations = (): number =>
  publications.reduce((sum, p) => sum + p.citations, 0);

export const getAverageImpactFactor = (): number =>
  publications.reduce((sum, p) => sum + p.impactFactor, 0) / publications.length;
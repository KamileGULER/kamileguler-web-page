import type { LucideIcon } from "lucide-react";
import {
  Atom,
  BookOpenText,
  BriefcaseBusiness,
  Globe,
  GraduationCap,
  Mail,
  NotebookPen,
  Sparkles,
} from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type World = {
  id: string;
  section: string;
  title: string;
  statement: string;
  tokens: string[];
};

export type ExperienceItem = {
  marker: string;
  date: string;
  role: string;
  organization: string;
  points: string[];
  icon: LucideIcon;
};

export type Highlight = {
  label: string;
  value: string;
};

export type WritingLink = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "demo";
};

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
};

export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  technologies: string[];
  highlights: string[];
  image?: string;
  imageAlt?: string;
  media?: ProjectMedia[];
  links: ProjectLink[];
  status?: string;
  note?: string;
};

export const navItems: NavItem[] = [
  { id: "index", label: "INDEX" },
  { id: "work", label: "WORK" },
  { id: "projects", label: "PROJECTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "research", label: "RESEARCH" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

export const hero = {
  name: ["KAMILE", "GULER"],
  role: "COMPUTER ENGINEER",
  meta: "SOFTWARE / AI / QUANTUM",
  statement:
    "Computer engineering student focused on software, AI, and quantum computing through research, product work, and hands-on technical projects.",
  primaryCta: {
    label: "EXPLORE MY WORK",
    href: "#projects",
  },
  secondaryCta: {
    label: "GITHUB",
    href: "https://github.com",
  },
  status: "SCROLL TO EXPLORE",
  portrait: "./img/ben.jpg",
};

export const codeIdentity = [
  "const greeting = {",
  '  hello: "Selam, ben Kamile",',
  '  role: "Software · AI · Quantum",',
  '  status: "welcome()"',
  "};",
];

export const worlds: World[] = [
  {
    id: "software",
    section: "01 / SOFTWARE",
    title: "Building interfaces, tools, and digital products with modern web technologies.",
    statement:
      "From responsive websites to full-stack task flows, the software work in this portfolio centers on clear interfaces, practical functionality, and shipping usable experiences.",
    tokens: ["React", "Vite", "FastAPI", "JavaScript", "Git/GitHub", "Web UI"],
  },
  {
    id: "ai",
    section: "02 / ARTIFICIAL INTELLIGENCE",
    title: "Exploring retrieval and language understanding through applied AI projects.",
    statement:
      "The AI work here is grounded in RAG, NLP concepts, and data-oriented problem solving aimed at turning information into useful responses and interfaces.",
    tokens: ["Python", "RAG", "NLP", "Data Analysis", "Transformers", "Research"],
  },
  {
    id: "quantum",
    section: "03 / QUANTUM COMPUTING",
    title: "Developing a research-led path in quantum programming and QNLP.",
    statement:
      "Quantum computing is the deepest long-term direction in the portfolio, supported by QNLP research, technical reading, and interdisciplinary study.",
    tokens: ["QNLP", "Qiskit", "DisCoCat", "Category Theory", "Tensor Networks", "Quantum"],
  },
];

export const projects: Project[] = [
  {
    id: "qr-memory-site",
    number: "PROJECT_01",
    name: "QR ile Ani Birakma Sitesi",
    category: "Website / First Version",
    summary:
      "A responsive website where event guests can quickly share photos and memories through a QR code.",
    description:
      "This project was built with HTML5, CSS3, and JavaScript so participants can access a shared page by QR code and leave memories and photos from their phones.",
    technologies: ["HTML", "CSS", "JavaScript", "QR Code"],
    highlights: [
      "Responsive mobile-friendly layout",
      "Modern and clean interface",
      "CSS Grid and Flexbox usage",
      "Smooth scrolling and animations",
      "SEO-oriented structure",
      "Fast loading experience",
    ],
    image: "./img/wedding3.png",
    imageAlt: "QR ile Ani Birakma Sitesi interface",
    media: [
      { type: "image", src: "./img/wedding5.png", alt: "Photo and message upload screen" },
      { type: "image", src: "./img/wedding4.png", alt: "Shared gallery experience" },
      { type: "image", src: "./img/QRkart.jpg", alt: "QR card design" },
    ],
    links: [],
    note: "Its live, expanded continuation appears as Anforya.",
  },
  {
    id: "anforya",
    number: "PROJECT_02",
    name: "Anforya",
    category: "Live Product",
    summary:
      "The live evolution of the QR memory-sharing idea, expanded with customizable invitation pages for real users.",
    description:
      "Anforya lets event owners create personalized invitation pages while guests join through QR code to share memories, photos, and messages in one place.",
    technologies: ["JavaScript", "Vite", "Google Script", "QR Code"],
    highlights: [
      "Customizable invitation and memory pages",
      "Countdown, date, and time presentation",
      "One-click location and directions",
      "RSVP and attendance tracking",
      "QR-based photo and memory sharing",
      "Private message and wish book",
      "Responsive mobile-friendly layout",
      "Actively used by real users",
    ],
    image: "./img/Anforya/AnforyaMain.png",
    imageAlt: "Anforya homepage",
    media: [
      { type: "image", src: "./img/Anforya/AnforyaMain.png", alt: "Anforya homepage" },
      { type: "image", src: "./img/Anforya/2.png", alt: "Countdown and schedule details" },
      { type: "image", src: "./img/Anforya/3.png", alt: "Location and directions block" },
      { type: "image", src: "./img/Anforya/4.png", alt: "Invitation response flow" },
      { type: "image", src: "./img/Anforya/5.png", alt: "Photo gallery" },
      { type: "image", src: "./img/Anforya/6.png", alt: "Message book" },
    ],
    links: [
      { label: "Visit Anforya", href: "https://anforya.com/", kind: "demo" },
      { label: "Sample Wedding Page", href: "https://anforya.com/w/a-b", kind: "demo" },
    ],
    status: "LIVE",
  },
  {
    id: "rag-chatbot",
    number: "PROJECT_03",
    name: "RAG Chatbot",
    category: "AI / NLP",
    summary:
      "An intelligent chatbot built with retrieval-augmented generation to answer questions from a specific data source.",
    description:
      "The project combines Python, Pandas, and NLP tooling so the chatbot can retrieve relevant information and return more accurate responses for user questions.",
    technologies: ["Python", "RAG", "NLP", "Pandas"],
    highlights: [
      "RAG integration",
      "Natural language processing",
      "Data analysis and processing",
      "Web-based interface",
      "Admin panel",
      "Multilingual support",
    ],
    image: "./img/RagChatbot.png",
    imageAlt: "RAG Chatbot interface",
    media: [
      { type: "image", src: "./img/RagChatbot.png", alt: "RAG chatbot interface" },
      { type: "image", src: "./img/chatAdmin.png", alt: "Chatbot admin panel" },
      { type: "video", src: "./img/RagVideo.mp4", alt: "RAG chatbot video walkthrough" },
    ],
    links: [],
  },
  {
    id: "todo-list",
    number: "PROJECT_04",
    name: "Todo List Uygulamasi",
    category: "Web Application",
    summary:
      "A modern task management application built with React and FastAPI, including light and dark theme support.",
    description:
      "The frontend uses React and Vite while the backend uses Python FastAPI, allowing users to create, edit, and track tasks through a responsive interface.",
    technologies: ["React", "FastAPI", "Vite", "Python"],
    highlights: [
      "Modern React application",
      "FastAPI backend",
      "Responsive design",
      "Light and dark theme support",
      "Real-time updates",
      "CRUD operations",
    ],
    image: "./img/TodoListLight.png",
    imageAlt: "Todo List light theme",
    media: [
      { type: "image", src: "./img/TodoListLight.png", alt: "Todo List light theme" },
      { type: "image", src: "./img/TodoListDark.png", alt: "Todo List dark theme" },
      { type: "video", src: "./img/TodoVideo.mp4", alt: "Todo List video walkthrough" },
    ],
    links: [],
  },
  {
    id: "data-communication",
    number: "PROJECT_05",
    name: "Veri Iletisimi Simulasyonu",
    category: "Network Programming",
    summary:
      "A Python socket simulation for sender-server-receiver communication with parity-based error detection.",
    description:
      "The project calculates double parity bits, injects different communication errors on the server side, and checks whether the receiver can detect them through parity validation across both CLI and Flask interfaces.",
    technologies: ["Python", "Socket", "Flask", "Error Detection"],
    highlights: [
      "Parity-based error detection with double parity bit calculation",
      "Multiple error injection methods including character change, deletion, insertion, swap, bit flip, multi-bit flip, and burst error",
      "A modern dark Flask interface visualizing the sender-server-receiver flow",
      "Original terminal-based CLI workflow support",
      "Shared simulation core between CLI and web interface",
    ],
    links: [
      { label: "GitHub Repository", href: "https://github.com/KamileGULER/datacomProject", kind: "github" },
    ],
    note: "Sender -> Server -> Receiver",
  },
];

export const highlights: Highlight[] = [
  { label: "Location", value: "Karabuk, Turkiye" },
  { label: "Education", value: "Karabuk University / Computer Engineering" },
  { label: "Focus", value: "Quantum Programming, AI, Software Development" },
  { label: "Languages", value: "Turkish, English" },
];

export const experience: ExperienceItem[] = [
  {
    marker: "2026",
    date: "2026 - Present",
    role: "Quantum Intern - QNLP Focus",
    organization: "Chinar Quantum AI (CQAI Turkiye)",
    points: [
      "Conducts literature review and technical research across quantum systems, language theory, DisCoCat, category theory, tensor networks, knowledge graphs, and transformer architectures.",
      "Analyzes company codebases for architecture, data flow, and operating logic to prepare technical findings.",
      "Supports task tracking, coordination, operational work, and presentation materials.",
    ],
    icon: Atom,
  },
  {
    marker: "2025",
    date: "2025 - 2026",
    role: "President",
    organization: "Karabuk University Digital Transformation and Innovation Club",
    points: [
      "Led planning for technology and innovation focused events.",
      "Coordinated team activities and supported stronger student participation.",
    ],
    icon: Sparkles,
  },
  {
    marker: "2024",
    date: "2024 - 2026",
    role: "Software Development Intern & Volunteer",
    organization: "Karabuk University IT Department",
    points: [
      "Contributed to web-based automation and software projects through requirements analysis, interface work, and testing.",
      "Built practical experience in teamwork, problem solving, and software development processes.",
    ],
    icon: BriefcaseBusiness,
  },
  {
    marker: "2024",
    date: "Oct 2024 - Feb 2025",
    role: "Software Developer",
    organization: "Nebula Innovators",
    points: [
      "Contributed to frontend and backend modules in a team-based software project.",
      "Worked on task distribution, module integration, and debugging with Python and web technologies.",
    ],
    icon: Globe,
  },
  {
    marker: "2022",
    date: "2022 - 2027",
    role: "BSc in Computer Engineering",
    organization: "Karabuk University",
    points: [
      "Pursuing academic and project-based work in programming, algorithms, web technologies, data analysis, and software development.",
    ],
    icon: GraduationCap,
  },
];

export const writingLinks: WritingLink[] = [
  {
    title: "Medium",
    description:
      "Medium is the current home for writing, research notes, and technical reflections connected to software, AI, and quantum interests.",
    href: "https://medium.com/@kamile.guler32",
    icon: NotebookPen,
  },
  {
    title: "Research Focus",
    description:
      "QNLP, AI, and software engineering are the main threads linking the research direction, project work, and day-to-day technical growth in this portfolio.",
    href: "#work",
    icon: BookOpenText,
  },
];

export const socials: SocialLink[] = [
  { label: "Email", href: "mailto:kamile.guler32@gmail.com", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Globe },
  { label: "GitHub", href: "https://github.com", icon: BriefcaseBusiness },
  { label: "Medium", href: "https://medium.com/@kamile.guler32", icon: NotebookPen },
];

export const about = {
  eyebrow: "ABOUT",
  title: "Computer engineering student working across software, AI, and quantum computing.",
  paragraphs: [
    "Kamile Guler studies computer engineering at Karabuk University and is especially focused on quantum programming alongside AI and software development.",
    "Project work and research span Python, Java, C, modern web technologies, problem solving, and applied implementation across academic and practical contexts.",
    "Current work also includes QNLP-oriented research, technical documentation, reporting, teamwork, and communication.",
  ],
  portrait: "./img/ben2.jpg",
};

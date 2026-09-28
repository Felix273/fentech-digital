export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  industry: string;
  about: string;
  rating?: string;
  reviewCount?: string;
  liveUrl?: string;
  stats: { val: string; label: string }[];
  challenge: string;
  challengeDetails: string[];
  solutionTitle: string;
  solutionDetails: { title: string; desc: string }[];
  results: string[];
  techStack: string[];
  image: string;
  featured?: boolean;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "jem-sa-mediatech",
    category: "Digital Agency & Media",
    title: "JemSA Media Tech Business Portal & Client CMS",
    industry: "Media & Technology",
    liveUrl: "https://jemsamediatech-x57h.vercel.app",
    about: "A full-scale custom digital agency web application and control center built for JemSA Media Tech to showcase services, manage client inquiries, and handle content dynamically.",
    rating: "5/5",
    reviewCount: "Client Verified",
    stats: [
      { val: "100%", label: "Dynamic CMS Content" },
      { val: "Sub-second", label: "Page Load Speed" },
      { val: "Real-time", label: "Lead Notification System" },
      { val: "Mobile-First", label: "Responsive Architecture" },
    ],
    challenge: "JemSA Media Tech needed a high-performance web presence with a specialized back-office dashboard to manage client contacts, showcase media projects, and update agency metrics instantly.",
    challengeDetails: [
      "Standard template builders lacked performance, bespoke branding, and local control.",
      "Inquiries and client proposals were losing velocity due to disconnected email threads.",
      "The agency needed an intuitive admin portal that team members could manage without code.",
    ],
    solutionTitle: "Custom Agency Hub with Integrated Admin Control",
    solutionDetails: [
      {
        title: "High-Impact Visual Storefront",
        desc: "Designed modern dark-mode aesthetics with smooth interactions and responsive hero sections.",
      },
      {
        title: "Real-Time Admin Management",
        desc: "Engineered a dedicated admin portal for updating service offerings, team portfolios, and lead stages.",
      },
      {
        title: "Secure API & Contact Pipeline",
        desc: "Integrated serverless API routes with validation for instant lead delivery and database logging.",
      },
    ],
    results: [
      "3x Increase in Client Consultation Conversions",
      "Instant administrative updates without developer deployment",
      "Zero downtime serverless architecture on Vercel & Supabase",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    image: "https://image.thum.io/get/width/1200/crop/800/noanimate/https://jemsamediatech-x57h.vercel.app",
    featured: true,
  },
  {
    id: "dooh-advertising-network",
    category: "Digital Out-Of-Home Network",
    title: "DOOH Digital Advertising & Signage Platform",
    industry: "AdTech / Digital Media",
    liveUrl: "https://dooh-bice.vercel.app/",
    about: "A cloud-based Digital Out-Of-Home (DOOH) advertising network and digital signage management system built for real-time campaign scheduling, dynamic screen inventory control, and audience metrics.",
    rating: "5/5",
    reviewCount: "Live Production Platform",
    stats: [
      { val: "99.9%", label: "Display Uptime Guarantee" },
      { val: "Real-Time", label: "Programmatic Ad Delivery" },
      { val: "Sub-Second", label: "Screen Sync Latency" },
      { val: "Automated", label: "Campaign Playback Reporting" },
    ],
    challenge: "Traditional billboard and digital signage networks struggle with slow manual content updates, fragmented screen hardware, and non-transparent ad proof-of-play reporting.",
    challengeDetails: [
      "Updating screen advertisements manually required high operational overhead and field site visits.",
      "Advertisers lacked instant verification and impression analytics for their campaigns.",
      "Hardware player disconnects were difficult to detect and remediate automatically.",
    ],
    solutionTitle: "Centralized DOOH Network Command & Broadcast Engine",
    solutionDetails: [
      {
        title: "Dynamic Screen Management",
        desc: "Centralized control panel to organize, group, and schedule media assets across digital displays remotely.",
      },
      {
        title: "Real-Time Playback Verification",
        desc: "Automated telemetry tracking every ad impression and screen status in real time.",
      },
      {
        title: "Responsive Web Media Player",
        desc: "Lightweight HTML5 playback engine optimized for high performance across diverse hardware configurations.",
      },
    ],
    results: [
      "Instant remote campaign deployment across all connected displays",
      "100% automated proof-of-play reporting for advertisers",
      "Eliminated manual site maintenance visits for ad scheduling updates",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "WebSockets"],
    image: "https://image.thum.io/get/width/1200/crop/800/noanimate/https://dooh-bice.vercel.app/",
    featured: true,
  },
  {
    id: "bold-unity-platform",
    category: "Enterprise Web Portal",
    title: "Bold Unity Enterprise Digital Platform",
    industry: "Enterprise Software / Technology",
    liveUrl: "https://bold-unity-lu-ts.vercel.app/",
    about: "A modern, high-performance web platform built for Bold Unity to unify organizational workflows, showcase digital services, and engage community stakeholders through interactive digital portals.",
    rating: "5/5",
    reviewCount: "Live Production Platform",
    stats: [
      { val: "100%", label: "Mobile-Optimized Experience" },
      { val: "Sub-Second", label: "Page Transition Velocity" },
      { val: "Cloud-Native", label: "Serverless Deployment" },
      { val: "Scalable", label: "Modular Architecture" },
    ],
    challenge: "Bold Unity required a cohesive digital destination that reflected their brand vision while delivering fast content delivery, intuitive navigation, and reliable infrastructure.",
    challengeDetails: [
      "Legacy site structure was fragmented across multiple independent channels.",
      "Mobile users experienced layout inconsistencies and slow load speeds.",
      "Content updates required developer involvement instead of structured dynamic publishing.",
    ],
    solutionTitle: "Unified Enterprise Portal & Component System",
    solutionDetails: [
      {
        title: "Modern Component Architecture",
        desc: "Engineered reusable, accessible UI elements designed for fast rendering and brand consistency.",
      },
      {
        title: "Performance & SEO Optimization",
        desc: "Built with Next.js App Router and server-side optimization for instant page loads and search visibility.",
      },
      {
        title: "Dynamic Content Integration",
        desc: "Connected structured CMS fields enabling content managers to publish updates seamlessly.",
      },
    ],
    results: [
      "Significantly improved user engagement and time-on-site",
      "Seamless cross-device responsiveness on mobile and desktop",
      "Zero-maintenance serverless hosting on Vercel",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    image: "https://image.thum.io/get/width/1200/crop/800/noanimate/https://bold-unity-lu-ts.vercel.app/",
    featured: true,
  },
  {
    id: "student-performance-system",
    category: "EdTech & Academic Portal",
    title: "Student Performance Analytics & Academic Management System",
    industry: "Education & Analytics",
    liveUrl: "https://studentperformancesystem-three.vercel.app/",
    about: "A comprehensive digital educational portal designed for schools and universities to manage academic tracking, student performance analytics, grade distributions, and automated report generation.",
    rating: "5/5",
    reviewCount: "Live Production Platform",
    stats: [
      { val: "Real-Time", label: "Academic Progress Tracking" },
      { val: "Automated", label: "Report Card & Transcript Export" },
      { val: "Role-Based", label: "Student, Staff & Admin Security" },
      { val: "Sub-Second", label: "Analytics Dashboard Response" },
    ],
    challenge: "Educational institutions struggle with manual grade tracking on paper spreadsheets, delayed student performance feedback, and fragmented administrative record-keeping.",
    challengeDetails: [
      "Manual spreadsheet gradebook entry led to human errors in GPA and ranking calculations.",
      "Parents and students lacked transparent access to real-time academic progress reports.",
      "Teachers spent dozens of administrative hours generating end-of-term student reports.",
    ],
    solutionTitle: "Centralized Academic Analytics & Student Performance Hub",
    solutionDetails: [
      {
        title: "Interactive Student Analytics Dashboard",
        desc: "Visual charts detailing subject breakdown, attendance metrics, and historical performance trends.",
      },
      {
        title: "Automated Grading & Report Generation",
        desc: "Instant GPA and grade curve calculations with one-click downloadable PDF report cards.",
      },
      {
        title: "Secure Multi-Role Access Control",
        desc: "Strict permission layers for administrators, educators, students, and guardians.",
      },
    ],
    results: [
      "Saved 80% of teacher administrative time during end-of-term reporting cycles",
      "Real-time academic performance visibility for students and faculty",
      "Eliminated manual grading errors and spreadsheet data loss",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    image: "https://image.thum.io/get/width/1200/crop/800/noanimate/https://studentperformancesystem-three.vercel.app/",
    featured: true,
  },
  {
    id: "sacco-member-portal",
    category: "Fintech Systems",
    title: "Secure SACCO Member Self-Service & Microfinance Portal",
    industry: "Financial Services",
    about: "A trust-first digital financial portal designed for Kenyan SACCOs and investment chamas to deliver real-time balance queries, loan applications, and automated statements.",
    rating: "5/5",
    reviewCount: "Enterprise Deployment",
    stats: [
      { val: "Bank-Grade", label: "AES-256 Encryption & RBAC" },
      { val: "100%", label: "Audit Log Compliance" },
      { val: "Instant", label: "Digital Loan Statement Generation" },
      { val: "Zero-Trust", label: "Multi-Factor Authentication" },
    ],
    challenge: "Financial cooperatives face high administrative overhead from members visiting branches for routine balance checks, loan status updates, and paper statements.",
    challengeDetails: [
      "Branch front-desks were overwhelmed with routine paper queries during end-of-month cycles.",
      "Data privacy requirements required strict role-based authorization for board and loan officers.",
      "Legacy core banking databases lacked modern web or mobile access APIs.",
    ],
    solutionTitle: "Encrypted Portal with Role-Based Governance",
    solutionDetails: [
      {
        title: "Member Self-Service Portal",
        desc: "Mobile-friendly dashboard for savings summary, dividend tracking, and automated statement generation.",
      },
      {
        title: "Admin Governance Workflows",
        desc: "Multi-step loan approval pipeline with audit trails, document checks, and guarantor tracking.",
      },
      {
        title: "Secure API Middleware",
        desc: "Protected microservice bridging existing core database with modern Next.js client.",
      },
    ],
    results: [
      "70% reduction in physical branch inquiries for routine statements",
      "Accelerated loan processing turnaround from days to hours",
      "Full compliance with local data protection regulations",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "Tailwind CSS"],
    image: "/editorial/it-cloud-security-ops.webp",
    featured: true,
  },
  {
    id: "clinic-booking-system",
    category: "Healthcare Technology",
    title: "Smart Clinic Patient Management & Appointment Queue",
    industry: "Healthcare",
    about: "A streamlined healthcare workflow application for private medical clinics and diagnostic centers to manage online appointments, SMS alerts, and doctor schedules.",
    rating: "5/5",
    reviewCount: "Production Platform",
    stats: [
      { val: "24/7", label: "Self-Service Patient Booking" },
      { val: "45%", label: "Reduction in No-Show Rates" },
      { val: "SMS-Ready", label: "Automated Patient Reminders" },
      { val: "HIPAA/Data", label: "Privacy Guarded Architecture" },
    ],
    challenge: "Private medical practices experience high patient waiting times and no-shows due to phone-based appointment booking and manual desk logs.",
    challengeDetails: [
      "Patients suffered long waiting room delays without queue visibility.",
      "Doctors lacked organized daily patient histories prior to consultations.",
      "No automated reminder system was in place to confirm appointments.",
    ],
    solutionTitle: "Connected Digital Front Desk & Queue Management",
    solutionDetails: [
      {
        title: "Online Patient Scheduling",
        desc: "Select doctor, branch, and time slot with instant SMS booking confirmation.",
      },
      {
        title: "Front Desk Operations Center",
        desc: "Real-time queue tracking for receptionist, triage, and doctor consultation rooms.",
      },
      {
        title: "Automated Communication",
        desc: "Scheduled SMS reminders 24 hours and 2 hours before appointments.",
      },
    ],
    results: [
      "Drastic reduction in waiting room congestion",
      "Improved patient satisfaction ratings and clinic throughput",
      "Seamless daily doctor roster and consultation scheduling",
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "Twilio / Africa's Talking SMS", "Tailwind CSS"],
    image: "/editorial/it-product-workshop.webp",
    featured: true,
  },
  {
    id: "field-service-dashboard",
    category: "Operations & Logistics",
    title: "Real-Time Field Operations & Service Dispatch Hub",
    industry: "Logistics & Fleet",
    about: "A field operations command center for logistics, internet providers, and field installation teams managing technician routes, job tickets, and proof of work.",
    rating: "5/5",
    reviewCount: "Production Platform",
    stats: [
      { val: "Live Track", label: "GPS Route & Technician Status" },
      { val: "Offline First", label: "PWA Mobile Technician App" },
      { val: "Instant", label: "Digital Proof-of-Completion" },
      { val: "30%", label: "Fuel & Route Cost Saving" },
    ],
    challenge: "Field technicians were managed through phone calls and messaging groups, causing delays in job assignment, lack of proof of work, and double dispatching.",
    challengeDetails: [
      "Dispatch managers had no clear view of where technicians were located in Nairobi traffic.",
      "Clients complained about unexpected technician arrival times.",
      "Job completion photos and customer signatures were frequently lost.",
    ],
    solutionTitle: "Central Dispatch Command & Mobile Field App",
    solutionDetails: [
      {
        title: "Interactive Dispatch Map",
        desc: "Visual route planning and job assignment based on proximity and skill level.",
      },
      {
        title: "Mobile Field Companion",
        desc: "PWA enabling technicians to check in, view customer directions, and upload photos.",
      },
      {
        title: "Customer Tracking Portal",
        desc: "Automated SMS link sent to customer showing technician status and estimated arrival.",
      },
    ],
    results: [
      "Eliminated technician route overlap and reduced transit fuel costs by 30%",
      "100% digital job completion logs with signed customer receipts",
      "Increased daily completed field tickets per team member",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Google Maps API", "WebSockets"],
    image: "/editorial/it-cloud-security-ops.webp",
    featured: true,
  },
];

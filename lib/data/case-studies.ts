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
    id: "sme-commerce-platform",
    category: "Commerce Engine",
    title: "Integrated Mobile Commerce & Order Management Platform",
    industry: "Retail & Wholesaling",
    about: "An end-to-end e-commerce and order management portal tailored for high-volume Kenyan distributors and SME retailers needing structured catalog management and M-Pesa integration.",
    rating: "5/5",
    reviewCount: "Production Case Study",
    stats: [
      { val: "M-Pesa Express", label: "Instant STK Push Checkout" },
      { val: "3x Faster", label: "Order Dispatch Cycle" },
      { val: "SEO Optimized", label: "Top Local Ranking" },
      { val: "Automated", label: "SMS Delivery Tracking" },
    ],
    challenge: "Growing Kenyan merchants struggle with fragmented sales across WhatsApp, Instagram, and manual spreadsheets, leading to double-booking and payment delays.",
    challengeDetails: [
      "Lack of centralized inventory tracking resulted in stockouts during flash sales.",
      "Manual payment verification against SMS messages was slow and prone to human error.",
      "Generic global e-commerce platforms did not account for local payment methods or pickup points.",
    ],
    solutionTitle: "Local-First Commerce & Inventory System",
    solutionDetails: [
      {
        title: "M-Pesa STK Push Integration",
        desc: "Native checkout directly triggering mobile money prompts on the customer's phone.",
      },
      {
        title: "Live Operations Dashboard",
        desc: "Unified order status board for pack, dispatch, and delivery confirmation with driver notes.",
      },
      {
        title: "Multi-Storefront Support",
        desc: "Single backend inventory feeding physical counter sales and online orders.",
      },
    ],
    results: [
      "99.4% Automated payment reconciliation rate",
      "Reduced customer order lookup time from 15 mins to seconds",
      "Significant increase in repeat mobile customer purchases",
    ],
    techStack: ["Next.js", "Supabase", "PostgreSQL", "M-Pesa Daraja API", "Tailwind CSS"],
    image: "/editorial/it-software-team.webp",
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

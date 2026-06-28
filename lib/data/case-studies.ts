export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  industry: string;
  about: string;
  rating: string;
  reviewCount: string;
  stats: { val: string; label: string }[];
  challenge: string;
  challengeDetails: string[];
  solutionTitle: string;
  solutionDetails: { title: string; desc: string }[];
  results: string[];
  techStack: string[];
  image: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "sme-commerce-platform",
    category: "Commerce Platform",
    title: "A digital storefront and order engine for Kenyan SMEs",
    industry: "Retail & Distribution",
    about: "A portfolio showcase for growing Kenyan retailers that need to move beyond WhatsApp-only selling into structured catalogues, payments, order management, and customer follow-up.",
    rating: "5/5",
    reviewCount: "Portfolio showcase",
    stats: [
      { val: "M-Pesa", label: "Payment-aware checkout flow" },
      { val: "3x", label: "Faster order processing target" },
      { val: "SEO", label: "Built for local discovery" },
      { val: "Mobile", label: "Designed for Kenyan buyers" },
    ],
    challenge: "Many Kenyan SMEs sell online, but operations are fragmented across phone calls, Instagram DMs, WhatsApp, spreadsheets, and manual delivery coordination.",
    challengeDetails: [
      "No single source of truth for products, customers, payments, and orders.",
      "Manual follow-ups slowed fulfilment and made repeat sales harder.",
      "Generic templates did not reflect local payment and delivery realities.",
    ],
    solutionTitle: "A commerce system built for how Kenya buys",
    solutionDetails: [
      {
        title: "Mobile-first storefront",
        desc: "A fast catalogue experience with clear product pages, search-friendly content, and conversion-focused calls to action.",
      },
      {
        title: "Operations dashboard",
        desc: "A lightweight admin workflow for orders, customer records, fulfilment status, and payment reconciliation.",
      },
      {
        title: "Local payment readiness",
        desc: "Checkout and order flows designed around M-Pesa behaviour, delivery notes, and customer confirmation.",
      },
    ],
    results: [
      "Cleaner order workflow",
      "Better customer follow-up",
      "Improved local search presence",
      "Ready for online campaigns",
    ],
    techStack: ["Next.js", "Supabase", "PostgreSQL", "M-Pesa-ready flows", "Analytics"],
    image: "/editorial/it-product-workshop.webp",
  },
  {
    id: "sacco-member-portal",
    category: "Fintech Systems",
    title: "A secure member portal concept for SACCOs and savings groups",
    industry: "Financial Services",
    about: "A secure portal architecture for Kenyan SACCOs, chamas, and member-based finance organizations that need clearer member service, reporting, and digital access.",
    rating: "5/5",
    reviewCount: "Portfolio showcase",
    stats: [
      { val: "RBAC", label: "Role-based access model" },
      { val: "Audit", label: "Activity trail by design" },
      { val: "Reports", label: "Member and loan visibility" },
      { val: "Secure", label: "Privacy-first architecture" },
    ],
    challenge: "Member service teams often rely on manual records, repeated phone enquiries, and disconnected systems that make reporting and trust harder to maintain.",
    challengeDetails: [
      "Members need faster access to balances, statements, and requests.",
      "Administrators need better visibility without exposing sensitive data.",
      "Leadership needs reliable reports for decisions and compliance preparation.",
    ],
    solutionTitle: "A trust-first digital finance workflow",
    solutionDetails: [
      {
        title: "Member self-service",
        desc: "Secure login, profile views, statement requests, support tickets, and notification-ready account updates.",
      },
      {
        title: "Admin operations",
        desc: "Staff tools for requests, approvals, member records, and reporting with clean permission boundaries.",
      },
      {
        title: "Security foundation",
        desc: "Audit trails, least-privilege access, encrypted data handling, and monitoring patterns prepared from the start.",
      },
    ],
    results: [
      "Reduced repetitive enquiries",
      "Cleaner member experience",
      "Improved reporting confidence",
      "Stronger data governance",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "RBAC", "Cloud hosting"],
    image: "/editorial/it-cloud-security-ops.webp",
  },
  {
    id: "clinic-booking-system",
    category: "Healthcare Product",
    title: "A patient booking and front-desk workflow for private clinics",
    industry: "Healthcare",
    about: "A healthcare workflow for Kenyan clinics that want better appointment management, patient communication, and front-desk visibility without adopting a heavy enterprise system.",
    rating: "5/5",
    reviewCount: "Portfolio showcase",
    stats: [
      { val: "24/7", label: "Booking request availability" },
      { val: "SMS", label: "Reminder-ready workflow" },
      { val: "Fast", label: "Front-desk queue visibility" },
      { val: "Private", label: "Patient data handled carefully" },
    ],
    challenge: "Clinics lose time through manual booking calls, scattered patient notes, missed appointments, and unclear daily schedules.",
    challengeDetails: [
      "Patients need simple mobile booking and confirmation.",
      "Reception teams need one view of appointments and follow-ups.",
      "Clinic owners need practical reporting without complex software overhead.",
    ],
    solutionTitle: "A simpler digital front desk",
    solutionDetails: [
      {
        title: "Booking experience",
        desc: "A patient-friendly request flow for appointments, service categories, and preferred contact details.",
      },
      {
        title: "Clinic dashboard",
        desc: "A schedule view for staff to confirm visits, update status, and coordinate patient flow.",
      },
      {
        title: "Operational reporting",
        desc: "Basic insights around bookings, no-shows, service demand, and staff workload.",
      },
    ],
    results: [
      "Clearer appointment flow",
      "Less front-desk confusion",
      "Better patient communication",
      "Useful clinic owner visibility",
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "SMS-ready architecture", "Analytics"],
    image: "/editorial/it-software-team.webp",
  },
  {
    id: "field-service-dashboard",
    category: "Operations Automation",
    title: "A field service command centre for logistics and installation teams",
    industry: "Logistics & Field Operations",
    about: "A practical operations platform for Nairobi-based teams coordinating deliveries, installations, technicians, vehicles, and customer updates across busy routes.",
    rating: "5/5",
    reviewCount: "Portfolio showcase",
    stats: [
      { val: "Live", label: "Job status visibility" },
      { val: "Route", label: "Territory-aware planning" },
      { val: "Team", label: "Technician assignment flow" },
      { val: "Proof", label: "Completion evidence ready" },
    ],
    challenge: "Field teams often coordinate work through calls and chat groups, making it difficult to track job status, customer expectations, and daily productivity.",
    challengeDetails: [
      "Managers need visibility across jobs without constant follow-up calls.",
      "Technicians need clear assignments and customer details on mobile.",
      "Customers need reliable updates when delivery or installation plans change.",
    ],
    solutionTitle: "A connected operations command centre",
    solutionDetails: [
      {
        title: "Dispatch workflow",
        desc: "Create, assign, prioritize, and monitor jobs with status changes visible to the operations team.",
      },
      {
        title: "Mobile field view",
        desc: "Technician-friendly job cards, location notes, customer contacts, and completion capture.",
      },
      {
        title: "Performance visibility",
        desc: "Daily summaries for completed jobs, pending work, bottlenecks, and team workload.",
      },
    ],
    results: [
      "Fewer coordination gaps",
      "Better job accountability",
      "Faster customer updates",
      "Improved operational visibility",
    ],
    techStack: ["React", "Node.js", "Maps integration", "PostgreSQL", "Cloud deployment"],
    image: "/editorial/it-cloud-security-ops.webp",
  },
];

export interface Service {
  id: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  heroTitle: string;
  heroDescription: string;
}

export const servicesData: Service[] = [
  {
    id: "cloud-services",
    name: "Cloud Services",
    slug: "cloud-services",
    title: "Scale Without Boundaries. Deploy Anywhere.",
    description: "Leverage the power of AWS, Azure, and Google Cloud with local expertise. FenTech designs high-availability cloud architectures that reduce operational costs, enhance collaboration, and provide the elastic computing power your business needs to stay competitive.",
    features: [
      "Hybrid & Public Cloud Setup",
      "Cloud Infrastructure Audits",
      "Automated Disaster Recovery",
      "Serverless Computing (Lambda)",
      "DevOps Pipeline Automation",
      "Managed Database Hosting"
    ],
    heroTitle: "Cloud Services",
    heroDescription: "Enterprise cloud solutions that scale with your business"
  },
  {
    id: "cyber-security",
    name: "Cyber Security",
    slug: "cyber-security",
    title: "Protect Your Digital Assets",
    description: "Comprehensive security solutions to protect your business from modern cyber threats.",
    features: [
      "24/7 Security Monitoring",
      "Penetration Testing",
      "Security Audits",
      "Compliance Management",
      "Incident Response",
      "Security Training"
    ],
    heroTitle: "Cyber Security",
    heroDescription: "Enterprise-grade security for your digital infrastructure"
  },
  {
    id: "it-consulting",
    name: "IT Consulting",
    slug: "it-consulting",
    title: "Strategic IT Advisory",
    description: "Expert guidance to align your technology with business objectives.",
    features: [
      "Technology Strategy",
      "Digital Transformation",
      "Infrastructure Planning",
      "Cost Optimization",
      "Vendor Management",
      "IT Roadmap Development"
    ],
    heroTitle: "IT Consulting",
    heroDescription: "Strategic technology consulting for business growth"
  },
  {
    id: "managed-services",
    name: "Managed Services",
    slug: "managed-services",
    title: "Complete IT Management",
    description: "Full-service IT management so you can focus on your core business.",
    features: [
      "24/7 Help Desk Support",
      "Proactive Monitoring",
      "Patch Management",
      "Backup & Recovery",
      "Network Management",
      "User Support"
    ],
    heroTitle: "Managed Services",
    heroDescription: "Complete IT infrastructure management and support"
  },
  {
    id: "web-development",
    name: "Web Development",
    slug: "web-development",
    title: "Modern Web Solutions",
    description: "Custom web applications built with cutting-edge technologies.",
    features: [
      "Custom Web Applications",
      "E-commerce Solutions",
      "CMS Development",
      "API Development",
      "Progressive Web Apps",
      "Web Performance Optimization"
    ],
    heroTitle: "Web Development",
    heroDescription: "Custom web applications that drive business results"
  },
  {
    id: "mobile-development",
    name: "Mobile Development",
    slug: "mobile-development",
    title: "Native & Cross-Platform Apps",
    description: "Mobile applications that deliver exceptional user experiences.",
    features: [
      "iOS Development",
      "Android Development",
      "Cross-Platform Apps",
      "Mobile UI/UX Design",
      "App Store Optimization",
      "Mobile Security"
    ],
    heroTitle: "Mobile Development",
    heroDescription: "Native and cross-platform mobile applications"
  }
];

// app/case-studies/data.ts

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
    id: "insurance-big-data",
    category: "Cloud Hosting",
    title: "Major Insurance Provider Saves $750k per Month With Big Data Migration",
    industry: "Banks & Insurance",
    about: "Paysafe provides payment solutions that power the everyday. The multinational organisation operates multiple brands across the e-cash, payments processing and digital wallets spectrum, serving over 145 million customers.",
    rating: "5/5",
    reviewCount: "31 Reviews",
    stats: [
      { val: "30,000+", label: "Hours delivered back to the business" },
      { val: "100%", label: "SOX compliance in Settlement process automation" },
      { val: "95%+", label: "Success rate of bot case completion" },
      { val: "6+", label: "For functional release of OBT, RTS and OGS" }
    ],
    challenge: "Following a period of rapid growth through acquisition, Paysafe were looking to achieve enterprise-wide operational efficiencies and alignment.",
    challengeDetails: [
      "Lack of process consistency & standardisation across acquired brands.",
      "Numerous manual and non-transparent processes requiring address.",
      "Increasing industry regulation and compliance requirements."
    ],
    solutionTitle: "What did Fentech do?",
    solutionDetails: [
      { 
        title: "Automation Delivery", 
        desc: "Working with the Automation365 team to identify, design, build, test and deploy automated solutions using UiPath. Delivered 28 Automations across Merchant Services, Consumer Services and Risk." 
      },
      { 
        title: "Mobile Chatbot Migration", 
        desc: "Led the migration of chatbots from web browser platform to mobile (Android/iOS) and implemented an intermediate communication layer for seamless live-agent handoff." 
      }
    ],
    results: [
      "30+ processes delivered",
      "Over 30,000 hrs delivered back to the business",
      "100% SOX compliance in Settlement process automation",
      "95% success rate of bot case completion",
      "SDK delivered for native platforms (Virtual & Live agent communications)"
    ],
    techStack: ["JavaScript", "TypeScript", "Node.JS", "React", "Swift", "Java", "Objective-C", "RxJava"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
  },
  {
    id: "coffee-success-story",
    category: "IT Consulting",
    title: "Maximizing Efficiency with Proper Technology Implementation – Coffee Success Story",
    industry: "Retail & Supply Chain",
    about: "A global coffee distributor seeking to modernize their legacy infrastructure to support a rapidly expanding network of premium retail locations.",
    rating: "5/5",
    reviewCount: "24 Reviews",
    stats: [
      { val: "22%", label: "Reduction in supply chain overhead" },
      { val: "14 countries", label: "Seamless regional rollout" },
      { val: "100%", label: "Inventory accuracy achieved" },
      { val: "24/7", label: "Real-time monitoring enabled" }
    ],
    challenge: "The company needed to complete a complex migration on a tight deadline to avoid millions of dollars in post-contract fees and fines.",
    challengeDetails: [
      "Complex migration on a tight deadline.",
      "Avoiding millions of dollars in post-contract fees.",
      "Integration of siloed data across international borders."
    ],
    solutionTitle: "How Fentech Assisted",
    solutionDetails: [
      { 
        title: "Modern Infrastructure", 
        desc: "Provisioning a scalable cloud environment to replace aging on-premise servers." 
      },
      { 
        title: "Consulting Services", 
        desc: "Strategic advisory on technology implementation to ensure zero-downtime during the migration phase." 
      }
    ],
    results: [
      "Avoided $2M+ in potential fines",
      "Modern infrastructure implementation",
      "Improved retail data transparency",
      "Successful global implementation"
    ],
    techStack: ["AWS", "Python", "Docker", "PostgreSQL", "Terraform"],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80"
  },
  {
    id: "london-travel-safety",
    category: "Mobile Development",
    title: "Strategic Move to an AI-supported application for Public Safety Travel App in London",
    industry: "Government & Transport",
    about: "A public safety initiative focused on helping commuters navigate London with real-time safety updates and live travel data.",
    rating: "4.9/5",
    reviewCount: "115 Reviews",
    stats: [
      { val: "1.2M", label: "Active monthly users" },
      { val: "300ms", label: "Average route calculation time" },
      { val: "85%", label: "User safety satisfaction rating" },
      { val: "Live", label: "Updates for all TFL lines" }
    ],
    challenge: "Commuters needed a reliable way to map safe routes and receive live travel updates in an increasingly complex urban environment.",
    challengeDetails: [
      "Requirement for real-time data synchronization.",
      "Need for safe-route AI algorithms.",
      "High concurrency during peak travel hours."
    ],
    solutionTitle: "Fentech Digital Engineering",
    solutionDetails: [
      { 
        title: "AI Journey Planner", 
        desc: "Development of a journey planner that maps safe routes based on live incident data." 
      },
      { 
        title: "Native Mobile Build", 
        desc: "Building a high-performance app for Android and iOS that provides live travel updates." 
      }
    ],
    results: [
      "Confidence-driven travel for Londoners",
      "Modern AI infrastructure",
      "Seamless real-time travel updates",
      "Integration with London's maps API"
    ],
    techStack: ["React Native", "Firebase", "TensorFlow", "Google Maps API", "Node.JS"],
    image: "https://images.unsplash.com/photo-1512428559083-a401a30c9550?auto=format&fit=crop&q=80"
  },
  {
    id: "paysafe-rewards",
    category: "App Development",
    title: "Convenience, savings, and rewards at your fingertips",
    industry: "Fintech",
    about: "A centralized platform for a major payment provider aimed at unifying multiple brand identities under a single rewards ecosystem.",
    rating: "5/5",
    reviewCount: "42 Reviews",
    stats: [
      { val: "40%", label: "Increase in user retention" },
      { val: "Ksh 50M+", label: "Saved in operational silos" },
      { val: "Instant", label: "Reward processing speed" },
      { val: "Global", label: "Currency support" }
    ],
    challenge: "Paysafe’s fast-paced expansion had resulted in a lack of process consistency & standardisation across their acquired brands.",
    challengeDetails: [
      "Fragmented user experience across multiple apps.",
      "High cost of maintaining separate rewards engines.",
      "Need for digital transformation across disparate brands."
    ],
    solutionTitle: "Our Strategic Approach",
    solutionDetails: [
      { 
        title: "Digital Transformation", 
        desc: "Standardizing the rewards engine into a single microservices-based API." 
      },
      { 
        title: "User Experience Design", 
        desc: "Creating a unified mobile interface that prioritizes convenience and savings." 
      }
    ],
    results: [
      "Standardised process consistency",
      "Unified brand experience",
      "Successful digital transformation",
      "Direct boost in user rewards engagement"
    ],
    techStack: ["Kotlin", "Swift UI", "Go", "Kubernetes", "Redis"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80"
  }
];
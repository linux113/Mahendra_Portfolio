/* ============================================================
   Single source of truth for all portfolio content.
   Extracted from https://mahendra-prajapat.youware.app
   ============================================================ */
window.PORTFOLIO = {
  name: "Mahendra Kumar Prajapat",
  shortName: "Mahendra Prajapat",
  brand: "Mahendra",
  role: "Flutter Developer",
  roles: [
    "Flutter Developer",
    "Mobile Application Engineer",
    "Cross-Platform Specialist",
    "Firebase & REST API Integrator"
  ],
  badge: "Available for opportunities",
  heroLine: "Building cross-platform mobile experiences with clean architecture and optimized performance.",
  about: [
    "Mahendra Kumar Prajapat is a Flutter Developer with 3+ years of experience designing and deploying cross-platform mobile applications for Android and iOS.",
    "Proficient in Dart, Flutter, Firebase, and REST APIs with hands-on experience in modern state management including GetX, Riverpod, and BLoC. Focused on writing clean, maintainable code with optimized performance and intuitive user interfaces."
  ],
  aboutIntro:
    "A Flutter developer focused on crafting fast, reliable cross-platform apps. I care about clean architecture, smooth animations and shipping products that feel native on every device.",
  contact: {
    email: "mahendraktech7568@gmail.com",
    phone: "+91 75688 79388",
    phoneHref: "tel:+917568879388",
    github: "https://github.com/mahendraktech-7568",
    githubUser: "mahendraktech-7568"
  },
  stats: [
    { icon: "code", value: 9, suffix: "+", label: "Total Projects", desc: "Innovative mobile & web solutions crafted" },
    { icon: "award", value: 3, suffix: "+", label: "Years of Experience", desc: "Continuous professional journey" },
    { icon: "globe", value: 2, suffix: "", label: "Platforms", desc: "Android & iOS from a single codebase" }
  ],
  marquee: ["Flutter", "Dart", "Firebase", "REST APIs", "GetX", "Riverpod", "BLoC"],
  experience: [
    {
      period: "May 2025 – Present",
      company: "DZAB Soft Pvt. Ltd.",
      role: "Flutter Developer",
      points: [
        "Developing and maintaining cross-platform apps with Flutter",
        "Implementing APIs, Firebase services, and third-party SDKs",
        "Improving UI/UX, performance optimization, and deployment"
      ]
    },
    {
      period: "Oct 2024 – Apr 2025",
      company: "ZUCOL Solution Pvt. Ltd.",
      role: "Flutter Developer",
      points: [
        "Built and maintained cross-platform apps with new features",
        "Focused on bug fixing and performance improvements"
      ]
    },
    {
      period: "Oct 2022 – Oct 2024",
      company: "R2AVINYA Technology LLP",
      role: "Flutter Developer",
      points: [
        "Designed and launched multiple apps on Google Play Store & App Store",
        "Implemented clean UI/UX, animations, and robust state management",
        "Integrated Firebase, REST APIs, and third-party SDKs"
      ]
    }
  ],
  projects: [
    {
      id: "presentrak",
      title: "PresenTrak",
      category: "mobile",
      cat: "Mobile Application",
      emoji: "📊",
      hue: 265,
      desc: "Cross-platform Flutter application designed for real-time presentation tracking and management.",
      long: "PresenTrak keeps track of presentations in real time — schedules, speakers and attendance — with a clean Flutter UI that stays perfectly in sync across devices.",
      tags: ["Flutter", "Dart", "Firebase", "Mobile Application"],
      features: [
        "Real-time presentation tracking and scheduling",
        "Firebase-backed sync across Android & iOS",
        "Clean, gesture-friendly Flutter interface"
      ],
      metrics: [{ v: "4", l: "Core Modules" }, { v: "2", l: "Platforms" }],
      link: null
    },
    {
      id: "btconnect-crm",
      title: "BTConnect CRM",
      category: "crm",
      cat: "Mobile Application",
      emoji: "🤝",
      hue: 210,
      desc: "Customer Relationship Management mobile application built with Flutter for streamlined business operations.",
      long: "BTConnect CRM puts the whole customer pipeline in your pocket — leads, follow-ups and deals managed through a fast Flutter front-end talking to REST APIs.",
      tags: ["Flutter", "Dart", "REST APIs", "Mobile Application"],
      features: [
        "Lead & deal pipeline management on the go",
        "REST API integration for live business data",
        "Offline-safe lists with smart refresh"
      ],
      metrics: [{ v: "6", l: "CRM Modules" }, { v: "2", l: "Platforms" }],
      link: null
    },
    {
      id: "btroomer",
      title: "BTROOMER",
      category: "mobile",
      cat: "Mobile Application",
      emoji: "🛏️",
      hue: 330,
      desc: "Cross-platform mobile application developed with Flutter, featuring clean UI/UX and optimized performance.",
      long: "BTROOMER pairs a polished UI/UX with tight state management so every screen stays at 60fps, even on low-end devices.",
      tags: ["Flutter", "Dart", "State Management", "Mobile Application"],
      features: [
        "Clean UI/UX with consistent design language",
        "Optimized performance & smooth animations",
        "Robust state management architecture"
      ],
      metrics: [{ v: "60", l: "FPS Target" }, { v: "2", l: "Platforms" }],
      link: null
    },
    {
      id: "midas-touch-bkk",
      title: "Midas Touch BKK",
      category: "business",
      cat: "Mobile Application",
      emoji: "✨",
      hue: 45,
      desc: "Feature-rich Flutter application designed for the Midas Touch brand presence in Bangkok.",
      long: "The Bangkok edition of the Midas Touch brand app — catalogs, offers and brand storytelling wrapped in a premium Flutter experience.",
      tags: ["Flutter", "Dart", "Firebase", "Mobile Application"],
      features: [
        "Brand-first design for the Bangkok market",
        "Firebase-driven content & offers",
        "Rich media product showcases"
      ],
      metrics: [{ v: "1", l: "Brand App" }, { v: "2", l: "Platforms" }],
      link: null
    },
    {
      id: "midas-touch-mt",
      title: "Midas Touch MT",
      category: "business",
      cat: "Mobile Application",
      emoji: "👑",
      hue: 15,
      desc: "Mobile application extension of the Midas Touch brand, delivering premium user experience.",
      long: "Midas Touch MT extends the brand to a second market with a premium, gesture-driven Flutter experience and API-powered live content.",
      tags: ["Flutter", "Dart", "REST APIs", "Mobile Application"],
      features: [
        "Premium user experience & micro-interactions",
        "REST API powered live brand content",
        "Shared codebase with the BKK edition"
      ],
      metrics: [{ v: "2", l: "Brand Apps" }, { v: "2", l: "Platforms" }],
      link: null
    },
    {
      id: "jewelnest",
      title: "JewelNest",
      category: "e-commerce",
      cat: "Mobile Application",
      emoji: "💎",
      hue: 190,
      desc: "E-commerce mobile application for the jewelry industry, featuring product catalogs and shopping functionality.",
      long: "JewelNest brings a jewelry boutique to mobile — browsable catalogs, collections and a smooth shopping flow built entirely in Flutter.",
      tags: ["Flutter", "Dart", "Firebase", "Mobile Application"],
      features: [
        "Product catalogs with rich imagery",
        "Shopping flow with cart & checkout",
        "Firebase catalog & content management"
      ],
      metrics: [{ v: "100+", l: "Products" }, { v: "2", l: "Platforms" }],
      link: null
    },
    {
      id: "jewels-infotech",
      title: "Jewels Infotech",
      category: "web",
      cat: "Web Platform",
      emoji: "🌐",
      hue: 280,
      desc: "Technology and business solutions platform covering Website Design & Development, Software Development, Mobile Applications, E-Commerce, Business Automation, SEO, and AI Automation.",
      long: "A full technology & business solutions platform: website design and development, software development, mobile applications, e-commerce, business automation, SEO and AI automation — presented in one polished web presence.",
      tags: ["Web Platform", "E-Commerce", "AI Automation"],
      features: [
        "Seven service lines in one platform",
        "E-commerce & business automation ready",
        "SEO & AI automation focused"
      ],
      metrics: [{ v: "7", l: "Service Lines" }, { v: "1", l: "Web Platform" }],
      link: "https://jewelsinfotech.com/"
    },
    {
      id: "sriyaan-metals",
      title: "Sriyaan Metals",
      category: "web",
      cat: "Web Platform",
      emoji: "🏗️",
      hue: 220,
      desc: "Industrial B2B metal supplier website featuring product catalogs, specifications, enquiry/quote interaction, industry information, and global supply details.",
      long: "An industrial B2B website for a metal supplier — product catalogs with specifications, enquiry/quote interaction and global supply information across engineering, construction, automotive and infrastructure sectors.",
      tags: ["Web Platform", "B2B", "Industrial"],
      features: [
        "Product catalogs with full specifications",
        "Enquiry / quote interaction flow",
        "Industry & global supply information"
      ],
      metrics: [{ v: "6", l: "Sectors" }, { v: "1", l: "Web Platform" }],
      link: "https://sriyaanmetals.com/"
    },
    {
      id: "avyk-jewels",
      title: "AVYK Jewels",
      category: "e-commerce",
      cat: "Web Platform",
      emoji: "💍",
      hue: 320,
      desc: "Professional web presence for AVYK Jewels showcasing jewelry collections and brand identity.",
      long: "A professional web presence for AVYK Jewels — collections, craftsmanship and brand identity presented with an elegant, jewelry-first design.",
      tags: ["Web Platform", "E-Commerce", "Jewelry"],
      features: [
        "Jewelry collection showcases",
        "Brand-identity driven design",
        "Fast, responsive web experience"
      ],
      metrics: [{ v: "1", l: "Brand Site" }, { v: "1", l: "Web Platform" }],
      link: "https://avykjewels.com/"
    }
  ],
  projectFilters: [
    { id: "all", label: "All" },
    { id: "mobile", label: "Mobile" },
    { id: "web", label: "Web" },
    { id: "business", label: "Business" },
    { id: "crm", label: "CRM" },
    { id: "e-commerce", label: "E-Commerce" }
  ],
  techStack: [
    { name: "Flutter", level: "CORE", icon: "📱" },
    { name: "Dart", level: "CORE", icon: "🎯" },
    { name: "Firebase", level: "CORE", icon: "🔥" },
    { name: "REST APIs", level: "CORE", icon: "🔌" },
    { name: "GetX", level: "CORE", icon: "⚡" },
    { name: "Riverpod", level: "WORKING", icon: "🌊" },
    { name: "BLoC", level: "CORE", icon: "🧱" },
    { name: "HTML5", level: "CORE", icon: "🧩" },
    { name: "CSS3", level: "CORE", icon: "🎨" },
    { name: "JavaScript", level: "CORE", icon: "🟨" },
    { name: "TypeScript", level: "CORE", icon: "🟦" },
    { name: "React.js", level: "CORE", icon: "⚛️" },
    { name: "Next.js", level: "WORKING", icon: "▲" },
    { name: "Tailwind CSS", level: "CORE", icon: "🌬️" },
    { name: "Git", level: "CORE", icon: "🌿" },
    { name: "GitHub", level: "CORE", icon: "🐙" },
    { name: "Docker", level: "WORKING", icon: "🐳" },
    { name: "AWS / EC2", level: "WORKING", icon: "☁️" },
    { name: "Linux", level: "WORKING", icon: "🐧" },
    { name: "Nginx", level: "WORKING", icon: "🛰️" }
  ],
  education: [
    { year: "2023", title: "Bachelor's of Science", board: "Rajasthan University", score: "GPA: 7.8" },
    { year: "2019", title: "Class 12th", board: "RBSE", score: "83.60%" },
    { year: "2017", title: "Class 10th", board: "RBSE", score: "71.83%" }
  ],
  services: [
    {
      icon: "📱",
      title: "Mobile App Development",
      text: "Cross-platform Android & iOS applications built with Flutter and Dart — one clean codebase, native-feeling performance on every device."
    },
    {
      icon: "🔥",
      title: "Backend & API Integration",
      text: "Firebase services, REST APIs and third-party SDKs wired into reliable, secure app architectures with robust state management."
    },
    {
      icon: "🎨",
      title: "UI/UX & Performance",
      text: "Intuitive interfaces, smooth animations and relentless performance optimization — clean, maintainable code from first commit to release."
    }
  ],
  navLinks: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" }
  ]
};

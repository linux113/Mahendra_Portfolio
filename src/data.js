/* Portfolio content — v3 (cyber-premium). Real data from mahendra-prajapat.youware.app,
   project list per the 2026 reference brief. See docs/source-content.md */
export const DATA = {
  name: "Mahendra Kumar Prajapat",
  brand: "Mahendra",
  rolesLine: ["Flutter Developer", "Cybersecurity Enthusiast", "Problem Solver"],
  badge: "Available for opportunities",
  aboutBadge: "About Me",
  desc: [
    "I'm a Flutter Developer with 3+ years of experience designing and deploying cross-platform mobile applications for Android and iOS.",
    "I specialize in Dart, Flutter, Firebase, and REST APIs, with a strong focus on clean code, scalable architecture, secure applications, and performance optimization.",
  ],
  pills: ["Flutter", "Dart", "Firebase", "GetX", "Riverpod", "BLoC", "REST API", "Clean Architecture"],
  contact: {
    email: "mahendraktech7568@gmail.com", // verified from live site (brief's "7588" is a typo)
    phone: "+91 75688 79388",
    phoneHref: "tel:+917568879388",
    github: "https://github.com/mahendraktech-7568",
    githubUser: "mahendraktech-7568",
    linkedin: "https://www.linkedin.com/in/mahendra-prajapat", // placeholder — replace with real profile
    linkedinUser: "mahendra-prajapat",
  },
  stats: [
    { icon: "code", value: 9, suffix: "+", label: "Total Projects", desc: "Innovative mobile & web solutions crafted with clean architecture." },
    { icon: "medal", value: 3, suffix: "+", label: "Years of Experience", desc: "Continuous professional journey in mobile development." },
    { icon: "globe", value: 2, suffix: "", label: "Platforms", desc: "Android & iOS from a single codebase." },
    { icon: "shield", value: 100, suffix: "%", label: "Security Focus", desc: "Building secure, scalable and high-performing applications." },
  ],
  securityPanel: ["Authentication", "Encryption", "Secure Storage", "Network Security"],
  hudMessages: ["SECURITY SCAN", "ENCRYPTION ACTIVE", "SYSTEM SECURE", "SECURE CONNECTION"],
  experience: [
    {
      period: "May 2025 – Present", company: "DZAB Soft Pvt. Ltd.", role: "Flutter Developer", icon: "code",
      points: [
        "Developing and maintaining cross-platform apps with Flutter",
        "Implementing APIs, Firebase services, and third-party SDKs",
        "Improving UI/UX, performance optimization, and deployment",
      ],
    },
    {
      period: "Oct 2024 – Apr 2025", company: "ZUCOL Solution Pvt. Ltd.", role: "Flutter Developer", icon: "flutter",
      points: [
        "Built and maintained cross-platform apps with new features",
        "Focused on bug fixing and performance improvements",
      ],
    },
    {
      period: "Oct 2022 – Oct 2024", company: "R2AVINYA Technology LLP", role: "Flutter Developer", icon: "flutter",
      points: [
        "Designed and launched multiple apps on Google Play Store & App Store",
        "Implemented clean UI/UX, animations, and robust state management",
        "Integrated Firebase, REST APIs, and third-party SDKs",
      ],
    },
  ],
  projects: [
    { id: "presenttalk", title: "PresentTalk", cat: "Mobile Application", filters: ["mobile"], img: "/img/mock_mobile_a.jpg", hue: 0, desc: "Cross-platform Flutter application designed for real-time presentation tracking and management.", tags: ["Flutter", "Dart", "Firebase"], link: null },
    { id: "btconnect", title: "BTConnect CRM", cat: "Mobile Application", filters: ["mobile", "crm"], img: "/img/mock_mobile_b.jpg", hue: 0, desc: "Customer Relationship Management mobile application built with Flutter for streamlined business operations.", tags: ["Flutter", "Dart", "REST APIs"], link: null },
    { id: "btroomer", title: "BTROOMER", cat: "Mobile Application", filters: ["mobile"], img: "/img/mock_mobile_a.jpg", hue: 140, desc: "Cross-platform mobile application developed with Flutter, featuring clean UI/UX and optimized performance.", tags: ["Flutter", "Dart", "State Management"], link: null },
    { id: "midas-bkk", title: "Midas Touch BKK", cat: "Mobile Application", filters: ["mobile", "business"], img: "/img/mock_mobile_b.jpg", hue: 190, desc: "Feature-rich Flutter application designed for the Midas Touch brand, presented in Bangkok.", tags: ["Flutter", "Dart", "Firebase"], link: null },
    { id: "midas-mt", title: "Midas Touch MT", cat: "Mobile Application", filters: ["mobile", "business"], img: "/img/mock_mobile_a.jpg", hue: 300, desc: "Mobile application extension of the Midas Touch brand, delivering premium user experience.", tags: ["Flutter", "Dart", "REST APIs"], link: null },
    { id: "jewelnest", title: "JewelNest", cat: "Web Platform", filters: ["web", "e-commerce"], img: "/img/mock_web_b.jpg", hue: 0, desc: "E-commerce mobile application for the jewelry industry, featuring product catalogs and shopping functionality.", tags: ["Web Platform", "E-Commerce", "AI Automation"], link: "https://avykjewels.com/" },
    { id: "shycan", title: "Shycan Metals", cat: "Web Platform", filters: ["web", "business"], img: "/img/mock_web_a.jpg", hue: 0, desc: "Industrial B2B metal supplier website featuring product catalogs, specifications, enquiry/quote functionality.", tags: ["Web Platform", "B2B", "Industrial"], link: "https://sriyaanmetals.com/" },
    { id: "avrk", title: "AVRK Jewels", cat: "Web Platform", filters: ["web", "e-commerce"], img: "/img/mock_web_b.jpg", hue: 160, desc: "Professional web presence for AVRK Jewels showcasing jewelry collections and brand identity.", tags: ["Web Platform", "E-Commerce", "Jewelry"], link: "https://jewelsinfotech.com/" },
  ],
  filters: [
    { id: "all", label: "All" }, { id: "mobile", label: "Mobile" }, { id: "web", label: "Web" },
    { id: "business", label: "Business" }, { id: "crm", label: "CRM" }, { id: "e-commerce", label: "E-Commerce" },
  ],
  certificates: [
    { year: "2023", title: "Bachelor's of Science", board: "Rajasthan University", score: "GPA: 7.8" },
    { year: "2019", title: "Class 12th", board: "RBSE", score: "83.60%" },
    { year: "2017", title: "Class 10th", board: "RBSE", score: "71.83%" },
  ],
  techStack: [
    { name: "Flutter", logo: "flutter" }, { name: "Dart", logo: "dart" }, { name: "Firebase", logo: "firebase" },
    { name: "REST API", logo: "api" }, { name: "GetX", logo: "getx" }, { name: "Riverpod", logo: "riverpod" },
    { name: "BLoC", logo: "bloc" }, { name: "Git", logo: "git" }, { name: "GitHub", logo: "github" },
    { name: "Android", logo: "android" }, { name: "iOS", logo: "ios" },
  ],
  services: [
    { icon: "📱", title: "Mobile App Development", text: "Cross-platform Android & iOS applications in Flutter — one clean codebase, native-feel performance, store-ready releases." },
    { icon: "🔌", title: "Backend, API & Firebase", text: "REST API architecture, Firebase suites and third-party SDKs integrated with robust, testable state management." },
    { icon: "🛡️", title: "Security-First Engineering", text: "Secure storage, encrypted transport, authenticated sessions and safety-checked dependencies by default." },
    { icon: "⚡", title: "UI/UX & Performance", text: "Intuitive interfaces, 60fps motion, jank-free scrolling and measurable cold-start and size optimizations." },
  ],
  strips: { hero: "CODE × SECURITY × INNOVATION", career: "CODE × CREATE × IMPACT" },
  vertical: "BUILDING THE FUTURE WITH CODE",
  script: ["Turning Ideas into", "Powerful Digital Solutions"],
  contactPerks: ["Fast Reply", "Collaboration", "Great Results"],
};

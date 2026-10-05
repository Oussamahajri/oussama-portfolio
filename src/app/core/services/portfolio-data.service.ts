import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';
import { Skill } from '../models/skill.model';
import { Mission } from '../models/mission.model';
import { TimelineEvent } from '../models/timeline.model';
import { JourneyStage } from '../models/journey.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private readonly profileData: Profile = {
    name: 'OUSSAMA HAJRI',
    tagline: 'INFORMATION TECHNOLOGY // FULL-STACK ARCHITECT IN TRAINING',
    field: 'Information Technology',
    role: 'Aspiring Full-Stack Developer',
    status: 'SYSTEMS ONLINE // READY FOR OPPORTUNITIES',
    clearanceLevel: 'LEVEL-04 // FULL-STACK PROTOCOL',
    systemOrigin: 'TUNISIA // GLOBAL DEPLOYMENT',
    email: 'hajrioussama41@gmail.com',
    location: 'Tunisia (Open to Remote & Relocation)',
    availability: 'Available for Internships, PFE & Full-Time Junior Engineering Roles',
    bioSummary: 'Information Technology student and passionate full-stack developer committed to crafting immersive, resilient, and high-performance digital experiences. Bridges the space between sophisticated frontend interfaces and scalable backend architectures.',
    corePhilosophy: 'Software engineering is an ongoing expedition: write intentional code, diagnose complex bottlenecks calmly, and turn real-world problems into elegant, human-centric software.',
    interests: [
      'Modern Web Architectures (Angular, React, Node.js)',
      'Immersive 3D & Creative Web (Three.js, WebGL, Shader Art)',
      'API Engineering & Distributed Services',
      'Artificial Intelligence Integration',
      'High-Performance UI/UX & Interaction Design'
    ],
    stats: [
      { label: 'ACADEMIC PATH', value: 'INFO TECH', detail: 'Specializing in Software & Systems' },
      { label: 'CORE STACK', value: 'FULL-STACK', detail: 'Angular · React · Node · Laravel' },
      { label: 'MISSION CODE', value: 'PFE 2026', detail: 'Engineering Master Graduation Target' },
      { label: 'COMMITMENT', value: '100%', detail: 'Clean Code & Continuous Growth' }
    ],
    socialLinks: [
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/oussama-hajri',
        handle: 'linkedin.com/in/oussama-hajri',
        icon: 'linkedin',
        primary: true
      },
      {
        name: 'GitHub',
        url: 'https://github.com/oussama-hajri',
        handle: 'github.com/oussama-hajri',
        icon: 'github',
        primary: true
      },
      {
        name: 'Email Direct',
        url: 'mailto:hajrioussama41@gmail.com',
        handle: 'hajrioussama41@gmail.com',
        icon: 'email',
        primary: true
      }
    ]
  };

  private readonly skillsData: Skill[] = [
    {
      id: 'javascript',
      name: 'JavaScript (ES6+)',
      level: 8,
      levelDisplay: 'LEVEL 08',
      category: 'frontend',
      categoryLabel: 'FRONTEND ENGINE',
      description: 'Deep understanding of modern JavaScript, asynchronous patterns (Promises, async/await), closures, event loop, and DOM manipulation.',
      experienceYears: '3+ Years',
      proficiencyRank: 'SPECIALIST',
      relatedProjects: ['Library Management System', 'E-Learning Platform', 'Smart Heritage'],
      highlightTags: ['Async/Await', 'ESNext', 'DOM API', 'Functional Patterns'],
      stats: { speed: 85, depth: 80, architecture: 78 }
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      level: 6,
      levelDisplay: 'LEVEL 06',
      category: 'frontend',
      categoryLabel: 'SYSTEMS TYPING',
      description: 'Strong static typing, generics, strict interface contracts, union types, and utility types for robust large-scale applications.',
      experienceYears: '2 Years',
      proficiencyRank: 'PRACTITIONER',
      relatedProjects: ['E-Learning Platform', 'University Residence', 'HAJRI Studio'],
      highlightTags: ['Generics', 'Strict Mode', 'Interfaces', 'Type Guards'],
      stats: { speed: 75, depth: 70, architecture: 72 }
    },
    {
      id: 'angular',
      name: 'Angular',
      level: 7,
      levelDisplay: 'LEVEL 07',
      category: 'frontend',
      categoryLabel: 'ENTERPRISE FRONTEND',
      description: 'Building structured, scalable enterprise Single Page Applications using standalone components, signals, RxJS streams, dependency injection, and router guards.',
      experienceYears: '2 Years',
      proficiencyRank: 'PRACTITIONER',
      relatedProjects: ['E-Learning Platform', 'University Residence Management'],
      highlightTags: ['Signals', 'RxJS', 'Standalone Components', 'Guards', 'Directives'],
      stats: { speed: 78, depth: 74, architecture: 82 }
    },
    {
      id: 'react',
      name: 'React',
      level: 7,
      levelDisplay: 'LEVEL 07',
      category: 'frontend',
      categoryLabel: 'REACTIVE UI',
      description: 'Component lifecycle, hooks (useState, useEffect, useMemo, custom hooks), state management, context API, and modular architecture.',
      experienceYears: '2 Years',
      proficiencyRank: 'PRACTITIONER',
      relatedProjects: ['Library Management System', 'HAJRI Studio'],
      highlightTags: ['Custom Hooks', 'Context API', 'Virtual DOM', 'Component Design'],
      stats: { speed: 80, depth: 72, architecture: 75 }
    },
    {
      id: 'nodejs',
      name: 'Node.js & Express',
      level: 6,
      levelDisplay: 'LEVEL 06',
      category: 'backend',
      categoryLabel: 'BACKEND RUNTIME',
      description: 'Event-driven server development, middleware pipelines, JWT authentication, RESTful endpoint design, error handling, and file streaming.',
      experienceYears: '2 Years',
      proficiencyRank: 'PRACTITIONER',
      relatedProjects: ['Library Management System', 'University Residence Management'],
      highlightTags: ['Express.js', 'JWT Auth', 'REST APIs', 'Middleware'],
      stats: { speed: 72, depth: 68, architecture: 70 }
    },
    {
      id: 'php',
      name: 'PHP',
      level: 6,
      levelDisplay: 'LEVEL 06',
      category: 'backend',
      categoryLabel: 'BACKEND SERVICES',
      description: 'Object-Oriented PHP, MVC architectures, database abstraction, session governance, and REST API development.',
      experienceYears: '2 Years',
      proficiencyRank: 'PRACTITIONER',
      relatedProjects: ['University Residence Management', 'Web Systems'],
      highlightTags: ['OOP PHP', 'MVC Pattern', 'PDO', 'Composer'],
      stats: { speed: 70, depth: 65, architecture: 68 }
    },
    {
      id: 'laravel',
      name: 'Laravel',
      level: 5,
      levelDisplay: 'LEVEL 05',
      category: 'backend',
      categoryLabel: 'BACKEND FRAMEWORK',
      description: 'Eloquent ORM, routing, database migrations, controllers, blade templates, and secure API resource endpoints.',
      experienceYears: '1.5 Years',
      proficiencyRank: 'PRACTITIONER',
      relatedProjects: ['University Residence Management', 'Internal Tooling'],
      highlightTags: ['Eloquent ORM', 'Artisan', 'API Resources', 'Migrations'],
      stats: { speed: 65, depth: 60, architecture: 64 }
    },
    {
      id: 'mysql',
      name: 'MySQL & Relational DBs',
      level: 7,
      levelDisplay: 'LEVEL 07',
      category: 'database',
      categoryLabel: 'RELATIONAL DATA',
      description: 'Relational schema normalization, complex SQL joins, indexing, foreign key constraints, transaction integrity, and query profiling.',
      experienceYears: '2+ Years',
      proficiencyRank: 'PRACTITIONER',
      relatedProjects: ['University Residence Management', 'Academic ERP System'],
      highlightTags: ['Relational Schema', 'Indexing', 'Transactions', 'Normalization'],
      stats: { speed: 75, depth: 72, architecture: 76 }
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      level: 6,
      levelDisplay: 'LEVEL 06',
      category: 'database',
      categoryLabel: 'DOCUMENT DATA',
      description: 'NoSQL document modeling, Mongoose schemas and hooks, aggregation pipelines, and flexible document indexing.',
      experienceYears: '2 Years',
      proficiencyRank: 'PRACTITIONER',
      relatedProjects: ['Library Management System', 'E-Learning Platform'],
      highlightTags: ['Mongoose', 'Aggregation', 'Document Schema', 'Atlas'],
      stats: { speed: 70, depth: 66, architecture: 68 }
    },
    {
      id: 'threejs',
      name: 'Three.js & 3D WebGL',
      level: 6,
      levelDisplay: 'LEVEL 06',
      category: 'frontend',
      categoryLabel: 'CREATIVE 3D WEB',
      description: 'Interactive 3D scenes, custom geometries, material shaders, particle systems, camera animations, and raycasting interactions.',
      experienceYears: '1+ Year',
      proficiencyRank: 'PRACTITIONER',
      relatedProjects: ['Smart Heritage Immersive Room', 'HAJRI Digital Identity'],
      highlightTags: ['WebGL', 'Particle Engines', 'Raycasting', 'Lighting & Shaders'],
      stats: { speed: 68, depth: 65, architecture: 70 }
    },
    {
      id: 'html-scss',
      name: 'HTML5 & SCSS',
      level: 8,
      levelDisplay: 'LEVEL 08',
      category: 'frontend',
      categoryLabel: 'STYLING & LAYOUT',
      description: 'Semantic HTML5, CSS Grid, Flexbox, SCSS mixins/variables, responsive layouts, micro-animations, and GPU-accelerated styling.',
      experienceYears: '3+ Years',
      proficiencyRank: 'SPECIALIST',
      relatedProjects: ['All Missions', 'HAJRI Studio'],
      highlightTags: ['CSS Grid', 'SCSS Architecture', 'Responsive Design', 'Keyframes'],
      stats: { speed: 88, depth: 82, architecture: 85 }
    },
    {
      id: 'git-tools',
      name: 'Git & Dev Tools',
      level: 6,
      levelDisplay: 'LEVEL 06',
      category: 'tools',
      categoryLabel: 'ENGINEERING WORKFLOW',
      description: 'Git branch workflows, PR reviews, merge conflict resolution, Vite/Webpack bundling, Postman API testing, and basic Docker containerization.',
      experienceYears: '2+ Years',
      proficiencyRank: 'PRACTITIONER',
      relatedProjects: ['All Projects & Team Workflows'],
      highlightTags: ['Git Flow', 'Postman', 'Docker Basics', 'npm/bundlers'],
      stats: { speed: 74, depth: 68, architecture: 70 }
    }
  ];

  private readonly missionsData: Mission[] = [
    {
      id: 'mission-01',
      code: 'MISSION 01',
      codename: 'OPERATION BIBLIOTHECA',
      title: 'Library Management System',
      subtitle: 'End-to-End Enterprise Resource & Cataloging Engine',
      category: 'Full-Stack',
      status: 'COMPLETED',
      statusBadge: 'SYSTEM ACTIVE // COMPLETED',
      dateRange: 'Academic Year 2024-2025',
      clearance: 'ALPHA',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'REST API', 'JWT'],
      primaryTech: 'MERN Stack',
      summary: 'A full-stack web application architected to digitize institutional library operations, streamlining inventory tracking, automated borrowing timelines, member authorizations, and catalog search algorithms.',
      problem: 'Manual book lending logs led to record inaccuracies, lost inventories, lack of overdue accountability, and cumbersome physical book discovery for students and staff.',
      solution: 'Engineered a unified MERN platform featuring role-based access control (Admin, Librarian, Member), automated overdue penalty computations, indexing for sub-second book queries, and interactive borrowing reservations.',
      architecture: [
        { layer: 'Presentation', technology: 'React + Custom Modular CSS', role: 'Reactive catalog browser, borrowing cart & member dashboard' },
        { layer: 'API Gateway', technology: 'Node.js & Express.js', role: 'JWT-authenticated RESTful endpoints with validation middleware' },
        { layer: 'Data Storage', technology: 'MongoDB & Mongoose', role: 'Indexed document schemas for books, transactions, and user profiles' }
      ],
      features: [
        'Role-Based Access Control (Admin / Librarian / Student)',
        'Real-time Book Availability & Borrow Reservation Queue',
        'Automatic Overdue Date Calculation & Fine Tracking',
        'Multi-attribute Search & Filtering (ISBN, Author, Genre, Availability)',
        'Comprehensive Reporting & Activity Audit Logs'
      ],
      metrics: [
        { label: 'QUERY SPEED', value: '< 65ms' },
        { label: 'DATA INTEGRITY', value: '100% ACID-like' },
        { label: 'MODULES', value: '6 Micro-units' }
      ],
      githubUrl: 'https://github.com/oussama-hajri/library-management-system',
      demoUrl: 'https://github.com/oussama-hajri/library-management-system',
      tacticalLog: [
        '[SEC 01] Initialized schema definitions for Books, Loans, and Members.',
        '[SEC 02] Integrated bcrypt password hashing & JWT token revocation checks.',
        '[SEC 03] Solved simultaneous checkout race condition using MongoDB atomic updates.',
        '[SEC 04] Deployed REST API endpoints with robust error middleware.'
      ],
      visualAccent: '#00f0ff'
    },
    {
      id: 'mission-02',
      code: 'MISSION 02',
      codename: 'OPERATION EDUNEXUS',
      title: 'E-Learning Platform',
      subtitle: 'Next-Generation Interactive Academic Portal',
      category: 'Frontend',
      status: 'COMPLETED',
      statusBadge: 'SYSTEM OPERATIONAL',
      dateRange: 'Academic Year 2025',
      clearance: 'BETA',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'REST API', 'Angular Router'],
      primaryTech: 'Angular & TypeScript',
      summary: 'An advanced e-learning interface delivering dynamic course curriculums, multimedia lectures, progress tracking, interactive quizzes, and teacher-student collaboration modules.',
      problem: 'Traditional learning portals are notoriously clunky, slow to reload, and lack interactive feedback loops that keep students engaged during self-paced study.',
      solution: 'Created a high-speed Single Page Application with Angular, leveraging signals and RxJS observable pipelines for seamless course progress sync, interactive video checkpoints, and real-time quiz evaluations.',
      architecture: [
        { layer: 'UI Layer', technology: 'Angular Standalone Components', role: 'Lazy-loaded course modules and interactive assessment canvases' },
        { layer: 'State & Reactivity', technology: 'RxJS & Angular Signals', role: 'Reactive course progress tracking and live lesson bookmarks' },
        { layer: 'Integration', technology: 'HTTP Client & Interceptors', role: 'Token injection, request caching, and error recovery' }
      ],
      features: [
        'Modular Course Syllabus & Video Lecture Chapters',
        'Interactive Self-Assessment Quizzes with Instant Scoring',
        'Personalized Student Progression Dashboard & Certificates',
        'Instructor Course Builder with Dynamic Section Reordering',
        'Dark/Light Futuristic UI Mode with Responsive Mobile Layout'
      ],
      metrics: [
        { label: 'BUNDLE LOAD', value: '< 1.4s' },
        { label: 'REACTIVE SYNC', value: 'Instant' },
        { label: 'ACCESSIBILITY', value: 'WCAG AA' }
      ],
      githubUrl: 'https://github.com/oussama-hajri/elearning-platform-angular',
      demoUrl: 'https://github.com/oussama-hajri/elearning-platform-angular',
      tacticalLog: [
        '[SEC 01] Architected modular route hierarchy with lazy-loaded course bundles.',
        '[SEC 02] Built custom RxJS state store for live quiz timer and scoring engine.',
        '[SEC 03] Implemented route guards preventing unauthorized curriculum skips.'
      ],
      visualAccent: '#0070f3'
    },
    {
      id: 'mission-03',
      code: 'MISSION 03',
      codename: 'OPERATION RESIDENZ',
      title: 'University Residence Management',
      subtitle: 'Campus Accommodation & Logistics Governance System',
      category: 'Enterprise Systems',
      status: 'COMPLETED',
      statusBadge: 'SYSTEM DEPLOYED',
      dateRange: 'Academic Year 2025',
      clearance: 'GAMMA',
      technologies: ['Angular', 'PHP', 'Laravel / REST', 'MySQL', 'SCSS', 'Bootstrap/Tailwind'],
      primaryTech: 'Angular + PHP/MySQL',
      summary: 'An institutional management system designed to coordinate university dorm allocations, room maintenance requests, resident billing, and administrative oversight across campus buildings.',
      problem: 'Handling hundreds of dormitory placements manually using spreadsheets resulted in room double-bookings, delayed maintenance responses, and opaque resident billing histories.',
      solution: 'Built an integrated client-server architecture with an Angular administrative dashboard and a secure PHP/Laravel REST backend, automating room capacity management, maintenance ticket queues, and resident verification.',
      architecture: [
        { layer: 'Frontend Dashboard', technology: 'Angular + SCSS', role: 'Visual building floorplan inspector and resident directory' },
        { layer: 'Backend Engine', technology: 'PHP / Laravel REST API', role: 'Room allocation algorithms, auth policies, and incident ticket dispatcher' },
        { layer: 'Relational Store', technology: 'MySQL', role: 'Normalized schema maintaining resident records, rooms, and payments' }
      ],
      features: [
        'Interactive Floor & Room Allocation Visualizer',
        'Resident Check-in/Check-out Verification with Document Upload',
        'Maintenance Ticketing System with Status Progression (Pending/In Review/Resolved)',
        'Payment History & Campus Fee Ledger Generation',
        'Automated Room Occupancy Statistics for Administration'
      ],
      metrics: [
        { label: 'ALLOCATION SPEED', value: 'Instant' },
        { label: 'ROOM ACCURACY', value: '100%' },
        { label: 'QUERY LATENCY', value: '< 40ms' }
      ],
      githubUrl: 'https://github.com/oussama-hajri/residence-management-system',
      demoUrl: 'https://github.com/oussama-hajri/residence-management-system',
      tacticalLog: [
        '[SEC 01] Designed relational schema with constraints preventing room capacity overflows.',
        '[SEC 02] Configured role-based API authentication for campus admins vs student residents.',
        '[SEC 03] Optimized query joins for rapid campus-wide occupancy reporting.'
      ],
      visualAccent: '#00ff88'
    },
    {
      id: 'mission-04',
      code: 'MISSION 04',
      codename: 'OPERATION HERITAGE-3D',
      title: 'Smart Heritage Immersive Room',
      subtitle: 'AI & 3D Interactive Cultural Preservation Experience',
      category: 'AI & 3D Interactive',
      status: 'IN_PRODUCTION',
      statusBadge: 'ACTIVE INNOVATION // RESEARCH',
      dateRange: '2025 - 2026',
      clearance: 'OMEGA',
      technologies: ['Three.js', 'WebGL', 'AI Concept', 'TypeScript', 'Web Audio', 'GLTF/3D Models'],
      primaryTech: 'Three.js & AI Experience',
      summary: 'A boundary-pushing interactive 3D digital museum room that reconstructs historical heritage artifacts and monuments, augmented with an intelligent virtual docent / AI guide for contextual storytelling.',
      problem: 'Physical cultural heritage sites face deterioration, geographical inaccessibility, and lack of engaging digital preservation methods for younger generations.',
      solution: 'Developed an immersive WebGL/Three.js virtual gallery where visitors navigate historical artifacts in full 3D, inspect high-fidelity meshes with realistic lighting, and interact with an AI narration guide.',
      architecture: [
        { layer: '3D Simulation', technology: 'Three.js & WebGL Shaders', role: 'Spatial gallery room, dynamic point lighting, particle dust & artifact inspect' },
        { layer: 'Interaction Logic', technology: 'TypeScript & Raycasting', role: 'Artifact selection, orbit camera transitions & hot-spot annotations' },
        { layer: 'AI Narration', technology: 'Virtual Guide Engine', role: 'Historical context retrieval & conversational audio synthesis' }
      ],
      features: [
        'Interactive 3D Virtual Gallery with Orbit & First-Person Controls',
        'High-Resolution Historical Artifact Inspection with Rotate/Zoom',
        'Holographic Annotation Points detailing historical provenance',
        'Conversational AI Docent providing deep contextual historical knowledge',
        'Ambient Audio Synthesis matching historical architectural spaces'
      ],
      metrics: [
        { label: 'RENDER FPS', value: '60 FPS' },
        { label: '3D FIDELITY', value: 'High Poly' },
        { label: 'IMMERSION', value: '98%' }
      ],
      githubUrl: 'https://github.com/oussama-hajri/smart-heritage-immersive-room',
      demoUrl: 'https://github.com/oussama-hajri/smart-heritage-immersive-room',
      tacticalLog: [
        '[SEC 01] Implemented Three.js scene graph with custom PBR material shaders.',
        '[SEC 02] Added frustum culling and LOD to ensure smooth 60fps on consumer devices.',
        '[SEC 03] Integrated interactive raycasting hotspots for museum docent triggers.'
      ],
      visualAccent: '#9945ff'
    },
    {
      id: 'mission-05',
      code: 'MISSION 05',
      codename: 'OPERATION CREATIVE-LAB',
      title: 'Hajri Studio',
      subtitle: 'Creative Web-Based Image Editing & Canvas Engine',
      category: 'Frontend',
      status: 'IN_PRODUCTION',
      statusBadge: 'PROTOTYPE LAB // STAGING',
      dateRange: '2025 - 2026',
      clearance: 'ALPHA',
      technologies: ['HTML5 Canvas', 'TypeScript', 'CSS Filters', 'WebGL Shaders', 'Web Workers'],
      primaryTech: 'HTML5 Canvas & TypeScript',
      summary: 'A browser-based creative suite concept allowing developers and designers to manipulate imagery, apply real-time algorithmic filters, create digital generative patterns, and export graphics.',
      problem: 'Heavy desktop design applications are costly and slow for fast web assets, while simple online editors lack precision controls and developer-friendly code exports.',
      solution: 'Crafted a zero-latency client-side canvas studio utilizing Web Workers and HTML5 Canvas API for non-blocking pixel manipulation, custom LUT filters, and batch asset transforms.',
      architecture: [
        { layer: 'Rendering Engine', technology: 'HTML5 Canvas 2D & WebGL', role: 'Real-time multi-layer rendering and blend mode matrix' },
        { layer: 'Processing Core', technology: 'Web Workers & TypeScript', role: 'Heavy pixel crunching, convolution filters, and histogram generation' },
        { layer: 'UI Shell', technology: 'SCSS & Glassmorphic HUD', role: 'Minimalist tool palette, layer stack, and precision slider controls' }
      ],
      features: [
        'Multi-Layer Canvas Compositing with Blend Modes',
        'Algorithmic Filters (Convolution matrices, Duotone, Cyber Glow)',
        'Histogram & Color Curve Telemetry in real-time',
        'Lossless Export to PNG, WebP, and SVG vector code',
        'Offline capability via Service Worker architecture'
      ],
      metrics: [
        { label: 'LATENCY', value: '< 16ms' },
        { label: 'ZERO SERVER', value: '100% Client' },
        { label: 'PIXEL BUFFER', value: 'RGBA Float' }
      ],
      githubUrl: 'https://github.com/oussama-hajri/hajri-studio-web',
      demoUrl: 'https://github.com/oussama-hajri/hajri-studio-web',
      tacticalLog: [
        '[SEC 01] Created offscreen canvas pipeline for multi-threaded filter processing.',
        '[SEC 02] Built history stack supporting infinite undo/redo states with delta compression.',
        '[SEC 03] Designed cybernetic darkroom UI with keyboard shortcuts.'
      ],
      visualAccent: '#ff0055'
    }
  ];

  private readonly timelineData: TimelineEvent[] = [
    {
      id: 'timeline-01',
      year: '2024',
      period: 'THE GENESIS',
      milestoneType: 'ACADEMIC',
      title: 'Foundation in Computer Science',
      subtitle: 'Algorithms, Data Structures & Systems Fundamentals',
      institutionOrContext: 'University Level IT Studies',
      description: 'Embarked on the Information Technology academic journey. Mastered fundamental algorithms, object-oriented concepts, relational database theory, and core systems architecture.',
      skillsAcquired: ['Algorithms & Data Structures', 'C/C++ & Java Core', 'Relational Database Fundamentals', 'Linux/Unix Shell'],
      keyDeliverables: ['Algorithmic problem sets', 'Database normalization projects', 'Console terminal simulations'],
      icon: 'terminal',
      status: 'COMPLETED',
      telemetryCode: 'NODE_INIT_2024'
    },
    {
      id: 'timeline-02',
      year: '2025',
      period: 'EXPANSION',
      milestoneType: 'EXPERIENCE',
      title: 'Modern Web Stack Mastery',
      subtitle: 'Component-Driven Architectures (React & Angular)',
      institutionOrContext: 'Specialized Full-Stack Development',
      description: 'Transitioned theoretical foundations into enterprise web engineering. Deeply explored frontend reactive ecosystems (Angular and React) alongside Node.js and PHP backend API design.',
      skillsAcquired: ['Angular 18+ (Signals & Standalone)', 'React & Custom Hooks', 'Node.js/Express & REST APIs', 'MERN & Full-Stack integration'],
      keyDeliverables: ['Library Management System', 'E-Learning Platform', 'Full-stack REST API test harnesses'],
      icon: 'code',
      status: 'COMPLETED',
      telemetryCode: 'NODE_EXPAND_2025'
    },
    {
      id: 'timeline-03',
      year: '2025',
      period: 'FIELD MISSION',
      milestoneType: 'EXPERIENCE',
      title: 'Technical Software Internship',
      subtitle: 'Real-World Production Development & Team Agility',
      institutionOrContext: 'Software Engineering Industry Internship',
      description: 'Integrated into an active engineering environment. Participated in sprint planning, code reviews, database schema design, and production bug triage, witnessing the full software lifecycle.',
      skillsAcquired: ['Agile / Scrum Methodology', 'Git Workflow & Code Reviews', 'Production API Integration', 'Team Communication'],
      keyDeliverables: ['Enterprise module delivery', 'Performance optimization reports', 'Production bug fixes'],
      icon: 'briefcase',
      status: 'COMPLETED',
      telemetryCode: 'NODE_FIELD_2025'
    },
    {
      id: 'timeline-04',
      year: '2025',
      period: 'ACCELERATION',
      milestoneType: 'HACKATHON',
      title: 'Hackathon Innovation Sprint',
      subtitle: 'High-Pressure Prototyping & Rapid Solution Delivery',
      institutionOrContext: 'National Developer Hackathon',
      description: 'Collaborated in an intensive 48-hour development challenge. Architected and deployed an MVP under intense time constraints, pitching the solution to a technical jury.',
      skillsAcquired: ['Rapid MVP Scaffolding', 'Pressure Decision-Making', 'Technical Pitching', 'Cross-Disciplinary Teamwork'],
      keyDeliverables: ['Functional 48h prototype', 'Architectural slide deck', 'Live jury demonstration'],
      icon: 'zap',
      status: 'COMPLETED',
      telemetryCode: 'NODE_HACK_2025'
    },
    {
      id: 'timeline-05',
      year: '2026',
      period: 'SPECIALIZATION',
      milestoneType: 'ACADEMIC',
      title: 'Information Technology Engineering',
      subtitle: 'Advanced Systems, Cloud Infrastructure & Distributed Tech',
      institutionOrContext: 'Senior IT Degree Specialization',
      description: 'Refining software engineering acumen with cloud patterns, containerization, microservices concepts, cybersecurity practices, and AI integration.',
      skillsAcquired: ['Distributed Systems Architecture', 'Cloud Services & Containerization', 'Cybersecurity Best Practices', 'AI & WebGL Integration'],
      keyDeliverables: ['University Residence Management System', 'Smart Heritage 3D Prototype'],
      icon: 'cpu',
      status: 'IN_PROGRESS',
      telemetryCode: 'NODE_SPEC_2026'
    },
    {
      id: 'timeline-06',
      year: '2026',
      period: 'APEX MILESTONE',
      milestoneType: 'CAPSTONE',
      title: 'PFE (Final Year Graduation Project)',
      subtitle: 'Culmination of Academic & Practical Engineering Prowess',
      institutionOrContext: 'Graduation Capstone Project',
      description: 'The defining academic and engineering capstone: researching, architecting, and deploying a high-impact, production-grade software solution solving a real-world enterprise challenge.',
      skillsAcquired: ['End-to-End System Architecture', 'Formal Technical Documentation', 'Advanced Problem Solving', 'Full Engineering Autonomy'],
      keyDeliverables: ['Complete Capstone System', 'Technical Thesis', 'Public Defense'],
      icon: 'award',
      status: 'IN_PROGRESS',
      telemetryCode: 'NODE_PFE_2026'
    },
    {
      id: 'timeline-07',
      year: 'FUTURE',
      period: 'HORIZON',
      milestoneType: 'VISION',
      title: 'Full-Stack Software Engineer',
      subtitle: 'Building Scalable Global Products & Pioneering Web AI',
      institutionOrContext: 'Global Tech Industry & Innovation Hubs',
      description: 'Deploying high-impact distributed applications, mentoring next-generation developers, contributing to open-source software, and merging AI capabilities with ultra-responsive web experiences.',
      skillsAcquired: ['Distributed Cloud Architecture', 'System Scale at Millions of Users', 'Engineering Leadership', 'Novel AI-Driven UX'],
      keyDeliverables: ['High-reliability cloud architectures', 'Open-source contributions', 'Industry impact'],
      icon: 'compass',
      status: 'PROJECTED',
      telemetryCode: 'NODE_HORIZON_FUTURE'
    }
  ];

  private readonly journeyStages: JourneyStage[] = [
    {
      id: 'journey-01',
      levelIndex: 1,
      stageName: 'THE ASYNC RACE CONDITION',
      theme: 'State Synchronization & Reactivity',
      bugOrObstacle: 'Encountered erratic UI states where data from previous network queries overwrote newer user selections due to variable network latency.',
      technicalContext: 'Early React/Angular project with concurrent API fetches and rapid user tab clicking.',
      debuggingStrategy: [
        'Reproduced scenario using network throttling in Chrome DevTools.',
        'Inspected console network waterfall to verify out-of-order response resolutions.',
        'Refactored naive promise handlers into RxJS switchMap operators to automatically cancel in-flight stale requests.'
      ],
      breakthroughInsight: 'Asynchronous calls are not deterministic in arrival order; UI state must be modeled as an intentional reactive stream rather than isolated mutable flags.',
      lessonLearned: 'Mastered RxJS declarative stream composition and request cancellation patterns.',
      skillsIncreased: [
        { skill: 'RxJS & Reactivity', gain: '+30%' },
        { skill: 'Network Debugging', gain: '+25%' }
      ],
      resilienceRating: '+25% Architectural Robustness'
    },
    {
      id: 'journey-02',
      levelIndex: 2,
      stageName: 'THE MEMORY LEAK INVASION',
      theme: 'Component Lifecycles & Browser Garbage Collection',
      bugOrObstacle: 'The application became progressively sluggish over extended usage, with browser memory consumption steadily ballooning until tab crashes occurred.',
      technicalContext: 'Long-running Single Page Application with dynamic component creation and unmanaged event listeners.',
      debuggingStrategy: [
        'Captured heap snapshots before and after component destructions using Memory Profiler.',
        'Identified detached DOM trees retained by active observable subscriptions and window resize listeners.',
        'Implemented strict unsubscribe patterns (takeUntilDestroyed, Subject unsubscriptions, and ngOnDestroy cleanup routines).'
      ],
      breakthroughInsight: 'A component is never truly destroyed if another living object holds a reference to its callback.',
      lessonLearned: 'Always pair every subscription, timer, and event listener with an explicit lifecycle teardown contract.',
      skillsIncreased: [
        { skill: 'Memory Profiling', gain: '+40%' },
        { skill: 'Lifecycle Governance', gain: '+35%' }
      ],
      resilienceRating: '+35% Runtime Reliability'
    },
    {
      id: 'journey-03',
      levelIndex: 3,
      stageName: 'THE DATABASE BOTTLENECK',
      theme: 'Data Scale, Indexing & Query Profiling',
      bugOrObstacle: 'As the database table reached thousands of records, catalog queries jumped from 30ms to over 2.5 seconds, locking user interface responsiveness.',
      technicalContext: 'Relational MySQL & MongoDB collections under complex multi-table joins without proper composite indexes.',
      debuggingStrategy: [
        'Executed EXPLAIN ANALYZE on slow query logs to observe table scans versus index lookups.',
        'Discovered full collection scans occurring on un-indexed foreign key and timestamp columns.',
        'Designed composite B-Tree indexes and restructured schemas to minimize costly nested joins.'
      ],
      breakthroughInsight: 'Clean code at the application tier cannot compensate for unindexed, unoptimized data layer queries.',
      lessonLearned: 'Query planning and indexing must be considered from day one, not treated as an afterthought.',
      skillsIncreased: [
        { skill: 'Database Indexing & Tuning', gain: '+45%' },
        { skill: 'Data Modeling', gain: '+30%' }
      ],
      resilienceRating: '+40% System Scalability'
    },
    {
      id: 'journey-04',
      levelIndex: 4,
      stageName: 'THE 3D FRAME-DROP CONUNDRUM',
      theme: 'WebGL GPU Pipeline & Rendering Optimization',
      bugOrObstacle: 'Integrating 3D elements initially caused frame rates to plunge below 25 FPS on mobile and low-powered laptops, accompanied by high device temperatures.',
      technicalContext: 'Three.js 3D scene containing un-instanced meshes, redundant light sources, and unconstrained render loops.',
      debuggingStrategy: [
        'Profiled draw calls and triangle counts using Spector.js and Chrome Canvas tools.',
        'Converted hundreds of individual geometries into InstancedMesh and merged buffer geometries.',
        'Capped pixel ratio to 1.5-2.0, baked static ambient shadows, and paused requestAnimationFrame whenever the canvas was outside the viewport.'
      ],
      breakthroughInsight: 'Visual immersion is worthless if it compromises accessibility and device performance.',
      lessonLearned: '3D development demands ruthless optimization: minimize draw calls, dispose unneeded textures, and respect the user’s hardware.',
      skillsIncreased: [
        { skill: 'Three.js & WebGL Performance', gain: '+50%' },
        { skill: 'GPU Diagnostics', gain: '+40%' }
      ],
      resilienceRating: '+50% Cross-Device Engineering'
    }
  ];

  getProfile(): Profile {
    return this.profileData;
  }

  getSkills(): Skill[] {
    return this.skillsData;
  }

  getSkillsByCategory(category: string): Skill[] {
    if (category === 'all') return this.skillsData;
    return this.skillsData.filter(s => s.category === category);
  }

  getMissions(): Mission[] {
    return this.missionsData;
  }

  getMissionById(id: string): Mission | undefined {
    return this.missionsData.find(m => m.id === id);
  }

  getTimeline(): TimelineEvent[] {
    return this.timelineData;
  }

  getJourneyStages(): JourneyStage[] {
    return this.journeyStages;
  }
}

import { Injectable, inject, signal } from '@angular/core';
import { AIMessage, AIQuickPrompt, AIKnowledgeItem } from '../models/ai.model';
import { AudioService } from './audio.service';
import { AchievementService } from './achievement.service';

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService {
  private readonly audioService = inject(AudioService);
  private readonly achievementService = inject(AchievementService);

  readonly isThinking = signal<boolean>(false);
  readonly currentStreamingText = signal<string>('');

  readonly quickPrompts: AIQuickPrompt[] = [
    {
      id: 'who-is-oussama',
      label: 'Who is Oussama?',
      query: 'Who is Oussama Hajri and what is his background?',
      category: 'identity'
    },
    {
      id: 'tech-stack',
      label: 'What technologies does he use?',
      query: 'What technologies, frameworks, and languages does Oussama specialize in?',
      category: 'skills'
    },
    {
      id: 'projects-built',
      label: 'What projects has he built?',
      query: 'What missions and full-stack projects has he built?',
      category: 'projects'
    },
    {
      id: 'why-hire',
      label: 'Why should I hire him?',
      query: 'Why should a company or recruiter hire Oussama?',
      category: 'recruiter'
    },
    {
      id: 'strongest-skills',
      label: 'What are his strongest skills?',
      query: 'What are his strongest technical and architectural skills?',
      category: 'skills'
    },
    {
      id: 'what-makes-different',
      label: 'What makes him different?',
      query: 'What makes Oussama different from other junior full-stack developers?',
      category: 'recruiter'
    },
    {
      id: 'education-goals',
      label: 'Education & Future Goals',
      query: 'What is his academic education and future engineering goals?',
      category: 'vision'
    }
  ];

  private readonly knowledgeBase: AIKnowledgeItem[] = [
    {
      id: 'identity-overview',
      triggers: ['who', 'oussama', 'about', 'background', 'intro', 'profile', 'biography'],
      response: `I am **Oussama Hajri**, an Information Technology student and aspiring Full-Stack Developer.

I combine deep architectural curiosity with practical engineering execution. My core focus lies in building high-performance modern web applications (Angular, React, Node.js, PHP/Laravel, and relational/document databases) while exploring immersive 3D web interfaces (Three.js/WebGL).

Currently targeting graduation capstone (PFE 2026) and actively exploring junior software engineer, full-stack, and frontend engineering roles.`,
      codeSnippet: `// Identity Core
const oussama = {
  name: "Oussama Hajri",
  specialization: "Information Technology",
  role: "Aspiring Full-Stack Developer",
  status: "Available for PFE & Junior Roles",
  location: "Tunisia (Open to Remote / Relocation)"
};`,
      relatedCategory: 'identity',
      suggestedFollowups: [
        'What technologies does he use?',
        'What projects has he built?',
        'Why should I hire him?'
      ]
    },
    {
      id: 'technologies',
      triggers: ['tech', 'technology', 'stack', 'languages', 'frameworks', 'tools', 'react', 'angular', 'node', 'database'],
      response: `Oussama's technical arsenal spans across the full software lifecycle:

• **Frontend Engineering:** Angular (Signals, RxJS, Standalone Architecture), React (Hooks, Context), TypeScript, Modern JavaScript (ES6+), HTML5/SCSS.
• **Backend & APIs:** Node.js, Express.js, PHP, Laravel, RESTful API architecture, JWT authentication, middleware patterns.
• **Data & Persistence:** MySQL (relational normalization, complex joins, index tuning), MongoDB (Mongoose, document schemas, aggregations).
• **Creative 3D & Graphics:** Three.js, WebGL shaders, HTML5 Canvas 2D.
• **Tools & Workflow:** Git, Docker fundamentals, Postman, Vite, Angular CLI, Webpack.`,
      codeSnippet: `interface DeveloperStack {
  frontend: ['Angular', 'React', 'TypeScript', 'SCSS', 'Three.js'];
  backend: ['Node.js', 'Express', 'PHP', 'Laravel'];
  database: ['MySQL', 'MongoDB'];
  protocols: ['REST', 'JWT', 'WebSockets', 'WebGL'];
}`,
      relatedCategory: 'skills',
      suggestedFollowups: [
        'What are his strongest skills?',
        'What projects has he built?'
      ]
    },
    {
      id: 'projects',
      triggers: ['project', 'projects', 'built', 'portfolio', 'mission', 'work', 'library', 'residence', 'heritage', 'studio'],
      response: `Oussama has architected 5 distinct tactical missions:

1. **Library Management System (MERN Stack):** Complete enterprise cataloging system with role-based auth, automated lending calculations, and sub-70ms search index.
2. **E-Learning Platform (Angular + TypeScript):** High-speed interactive learning portal with RxJS reactive state, modular curriculum streaming, and real-time quizzes.
3. **University Residence Management (Angular + PHP/Laravel + MySQL):** Comprehensive dorm logistics, room allocation visualizer, and maintenance tracking.
4. **Smart Heritage Immersive Room (Three.js + AI Docent):** Interactive 3D museum preservation room with 60 FPS WebGL rendering and conversational docent.
5. **Hajri Studio (HTML5 Canvas + Web Workers):** Zero-latency browser photo manipulation studio with algorithmic matrix filters.`,
      codeSnippet: `const missions = [
  { code: "MISSION 01", name: "Library Management", stack: "React + Node + Mongo" },
  { code: "MISSION 02", name: "E-Learning Platform", stack: "Angular + RxJS" },
  { code: "MISSION 03", name: "Residence Management", stack: "Angular + Laravel + MySQL" },
  { code: "MISSION 04", name: "Smart Heritage 3D", stack: "Three.js + WebGL + AI" },
  { code: "MISSION 05", name: "Hajri Studio", stack: "Canvas 2D + Web Workers" }
];`,
      relatedCategory: 'projects',
      suggestedFollowups: [
        'Why should I hire him?',
        'What makes him different?'
      ]
    },
    {
      id: 'why-hire',
      triggers: ['hire', 'why', 'value', 'benefit', 'recruit', 'recruiter', 'strengths', 'fit'],
      response: `Here is why Oussama Hajri is a high-conviction hire:

1. **Rare Bridge Between Engineering & Visual Polish:** Many junior developers only know basic CRUD. Oussama engineers resilient backends AND creates fluid, accessible, creative 3D and 2D interfaces.
2. **Growth Mindset & Debugging Tenacity:** He does not panic when bugs occur. His journey demonstrates analytical problem-solving: capturing memory heap snapshots, diagnosing async race conditions with RxJS, and indexing relational tables.
3. **Enterprise Framework Competency:** Genuine hands-on proficiency with Angular 18+ (Signals, Standalone) and React, writing clean TypeScript instead of brittle code.
4. **Fast Learner & Adaptable:** Thrives in fast-paced collaborative sprints (hackathons, team internships) with high self-direction.`,
      codeSnippet: `function evaluateCandidate(candidate: OussamaHajri): HireVerdict {
  return {
    technicalFoundation: "Strong (Full-Stack + TypeScript)",
    problemSolving: "Methodical (Root-cause debugging)",
    creativeDrive: "Exceptional (3D WebGL + UX)",
    readiness: "Immediate impact on frontend/full-stack teams"
  };
}`,
      relatedCategory: 'recruiter',
      suggestedFollowups: [
        'What makes him different?',
        'How to contact him?'
      ]
    },
    {
      id: 'differentiators',
      triggers: ['different', 'unique', 'standout', 'special', 'edge'],
      response: `What sets Oussama apart:

• **The Digital Identity Experience:** Look at this very portfolio! Instead of taking an off-the-shelf template, Oussama engineered a custom 3D universe with Three.js, Web Audio synthesis, interactive terminal, and modular Angular architecture.
• **Systems Thinking:** He cares about the full pipeline: database indexes, REST contracts, client bundle budgets, and memory leak prevention.
• **Transparency & Real Growth:** Instead of presenting a curated illusion of perfection, he documents real engineering bugs and lessons in "The Journey" module.`,
      relatedCategory: 'recruiter',
      suggestedFollowups: [
        'What are his strongest skills?',
        'Education & Future Goals'
      ]
    },
    {
      id: 'education-goals',
      triggers: ['education', 'degree', 'university', 'pfe', 'school', 'study', 'goals', 'future', 'career'],
      response: `• **Education:** Completing an Information Technology degree with an emphasis on software engineering, distributed systems, and modern web architectures.
• **Current Milestone:** Preparing for his PFE (Final Year Graduation Project) in 2026, aiming to architect an innovative enterprise software solution.
• **Career Vision:** Growing into a Senior Full-Stack Engineer and Software Architect, pushing the frontiers of WebGL/3D interfaces and intelligent web applications.`,
      relatedCategory: 'vision',
      suggestedFollowups: [
        'Why should I hire him?',
        'How to contact him?'
      ]
    },
    {
      id: 'contact-info',
      triggers: ['contact', 'email', 'reach', 'linkedin', 'github', 'message', 'talk', 'call'],
      response: `You can connect with Oussama directly:

• **Direct Email:** [hajrioussama41@gmail.com](mailto:hajrioussama41@gmail.com)
• **LinkedIn:** [linkedin.com/in/oussama-hajri](https://linkedin.com/in/oussama-hajri)
• **GitHub:** [github.com/oussama-hajri](https://github.com/oussama-hajri)

He responds promptly to recruiters, collaboration inquiries, and engineering opportunities!`,
      relatedCategory: 'identity',
      suggestedFollowups: [
        'Who is Oussama?',
        'What projects has he built?'
      ]
    }
  ];

  readonly messages = signal<AIMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      content: `Greetings. I am **AI // OUSSAMA**, the neural intelligence node of Oussama Hajri's digital identity.

I have direct access to Oussama's technical skillset, academic timeline, project architectures, and engineering philosophy. Ask me any question below or select a suggested query.`,
      timestamp: 'SYSTEM ONLINE',
      suggestedFollowups: [
        'Who is Oussama?',
        'What technologies does he use?',
        'What projects has he built?',
        'Why should I hire him?'
      ]
    }
  ]);

  askQuestion(userPrompt: string): void {
    if (!userPrompt.trim() || this.isThinking()) return;

    this.achievementService.unlock('ai_conversationalist');
    this.audioService.playClick();

    const userMsg: AIMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      content: userPrompt,
      timestamp: new Date().toLocaleTimeString()
    };

    this.messages.update(list => [...list, userMsg]);
    this.isThinking.set(true);

    const match = this.matchQuery(userPrompt);

    // Simulate cyber streaming response
    setTimeout(() => {
      this.streamAssistantResponse(match);
    }, 450);
  }

  private matchQuery(query: string): AIKnowledgeItem {
    const cleanQuery = query.toLowerCase();

    let bestScore = 0;
    let bestMatch = this.knowledgeBase[0];

    for (const item of this.knowledgeBase) {
      let score = 0;
      for (const trigger of item.triggers) {
        if (cleanQuery.includes(trigger)) {
          score += 2;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }

    if (bestScore === 0) {
      return {
        id: 'fallback',
        triggers: [],
        response: `I analyzed your query: "${query}".

While my local knowledge model is calibrated on Oussama's core portfolio data, here is what is most relevant: Oussama Hajri is an Information Technology student and Full-Stack Developer specializing in Angular, React, Node.js, and Three.js.

Feel free to ask about his specific **technologies**, **missions/projects**, **education**, or **contact details**!`,
        relatedCategory: 'general',
        suggestedFollowups: [
          'What technologies does he use?',
          'What projects has he built?',
          'Why should I hire him?',
          'How to contact him?'
        ]
      };
    }

    return bestMatch;
  }

  private streamAssistantResponse(match: AIKnowledgeItem): void {
    const assistantMsgId = 'assistant-' + Date.now();
    const fullText = match.response;

    const initialMsg: AIMessage = {
      id: assistantMsgId,
      sender: 'assistant',
      content: '',
      codeSnippet: match.codeSnippet,
      timestamp: new Date().toLocaleTimeString(),
      streaming: true,
      suggestedFollowups: match.suggestedFollowups,
      tags: match.suggestedFollowups
    };

    this.messages.update(list => [...list, initialMsg]);
    this.isThinking.set(false);

    let charIndex = 0;
    const chunkSize = 4;
    const interval = setInterval(() => {
      charIndex += chunkSize;
      const partial = fullText.slice(0, charIndex);

      this.audioService.playTerminalKey();

      this.messages.update(list =>
        list.map(m => m.id === assistantMsgId ? { ...m, content: partial } : m)
      );

      if (charIndex >= fullText.length) {
        clearInterval(interval);
        this.messages.update(list =>
          list.map(m => m.id === assistantMsgId ? { ...m, content: fullText, streaming: false } : m)
        );
      }
    }, 18);
  }

  clearChat(): void {
    this.messages.set([
      {
        id: 'init-reset',
        sender: 'assistant',
        content: 'AI // OUSSAMA memory buffer cleared. Ready for your next query.',
        timestamp: 'RESET COMPLETE'
      }
    ]);
  }
}

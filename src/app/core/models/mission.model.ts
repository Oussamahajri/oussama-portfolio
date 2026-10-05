export type MissionStatus = 'COMPLETED' | 'IN_PRODUCTION' | 'ACTIVE_RESEARCH' | 'CLASSIFIED';

export interface MissionArchitectureLayer {
  layer: string;
  technology: string;
  role: string;
}

export interface Mission {
  id: string;
  code: string; // e.g. "MISSION 01"
  codename: string; // e.g. "OPERATION BIBLIOTHECA"
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Frontend' | 'Enterprise Systems' | 'AI & 3D Interactive';
  status: MissionStatus;
  statusBadge: string;
  dateRange: string;
  clearance: 'ALPHA' | 'BETA' | 'GAMMA' | 'OMEGA';
  technologies: string[];
  primaryTech: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: MissionArchitectureLayer[];
  features: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl?: string;
  demoUrl?: string;
  tacticalLog: string[];
  visualAccent: string; // Hex color or CSS theme accent
}

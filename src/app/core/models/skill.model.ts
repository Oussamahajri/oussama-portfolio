export type SkillCategory = 'frontend' | 'backend' | 'database' | 'architecture' | 'tools';

export interface Skill {
  id: string;
  name: string;
  level: number; // 1 to 10 scale (e.g. Level 08)
  levelDisplay: string; // e.g. "LEVEL 08"
  category: SkillCategory;
  categoryLabel: string;
  description: string;
  experienceYears: string;
  proficiencyRank: 'NOVICE' | 'PRACTITIONER' | 'SPECIALIST' | 'MASTER';
  relatedProjects: string[]; // names of projects/missions
  highlightTags: string[];
  stats: {
    speed: number;
    depth: number;
    architecture: number;
  };
}

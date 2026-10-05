import { Injectable, inject, signal, computed } from '@angular/core';
import { Achievement } from '../models/achievement.model';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  private readonly audioService = inject(AudioService);

  private readonly initialAchievements: Achievement[] = [
    {
      id: 'first_contact',
      code: 'ACH-01',
      title: 'FIRST CONTACT',
      description: 'Entered the HAJRI Digital Identity simulation and initialized systems.',
      rarity: 'COMMON',
      xp: 100,
      icon: 'zap',
      unlocked: false,
      hint: 'Press START on the initialization screen.'
    },
    {
      id: 'orbital_explorer',
      code: 'ACH-02',
      title: 'ORBITAL EXPLORER',
      description: 'Navigated between at least 3 distinct spatial modules in the digital universe.',
      rarity: 'COMMON',
      xp: 150,
      icon: 'compass',
      unlocked: false,
      hint: 'Explore the 3D world nodes (Skills, Missions, Timeline, etc.).'
    },
    {
      id: 'mission_inspector',
      code: 'ACH-03',
      title: 'TACTICAL ANALYST',
      description: 'Inspected a project mission dossier and reviewed technical architecture.',
      rarity: 'RARE',
      xp: 200,
      icon: 'file-text',
      unlocked: false,
      hint: 'Click on any project mission to read its tactical briefing.'
    },
    {
      id: 'ai_conversationalist',
      code: 'ACH-04',
      title: 'NEURAL DIALOGUE',
      description: 'Initiated a communication sequence with the AI // OUSSAMA assistant.',
      rarity: 'RARE',
      xp: 250,
      icon: 'cpu',
      unlocked: false,
      hint: 'Ask AI Oussama a question or select a prompt chip.'
    },
    {
      id: 'recruiter_clearance',
      code: 'ACH-05',
      title: 'EXECUTIVE CLEARANCE',
      description: 'Activated Recruiter Mode for high-efficiency professional inspection.',
      rarity: 'RARE',
      xp: 200,
      icon: 'briefcase',
      unlocked: false,
      hint: 'Click "RECRUITER MODE" in the top HUD or press [R].'
    },
    {
      id: 'terminal_hacker',
      code: 'ACH-06',
      title: 'COMMAND LINE OPERATOR',
      description: 'Discovered and opened the secret retro-cyber terminal console.',
      rarity: 'EPIC',
      xp: 350,
      icon: 'terminal',
      unlocked: false,
      hint: 'Press [~] or click the terminal icon in the HUD.',
      isSecret: true
    },
    {
      id: 'curiosity_overdrive',
      code: 'ACH-07',
      title: 'CURIOSITY OVERDRIVE',
      description: 'Overcharged the central digital identity core with rapid kinetic pulses.',
      rarity: 'EPIC',
      xp: 400,
      icon: 'activity',
      unlocked: false,
      hint: 'Rapidly click the central 3D core or HUD logo 5 times.',
      isSecret: true
    },
    {
      id: 'overclock_protocol',
      code: 'ACH-08',
      title: 'OVERCLOCK PROTOCOL',
      description: 'Executed the legendary Konami code sequence and unlocked matrix telemetry.',
      rarity: 'LEGENDARY',
      xp: 500,
      icon: 'shield',
      unlocked: false,
      hint: 'Enter ↑ ↑ ↓ ↓ ← → ← → B A on your keyboard.',
      isSecret: true
    },
    {
      id: 'time_traveler',
      code: 'ACH-09',
      title: 'FUTURE HORIZON',
      description: 'Accessed the classified 2030 Engineering Roadmap vision.',
      rarity: 'SECRET',
      xp: 300,
      icon: 'globe',
      unlocked: false,
      hint: 'Type "future" in the terminal or press [F].',
      isSecret: true
    }
  ];

  readonly achievements = signal<Achievement[]>(this.loadPersistedAchievements());
  readonly recentUnlock = signal<Achievement | null>(null);

  readonly unlockedCount = computed(() => {
    return this.achievements().filter(a => a.unlocked).length;
  });

  readonly totalCount = computed(() => {
    return this.achievements().length;
  });

  readonly totalXp = computed(() => {
    return this.achievements()
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + a.xp, 0);
  });

  private visitedNodes = new Set<string>();

  private loadPersistedAchievements(): Achievement[] {
    if (typeof window === 'undefined') return this.initialAchievements;
    try {
      const saved = localStorage.getItem('hajri_achievements');
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, boolean>;
        return this.initialAchievements.map(ach => ({
          ...ach,
          unlocked: !!parsed[ach.id],
          unlockedAt: parsed[ach.id] ? 'Archived' : undefined
        }));
      }
    } catch {
      // LocalStorage access fallback
    }
    return this.initialAchievements;
  }

  private persistAchievements(): void {
    if (typeof window === 'undefined') return;
    try {
      const state: Record<string, boolean> = {};
      this.achievements().forEach(a => {
        if (a.unlocked) state[a.id] = true;
      });
      localStorage.setItem('hajri_achievements', JSON.stringify(state));
    } catch {
      // Fallback
    }
  }

  unlock(achievementId: string): void {
    const list = this.achievements();
    const target = list.find(a => a.id === achievementId);
    if (!target || target.unlocked) return;

    const updated = list.map(a => {
      if (a.id === achievementId) {
        return {
          ...a,
          unlocked: true,
          unlockedAt: new Date().toLocaleTimeString()
        };
      }
      return a;
    });

    this.achievements.set(updated);
    this.persistAchievements();

    const unlockedAch = updated.find(a => a.id === achievementId) || null;
    this.recentUnlock.set(unlockedAch);
    this.audioService.playAchievementUnlock();

    // Auto-dismiss toast after 4 seconds
    setTimeout(() => {
      if (this.recentUnlock()?.id === achievementId) {
        this.recentUnlock.set(null);
      }
    }, 4500);
  }

  dismissToast(): void {
    this.recentUnlock.set(null);
  }

  recordNodeVisit(nodeId: string): void {
    this.visitedNodes.add(nodeId);
    if (this.visitedNodes.size >= 3) {
      this.unlock('orbital_explorer');
    }
  }

  resetAll(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hajri_achievements');
    }
    this.achievements.set(this.initialAchievements);
  }
}

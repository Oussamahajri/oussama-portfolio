import { Injectable, inject, signal, computed } from '@angular/core';
import { AchievementService } from './achievement.service';
import { AudioService } from './audio.service';

export type PortfolioView =
  | 'entry'
  | 'world'
  | 'identity'
  | 'skills'
  | 'missions'
  | 'timeline'
  | 'journey'
  | 'ai'
  | 'recruiter'
  | 'developer'
  | 'contact'
  | 'future';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly achievementService = inject(AchievementService);
  private readonly audioService = inject(AudioService);

  readonly currentView = signal<PortfolioView>('entry');
  readonly selectedMissionId = signal<string | null>(null);

  readonly recruiterMode = signal<boolean>(false);
  readonly developerMode = signal<boolean>(false);
  readonly terminalOpen = signal<boolean>(false);
  readonly overclockMode = signal<boolean>(false);
  readonly reducedMotion = signal<boolean>(false);

  // Easter Egg 3: Core Click counter
  private coreClicks = 0;
  private lastCoreClickTime = 0;

  // Easter Egg 1: Konami Code tracker: ↑ ↑ ↓ ↓ ← → ← → b a
  private readonly konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  private currentKonamiIndex = 0;

  readonly isModalActive = computed(() => {
    const v = this.currentView();
    return (
      v === 'identity' ||
      v === 'skills' ||
      v === 'missions' ||
      v === 'timeline' ||
      v === 'journey' ||
      v === 'ai' ||
      v === 'contact' ||
      v === 'future'
    );
  });

  constructor() {
    this.initKeyboardListeners();
    this.printConsoleEasterEgg();
  }

  startExperience(): void {
    this.currentView.set('world');
    this.achievementService.unlock('first_contact');
    this.audioService.playStartupChime();
  }

  navigateTo(view: PortfolioView): void {
    if (this.currentView() === 'entry') return;

    this.currentView.set(view);
    this.audioService.playClick();

    if (view !== 'world' && view !== 'entry') {
      this.achievementService.recordNodeVisit(view);
    }

    if (view === 'recruiter') {
      this.recruiterMode.set(true);
      this.achievementService.unlock('recruiter_clearance');
    }

    if (view === 'future') {
      this.achievementService.unlock('time_traveler');
    }
  }

  closeModal(): void {
    if (this.recruiterMode()) {
      this.recruiterMode.set(false);
    }
    if (this.developerMode()) {
      this.developerMode.set(false);
    }
    this.selectedMissionId.set(null);
    this.currentView.set('world');
    this.audioService.playClick();
  }

  openMissionBriefing(missionId: string): void {
    this.selectedMissionId.set(missionId);
    this.currentView.set('missions');
    this.achievementService.unlock('mission_inspector');
    this.audioService.playModalOpen();
  }

  closeMissionBriefing(): void {
    this.selectedMissionId.set(null);
  }

  toggleRecruiterMode(): void {
    const next = !this.recruiterMode();
    this.recruiterMode.set(next);
    if (next) {
      this.developerMode.set(false);
      this.currentView.set('recruiter');
      this.achievementService.unlock('recruiter_clearance');
      this.audioService.playModalOpen();
    } else {
      this.currentView.set('world');
      this.audioService.playClick();
    }
  }

  toggleDeveloperMode(): void {
    const next = !this.developerMode();
    this.developerMode.set(next);
    if (next) {
      this.recruiterMode.set(false);
      this.currentView.set('developer');
      this.audioService.playModalOpen();
    } else {
      this.currentView.set('world');
      this.audioService.playClick();
    }
  }

  toggleTerminal(): void {
    const next = !this.terminalOpen();
    this.terminalOpen.set(next);
    this.audioService.playClick();
    if (next) {
      this.achievementService.unlock('terminal_hacker');
    }
  }

  toggleReducedMotion(): void {
    this.reducedMotion.set(!this.reducedMotion());
    this.audioService.playClick();
  }

  registerCoreClick(): void {
    const now = Date.now();
    if (now - this.lastCoreClickTime < 800) {
      this.coreClicks++;
    } else {
      this.coreClicks = 1;
    }
    this.lastCoreClickTime = now;
    this.audioService.playClick();

    if (this.coreClicks >= 5) {
      this.achievementService.unlock('curiosity_overdrive');
      this.coreClicks = 0;
    }
  }

  triggerKonamiUnlock(): void {
    this.overclockMode.set(!this.overclockMode());
    this.achievementService.unlock('overclock_protocol');
    this.audioService.playAchievementUnlock();
  }

  private initKeyboardListeners(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Don't intercept typing inside inputs or textareas
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      // Check Konami Code
      const key = e.key;
      if (key.toLowerCase() === this.konamiSequence[this.currentKonamiIndex].toLowerCase() ||
          key === this.konamiSequence[this.currentKonamiIndex]) {
        this.currentKonamiIndex++;
        if (this.currentKonamiIndex === this.konamiSequence.length) {
          this.triggerKonamiUnlock();
          this.currentKonamiIndex = 0;
        }
      } else {
        this.currentKonamiIndex = 0;
      }

      // Quick keyboard controls
      if (e.key === 'Escape') {
        if (this.terminalOpen()) {
          this.terminalOpen.set(false);
        } else if (this.selectedMissionId()) {
          this.closeMissionBriefing();
        } else if (this.currentView() !== 'world' && this.currentView() !== 'entry') {
          this.closeModal();
        }
      } else if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        this.toggleTerminal();
      } else if (e.key.toLowerCase() === 'r' && (e.ctrlKey || e.altKey || !e.shiftKey)) {
        if (!e.ctrlKey && !e.metaKey) {
          this.toggleRecruiterMode();
        }
      } else if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey) {
        this.toggleDeveloperMode();
      } else if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.metaKey) {
        this.audioService.toggleMute();
      } else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
        this.navigateTo('future');
      } else if (this.currentView() !== 'entry') {
        // Number keys 1-7 for navigation
        switch (e.key) {
          case '1': this.navigateTo('identity'); break;
          case '2': this.navigateTo('skills'); break;
          case '3': this.navigateTo('missions'); break;
          case '4': this.navigateTo('timeline'); break;
          case '5': this.navigateTo('journey'); break;
          case '6': this.navigateTo('ai'); break;
          case '7': this.navigateTo('contact'); break;
        }
      }
    });
  }

  private printConsoleEasterEgg(): void {
    if (typeof window === 'undefined') return;
    setTimeout(() => {
      console.log(
        '%c⚡ HAJRI // DIGITAL IDENTITY KERNEL v4.18.2 ⚡',
        'color: #00f0ff; background: #030712; font-size: 16px; font-weight: bold; padding: 10px; border-left: 4px solid #00f0ff;'
      );
      console.log(
        '%cLooking under the hood? Oussama Hajri is an IT Student & Full-Stack Developer.\nStack: Angular 21, TypeScript, Three.js, Web Audio, SCSS, Node.js, PHP/Laravel.\n\nType window.__SECRET_OVERCLOCK() or press ` for terminal console.',
        'color: #8ba2b8; font-family: monospace; font-size: 12px;'
      );

      // Expose secret function to window for curious developers
      (window as unknown as { __SECRET_OVERCLOCK: () => void }).__SECRET_OVERCLOCK = () => {
        this.triggerKonamiUnlock();
        return 'OVERCLOCK ENGAGED. Achievement unlocked!';
      };
    }, 1500);
  }
}

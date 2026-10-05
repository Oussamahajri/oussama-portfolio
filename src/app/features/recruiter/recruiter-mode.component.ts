import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';
import { AchievementService } from '../../core/services/achievement.service';

type RecruiterTab = 'overview' | 'skills' | 'missions' | 'timeline' | 'contact' | 'cv';

@Component({
  selector: 'app-recruiter-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recruiter-mode.component.html',
  styleUrl: './recruiter-mode.component.scss'
})
export class RecruiterModeComponent {
  readonly dataService = inject(PortfolioDataService);
  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);
  readonly achievementService = inject(AchievementService);

  readonly profile = this.dataService.getProfile();
  readonly skills = this.dataService.getSkills();
  readonly missions = this.dataService.getMissions();
  readonly timeline = this.dataService.getTimeline();

  readonly activeTab = signal<RecruiterTab>('overview');

  setTab(tab: RecruiterTab): void {
    this.activeTab.set(tab);
    this.audioService.playClick();
  }

  onExitRecruiter(): void {
    this.stateService.toggleRecruiterMode();
  }

  triggerPrintCv(): void {
    this.audioService.playClick();
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  openMission(id: string): void {
    this.stateService.openMissionBriefing(id);
  }
}

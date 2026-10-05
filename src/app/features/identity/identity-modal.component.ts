import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';
import { AchievementService } from '../../core/services/achievement.service';

@Component({
  selector: 'app-identity-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './identity-modal.component.html',
  styleUrl: './identity-modal.component.scss'
})
export class IdentityModalComponent {
  readonly dataService = inject(PortfolioDataService);
  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);
  readonly achievementService = inject(AchievementService);

  readonly profile = this.dataService.getProfile();

  onClose(): void {
    this.stateService.closeModal();
  }

  jumpTo(view: 'missions' | 'skills' | 'ai' | 'contact'): void {
    this.stateService.navigateTo(view);
  }
}

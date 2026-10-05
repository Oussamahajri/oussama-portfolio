import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchievementService } from '../../../core/services/achievement.service';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-achievement-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievement-toast.component.html',
  styleUrl: './achievement-toast.component.scss'
})
export class AchievementToastComponent {
  readonly achievementService = inject(AchievementService);
  readonly audioService = inject(AudioService);

  onDismiss(): void {
    this.audioService.playClick();
    this.achievementService.dismissToast();
  }
}

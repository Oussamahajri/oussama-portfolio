import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService, PortfolioView } from '../../../core/services/state.service';
import { AudioService } from '../../../core/services/audio.service';
import { AchievementService } from '../../../core/services/achievement.service';

interface NavNodeItem {
  id: PortfolioView;
  key: string;
  code: string;
  label: string;
}

@Component({
  selector: 'app-hud-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hud-navigation.component.html',
  styleUrl: './hud-navigation.component.scss'
})
export class HudNavigationComponent {
  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);
  readonly achievementService = inject(AchievementService);

  readonly navItems: NavNodeItem[] = [
    { id: 'world', key: '0', code: 'ORBIT', label: 'WORLD' },
    { id: 'identity', key: '1', code: '01', label: 'IDENTITY' },
    { id: 'skills', key: '2', code: '02', label: 'SKILLS' },
    { id: 'missions', key: '3', code: '03', label: 'MISSIONS' },
    { id: 'timeline', key: '4', code: '04', label: 'TIMELINE' },
    { id: 'journey', key: '5', code: '05', label: 'JOURNEY' },
    { id: 'ai', key: '6', code: '06', label: 'AI // OUSSAMA' },
    { id: 'contact', key: '7', code: '07', label: 'CONNECT' }
  ];

  onNavigate(view: PortfolioView): void {
    if (view === 'world') {
      this.stateService.closeModal();
    } else {
      this.stateService.navigateTo(view);
    }
  }

  onLogoClick(): void {
    this.stateService.registerCoreClick();
  }
}

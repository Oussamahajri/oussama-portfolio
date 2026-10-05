import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';
import { JourneyStage } from '../../core/models/journey.model';

@Component({
  selector: 'app-journey-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journey-view.component.html',
  styleUrl: './journey-view.component.scss'
})
export class JourneyViewComponent {
  readonly dataService = inject(PortfolioDataService);
  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);

  readonly stages = this.dataService.getJourneyStages();
  readonly activeStage = signal<JourneyStage>(this.stages[0]);

  selectStage(st: JourneyStage): void {
    this.activeStage.set(st);
    this.audioService.playClick();
  }

  onClose(): void {
    this.stateService.closeModal();
  }
}

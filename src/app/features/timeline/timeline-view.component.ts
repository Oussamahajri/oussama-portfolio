import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';
import { TimelineEvent } from '../../core/models/timeline.model';

@Component({
  selector: 'app-timeline-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-view.component.html',
  styleUrl: './timeline-view.component.scss'
})
export class TimelineViewComponent {
  readonly dataService = inject(PortfolioDataService);
  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);

  readonly timeline = this.dataService.getTimeline();
  readonly selectedEvent = signal<TimelineEvent>(this.timeline[0]);

  selectEvent(event: TimelineEvent): void {
    this.selectedEvent.set(event);
    this.audioService.playClick();
  }

  onClose(): void {
    this.stateService.closeModal();
  }
}

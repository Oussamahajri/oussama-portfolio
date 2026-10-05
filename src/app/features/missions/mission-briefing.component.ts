import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mission } from '../../core/models/mission.model';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-mission-briefing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission-briefing.component.html',
  styleUrl: './mission-briefing.component.scss'
})
export class MissionBriefingComponent {
  @Input({ required: true }) mission!: Mission;

  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);

  onClose(): void {
    this.audioService.playClick();
    this.stateService.closeMissionBriefing();
  }
}

import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';
import { Mission } from '../../core/models/mission.model';
import { MissionBriefingComponent } from './mission-briefing.component';

@Component({
  selector: 'app-missions-view',
  standalone: true,
  imports: [CommonModule, MissionBriefingComponent],
  templateUrl: './missions-view.component.html',
  styleUrl: './missions-view.component.scss'
})
export class MissionsViewComponent {
  readonly dataService = inject(PortfolioDataService);
  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);

  readonly missions = this.dataService.getMissions();

  readonly activeMission = computed<Mission | undefined>(() => {
    const id = this.stateService.selectedMissionId();
    if (!id) return undefined;
    return this.dataService.getMissionById(id);
  });

  openBriefing(missionId: string): void {
    this.stateService.openMissionBriefing(missionId);
  }

  onClose(): void {
    this.stateService.closeModal();
  }
}

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-developer-mode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './developer-mode.component.html',
  styleUrl: './developer-mode.component.scss'
})
export class DeveloperModeComponent {
  readonly dataService = inject(PortfolioDataService);
  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);

  readonly selectedLayer = signal<string>('frontend');

  readonly layers = [
    { id: 'frontend', name: '01. PRESENTATION & REACTIVITY LAYER' },
    { id: 'backend', name: '02. API GATEWAY & MICROSERVICES' },
    { id: 'database', name: '03. DATA PERSISTENCE & CACHING' },
    { id: '3d-webgl', name: '04. WEBGL 3D & SHADER ENGINE' },
    { id: 'devops', name: '05. BUILD & TOOLCHAIN PIPELINE' }
  ];

  setLayer(layer: string): void {
    this.selectedLayer.set(layer);
    this.audioService.playClick();
  }

  onClose(): void {
    this.stateService.toggleDeveloperMode();
  }
}

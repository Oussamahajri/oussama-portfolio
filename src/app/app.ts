import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from './core/services/state.service';
import { ExperienceLoaderComponent } from './features/entry-experience/experience-loader.component';
import { World3dComponent } from './features/world/world-3d.component';
import { HudNavigationComponent } from './shared/components/hud-navigation/hud-navigation.component';
import { AchievementToastComponent } from './shared/components/achievement-toast/achievement-toast.component';
import { SecretTerminalComponent } from './shared/components/secret-terminal/secret-terminal.component';
import { IdentityModalComponent } from './features/identity/identity-modal.component';
import { SkillsViewComponent } from './features/skills/skills-view.component';
import { MissionsViewComponent } from './features/missions/missions-view.component';
import { TimelineViewComponent } from './features/timeline/timeline-view.component';
import { JourneyViewComponent } from './features/journey/journey-view.component';
import { AiConsoleComponent } from './features/ai-console/ai-console.component';
import { ContactModalComponent } from './features/contact/contact-modal.component';
import { FutureViewComponent } from './features/future/future-view.component';
import { RecruiterModeComponent } from './features/recruiter/recruiter-mode.component';
import { DeveloperModeComponent } from './features/developer/developer-mode.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ExperienceLoaderComponent,
    World3dComponent,
    HudNavigationComponent,
    AchievementToastComponent,
    SecretTerminalComponent,
    IdentityModalComponent,
    SkillsViewComponent,
    MissionsViewComponent,
    TimelineViewComponent,
    JourneyViewComponent,
    AiConsoleComponent,
    ContactModalComponent,
    FutureViewComponent,
    RecruiterModeComponent,
    DeveloperModeComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly stateService = inject(StateService);

  constructor() {
    // Synchronize overclock (matrix) mode to document body
    effect(() => {
      if (typeof document !== 'undefined') {
        if (this.stateService.overclockMode()) {
          document.body.classList.add('overclock-active');
        } else {
          document.body.classList.remove('overclock-active');
        }
      }
    });

    // Synchronize reduced motion preference to document body
    effect(() => {
      if (typeof document !== 'undefined') {
        if (this.stateService.reducedMotion()) {
          document.body.classList.add('reduced-motion');
        } else {
          document.body.classList.remove('reduced-motion');
        }
      }
    });
  }
}

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';
import { Skill, SkillCategory } from '../../core/models/skill.model';

@Component({
  selector: 'app-skills-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-view.component.html',
  styleUrl: './skills-view.component.scss'
})
export class SkillsViewComponent {
  readonly dataService = inject(PortfolioDataService);
  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);

  readonly allSkills = this.dataService.getSkills();
  readonly selectedCategory = signal<string>('all');
  readonly activeSkill = signal<Skill>(this.allSkills[0]);

  readonly categories = [
    { id: 'all', label: 'ALL MODULES' },
    { id: 'frontend', label: 'FRONTEND ENGINE' },
    { id: 'backend', label: 'BACKEND & APIS' },
    { id: 'database', label: 'DATA & STORAGE' },
    { id: 'tools', label: 'DEV ENVIRONMENT' }
  ];

  filterCategory(cat: string): void {
    this.selectedCategory.set(cat);
    this.audioService.playClick();
  }

  selectSkill(skill: Skill): void {
    this.activeSkill.set(skill);
    this.audioService.playClick();
  }

  getFilteredSkills(): Skill[] {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.allSkills;
    return this.allSkills.filter(s => s.category === cat);
  }

  onClose(): void {
    this.stateService.closeModal();
  }

  openRelatedMission(): void {
    this.stateService.navigateTo('missions');
  }
}

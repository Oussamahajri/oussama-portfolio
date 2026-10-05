import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss'
})
export class ContactModalComponent {
  readonly dataService = inject(PortfolioDataService);
  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);

  readonly profile = this.dataService.getProfile();
  readonly copied = signal<boolean>(false);

  readonly senderName = signal<string>('');
  readonly senderEmail = signal<string>('');
  readonly senderMessage = signal<string>('');
  readonly transmissionSuccess = signal<boolean>(false);

  copyEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.profile.email);
      this.copied.set(true);
      this.audioService.playClick();
      setTimeout(() => this.copied.set(false), 2500);
    }
  }

  transmitPing(): void {
    if (!this.senderEmail() || !this.senderMessage()) return;

    this.audioService.playClick();
    this.transmissionSuccess.set(true);

    // Provide mailto direct trigger
    const subject = encodeURIComponent(`Inquiry from ${this.senderName() || 'Recruiter'}`);
    const body = encodeURIComponent(this.senderMessage());
    window.open(`mailto:${this.profile.email}?subject=${subject}&body=${body}`, '_blank');
  }

  onClose(): void {
    this.stateService.closeModal();
  }
}

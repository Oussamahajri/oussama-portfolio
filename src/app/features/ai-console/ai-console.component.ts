import { Component, ElementRef, ViewChild, inject, signal, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiAssistantService } from '../../core/services/ai-assistant.service';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-ai-console',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-console.component.html',
  styleUrl: './ai-console.component.scss'
})
export class AiConsoleComponent implements AfterViewChecked {
  @ViewChild('chatBottom') private chatBottomRef!: ElementRef;
  @ViewChild('queryInput') private queryInputRef!: ElementRef<HTMLInputElement>;

  readonly aiService = inject(AiAssistantService);
  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);

  readonly userPrompt = signal<string>('');
  private needScroll = false;

  ngAfterViewChecked(): void {
    if (this.needScroll) {
      this.scrollToBottom();
      this.needScroll = false;
    }
  }

  submitPrompt(): void {
    const text = this.userPrompt().trim();
    if (!text) return;
    this.userPrompt.set('');
    this.aiService.askQuestion(text);
    this.needScroll = true;
  }

  usePromptChip(query: string): void {
    this.aiService.askQuestion(query);
    this.needScroll = true;
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.submitPrompt();
    }
  }

  clearChat(): void {
    this.aiService.clearChat();
    this.audioService.playClick();
  }

  onClose(): void {
    this.stateService.closeModal();
  }

  private scrollToBottom(): void {
    if (this.chatBottomRef?.nativeElement) {
      this.chatBottomRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

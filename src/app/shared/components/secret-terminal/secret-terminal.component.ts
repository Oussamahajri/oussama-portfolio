import { Component, ElementRef, ViewChild, inject, signal, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../../core/services/state.service';
import { AudioService } from '../../../core/services/audio.service';
import { AchievementService } from '../../../core/services/achievement.service';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'error' | 'success' | 'system';
}

@Component({
  selector: 'app-secret-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './secret-terminal.component.html',
  styleUrl: './secret-terminal.component.scss'
})
export class SecretTerminalComponent implements AfterViewChecked {
  @ViewChild('terminalEnd') private terminalEndRef!: ElementRef;
  @ViewChild('cmdInput') private cmdInputRef!: ElementRef<HTMLInputElement>;

  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);
  readonly achievementService = inject(AchievementService);

  readonly commandInput = signal<string>('');
  readonly history = signal<TerminalLine[]>([
    { text: '====================================================', type: 'system' },
    { text: 'HAJRI DIGITAL IDENTITY // RETRO-CYBER KERNEL v4.18.2', type: 'system' },
    { text: 'AUTHENTICATED USER: guest@hajri-identity', type: 'system' },
    { text: 'Type "help" for a list of available commands.', type: 'system' },
    { text: '====================================================', type: 'system' }
  ]);

  private needScroll = false;

  ngAfterViewChecked(): void {
    if (this.needScroll) {
      this.scrollToBottom();
      this.needScroll = false;
    }
  }

  focusInput(): void {
    if (this.cmdInputRef) {
      this.cmdInputRef.nativeElement.focus();
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    this.audioService.playTerminalKey();
    if (e.key === 'Enter') {
      this.executeCommand();
    }
  }

  executeCommand(): void {
    const raw = this.commandInput().trim();
    if (!raw) return;

    this.audioService.playClick();
    this.commandInput.set('');

    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    this.pushLine(`guest@hajri:~$ ${raw}`, 'command');

    switch (cmd) {
      case 'help':
        this.pushLine('AVAILABLE PROTOCOLS:', 'output');
        this.pushLine('  whoami        - Display developer profile & status', 'output');
        this.pushLine('  skills        - List verified core competencies', 'output');
        this.pushLine('  projects      - List active tactical missions', 'output');
        this.pushLine('  contact       - Print direct communication frequencies', 'output');
        this.pushLine('  matrix        - Toggle overclock cyber matrix mode', 'output');
        this.pushLine('  future        - Access classified 2030 roadmap vision', 'output');
        this.pushLine('  sudo          - Attempt superuser elevation', 'output');
        this.pushLine('  cat           - Read text files (e.g. cat secret.txt)', 'output');
        this.pushLine('  eastereggs    - Status of hidden system secrets', 'output');
        this.pushLine('  clear         - Clear terminal buffer', 'output');
        this.pushLine('  exit          - Close this terminal session', 'output');
        break;

      case 'whoami':
        this.pushLine('NAME: Oussama Hajri', 'success');
        this.pushLine('SPECIALIZATION: Information Technology', 'output');
        this.pushLine('ROLE: Aspiring Full-Stack Developer', 'output');
        this.pushLine('ORIGIN: Tunisia // Worldwide Operations', 'output');
        this.pushLine('FOCUS: Angular, React, Node.js, PHP/Laravel, Three.js 3D Web', 'output');
        break;

      case 'skills':
        this.pushLine('SKILL MATRIX TELEMETRY:', 'output');
        this.pushLine('  • JavaScript:   LEVEL 08 [Specialist]', 'output');
        this.pushLine('  • Angular:      LEVEL 07 [Practitioner]', 'output');
        this.pushLine('  • React:        LEVEL 07 [Practitioner]', 'output');
        this.pushLine('  • Node.js:      LEVEL 06 [Practitioner]', 'output');
        this.pushLine('  • MySQL:        LEVEL 07 [Practitioner]', 'output');
        this.pushLine('  • Three.js:     LEVEL 06 [Practitioner]', 'output');
        this.pushLine('  • PHP/Laravel:  LEVEL 06 [Practitioner]', 'output');
        break;

      case 'projects':
      case 'missions':
        this.pushLine('ACTIVE MISSIONS:', 'output');
        this.pushLine('  [01] Library Management System (React + Node + Mongo)', 'output');
        this.pushLine('  [02] E-Learning Platform (Angular + TypeScript)', 'output');
        this.pushLine('  [03] University Residence Management (Angular + Laravel + MySQL)', 'output');
        this.pushLine('  [04] Smart Heritage Immersive Room (Three.js 3D + AI)', 'output');
        this.pushLine('  [05] Hajri Studio (Canvas 2D + Web Workers)', 'output');
        break;

      case 'contact':
        this.pushLine('COMMUNICATION FREQUENCIES:', 'output');
        this.pushLine('  EMAIL:    hajrioussama41@gmail.com', 'success');
        this.pushLine('  LINKEDIN: linkedin.com/in/oussama-hajri', 'output');
        this.pushLine('  GITHUB:   github.com/oussama-hajri', 'output');
        break;

      case 'matrix':
      case 'overclock':
        this.stateService.triggerKonamiUnlock();
        this.pushLine('OVERCLOCK MATRIX PROTOCOL TOGGLED!', 'success');
        break;

      case 'future':
        this.stateService.navigateTo('future');
        this.pushLine('NAVIGATING TO 2030 FUTURE HORIZON...', 'success');
        break;

      case 'sudo':
        this.pushLine('Permission denied: Oussama Hajri is the root administrator.', 'error');
        this.pushLine('Tip: He is hiring-ready and doesn’t need sudo to make an impact.', 'output');
        break;

      case 'cat':
        if (arg === 'secret.txt' || arg === 'secret') {
          this.pushLine('DECRYPTING CLASSIFIED MESSAGE...', 'success');
          this.pushLine('"Curiosity is the engine of high-caliber engineering. If you read this, Oussama respects your attention to detail!"', 'output');
          this.pushLine('CODE PHRASE: #BUILD_THE_FUTURE_2026', 'success');
          this.achievementService.unlock('time_traveler');
        } else if (!arg) {
          this.pushLine('Usage: cat <filename>', 'error');
        } else {
          this.pushLine(`cat: ${arg}: No such file or directory. Try: cat secret.txt`, 'error');
        }
        break;

      case 'eastereggs':
      case 'secrets':
        this.pushLine('SYSTEM EASTER EGGS DISCOVERED:', 'output');
        this.pushLine('  1. Konami Sequence (↑ ↑ ↓ ↓ ← → ← → B A)', 'output');
        this.pushLine('  2. Secret Terminal Console (You are here!)', 'success');
        this.pushLine('  3. Kinetic Core Overcharge (Rapid-click brand logo 5x)', 'output');
        this.pushLine('  4. Future 2030 Roadmap Vision (Type "future")', 'output');
        this.pushLine('  5. Browser DevTools Inspect Secret Function (window.__SECRET_OVERCLOCK)', 'output');
        break;

      case 'clear':
        this.history.set([]);
        break;

      case 'exit':
      case 'quit':
        this.stateService.toggleTerminal();
        break;

      default:
        this.pushLine(`hajri-sh: command not found: ${cmd}. Type "help" for list.`, 'error');
        break;
    }
  }

  private pushLine(text: string, type: TerminalLine['type']): void {
    this.history.update(h => [...h, { text, type }]);
    this.needScroll = true;
  }

  private scrollToBottom(): void {
    if (this.terminalEndRef?.nativeElement) {
      this.terminalEndRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  closeTerminal(): void {
    this.stateService.toggleTerminal();
  }
}

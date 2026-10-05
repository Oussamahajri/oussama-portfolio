import { Component, ElementRef, OnInit, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-experience-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience-loader.component.html',
  styleUrl: './experience-loader.component.scss'
})
export class ExperienceLoaderComponent implements OnInit, OnDestroy {
  @ViewChild('noiseCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);

  readonly step = signal<number>(0);
  readonly progressPercent = signal<number>(0);
  readonly statusLog = signal<string[]>([]);
  readonly isReady = signal<boolean>(false);

  private animFrameId: number | null = null;
  private timeouts: number[] = [];

  ngOnInit(): void {
    this.initCanvasNoise();
    this.runSequencedBoot();
    this.listenForEnterKey();
  }

  ngOnDestroy(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    this.timeouts.forEach(t => clearTimeout(t));
  }

  private listenForEnterKey(): void {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && this.isReady() && this.stateService.currentView() === 'entry') {
        window.removeEventListener('keydown', handler);
        this.onStart();
      }
    };
    window.addEventListener('keydown', handler);
  }

  private runSequencedBoot(): void {
    const pushLog = (msg: string) => {
      this.statusLog.update(logs => [...logs.slice(-4), msg]);
      this.audioService.playTerminalKey();
    };

    // Step 0: Initial noise and kernel boot
    this.timeouts.push(window.setTimeout(() => {
      this.step.set(1);
      pushLog('> BIOS // HAJRI_CORE KERNEL V4.18.2');
    }, 400));

    this.timeouts.push(window.setTimeout(() => {
      pushLog('> ALLOCATING NEURAL BUFFER & THREE.JS ENGINE...');
      this.progressPercent.set(34);
    }, 900));

    // Step 2: "INITIALIZING HAJRI DIGITAL IDENTITY..."
    this.timeouts.push(window.setTimeout(() => {
      this.step.set(2);
      pushLog('> INITIALIZING HAJRI DIGITAL IDENTITY...');
      this.progressPercent.set(68);
    }, 1500));

    // Step 3: "IDENTITY FOUND"
    this.timeouts.push(window.setTimeout(() => {
      this.step.set(3);
      pushLog('> DECRYPTING QUANTUM SIGNATURE... [OK]');
      pushLog('> IDENTITY FOUND: OUSSAMA HAJRI');
      this.progressPercent.set(100);
    }, 2300));

    // Step 4: "OUSSAMA HAJRI" & "PRESS START"
    this.timeouts.push(window.setTimeout(() => {
      this.step.set(4);
      this.isReady.set(true);
      pushLog('> ALL SYSTEMS CALIBRATED // AWAITING OPERATOR INPUT');
    }, 3100));
  }

  onStart(): void {
    this.audioService.playStartupChime();
    this.stateService.startExperience();
  }

  private initCanvasNoise(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth / 2);
      canvas.height = Math.floor(window.innerHeight / 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const renderNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.createImageData(w, h);
      const buffer = new Uint32Array(imgData.data.buffer);
      const len = buffer.length;

      for (let i = 0; i < len; i += 4) {
        if (Math.random() < 0.04) {
          buffer[i] = 0x15ffffff; // Faint cyber particle noise
        }
      }

      ctx.putImageData(imgData, 0, 0);
      this.animFrameId = requestAnimationFrame(renderNoise);
    };

    renderNoise();
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';

@Component({
  selector: 'app-future-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './future-view.component.html',
  styleUrl: './future-view.component.scss'
})
export class FutureViewComponent {
  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);

  readonly roadmap = [
    {
      year: '2026',
      title: 'CAPSTONE MASTERY & CLOUD FOUNDATIONS',
      status: 'TARGET PHASE',
      desc: 'Deliver an exceptional Information Technology Final Year Capstone (PFE). Solidify containerized cloud deployments, CI/CD automated test suites, and enterprise full-stack patterns.',
      milestones: ['PFE Graduation Defense', 'AWS / Cloud Certification Prep', 'Open Source Angular / React Contributions']
    },
    {
      year: '2027',
      title: 'ENTERPRISE MICROSERVICES & DISTRIBUTED SYSTEMS',
      status: 'PROJECTED HORIZON',
      desc: 'Build distributed backend microservices and message-driven architectures (Kafka, RabbitMQ, Redis). Deliver mission-critical reliability at enterprise scale.',
      milestones: ['High-throughput event streaming', 'Zero-downtime deployments', 'Polyglot service contracts']
    },
    {
      year: '2028',
      title: 'SPATIAL COMPUTING & WEBGPU / 3D GRAPHICS',
      status: 'RESEARCH HORIZON',
      desc: 'Pioneer the transition from WebGL to WebGPU. Develop interactive digital twins, spatial 3D web applications, and compute-shader data visualizations.',
      milestones: ['WebGPU compute pipeline', 'Spatial UI/UX design systems', 'Ultra-low-latency 3D simulation']
    },
    {
      year: '2029 - 2030',
      title: 'SOFTWARE ARCHITECT & AI-NATIVE SYSTEMS',
      status: 'VISION HORIZON',
      desc: 'Lead engineering squads, design resilient software architectures, and embed autonomous AI agentic workflows into high-impact human-centric software.',
      milestones: ['System Architect Designation', 'Engineering Mentorship', 'Global Scale Products']
    }
  ];

  onClose(): void {
    this.stateService.closeModal();
  }
}

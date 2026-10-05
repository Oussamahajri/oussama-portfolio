import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  inject,
  signal,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { StateService, PortfolioView } from '../../core/services/state.service';
import { AudioService } from '../../core/services/audio.service';
import { AchievementService } from '../../core/services/achievement.service';

interface WorldNode {
  id: PortfolioView;
  label: string;
  sublabel: string;
  iconText: string;
  color: number;
  position: THREE.Vector3;
  mesh?: THREE.Group;
  haloMesh?: THREE.Mesh;
}

@Component({
  selector: 'app-world-3d',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world-3d.component.html',
  styleUrl: './world-3d.component.scss'
})
export class World3dComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('webglCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly stateService = inject(StateService);
  readonly audioService = inject(AudioService);
  readonly achievementService = inject(AchievementService);
  private readonly ngZone = inject(NgZone);

  readonly hoveredNode = signal<WorldNode | null>(null);
  readonly tooltipPos = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  // Three.js instances
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animFrameId: number | null = null;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();

  // Scene Objects
  private coreGroup!: THREE.Group;
  private nodesGroup = new THREE.Group();
  private starfieldParticles!: THREE.Points;
  private gridHelper!: THREE.GridHelper;
  private interactableMeshes: THREE.Object3D[] = [];

  // Interaction State
  private targetCameraPos = new THREE.Vector3(0, 10, 36);
  private baseCameraPos = new THREE.Vector3(0, 8, 32);
  private isPointerDown = false;
  private previousPointerPos = { x: 0, y: 0 };
  private worldRotation = { x: 0, y: 0 };
  private targetWorldRotation = { x: 0, y: 0 };

  // Nodes definition
  private nodes: WorldNode[] = [
    {
      id: 'identity',
      label: 'IDENTITY CORE',
      sublabel: 'OUSSAMA HAJRI // IT & DEV',
      iconText: '01',
      color: 0x00f0ff,
      position: new THREE.Vector3(-14, 4, 6)
    },
    {
      id: 'skills',
      label: 'SKILLS MATRIX',
      sublabel: 'LEVEL-BASED COMPETENCIES',
      iconText: '02',
      color: 0x2979ff,
      position: new THREE.Vector3(-8, 9, -8)
    },
    {
      id: 'missions',
      label: 'PROJECT MISSIONS',
      sublabel: 'TACTICAL CASE STUDIES',
      iconText: '03',
      color: 0x00e5ff,
      position: new THREE.Vector3(8, 9, -8)
    },
    {
      id: 'timeline',
      label: 'CAREER TIMELINE',
      sublabel: 'ACADEMIC & FIELD HORIZON',
      iconText: '04',
      color: 0x00ff88,
      position: new THREE.Vector3(14, 4, 6)
    },
    {
      id: 'journey',
      label: 'THE JOURNEY',
      sublabel: 'FAILURES, LESSONS & GROWTH',
      iconText: '05',
      color: 0xffaa00,
      position: new THREE.Vector3(-10, -5, 4)
    },
    {
      id: 'ai',
      label: 'AI // OUSSAMA',
      sublabel: 'NEURAL DIALOGUE TERMINAL',
      iconText: '06',
      color: 0x9945ff,
      position: new THREE.Vector3(0, 11, 4)
    },
    {
      id: 'contact',
      label: 'CONNECT NODE',
      sublabel: 'DIRECT FREQUENCIES & LINKS',
      iconText: '07',
      color: 0x00f0ff,
      position: new THREE.Vector3(10, -5, 4)
    }
  ];

  ngOnInit(): void {
    // Component lifecycle init
  }

  ngAfterViewInit(): void {
    // Run outside Angular zone to optimize requestAnimationFrame performance
    this.ngZone.runOutsideAngular(() => {
      this.initThree();
      this.buildEnvironment();
      this.buildIdentityCore();
      this.buildSpatialNodes();
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    this.disposeThree();
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x020409, 0.015);

    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    this.camera.position.copy(this.targetCameraPos);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 2.5, 50);
    pointLight.position.set(0, 8, 10);
    this.scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x2979ff, 2, 40);
    blueLight.position.set(0, -6, 5);
    this.scene.add(blueLight);

    window.addEventListener('resize', this.onWindowResize);
    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointerup', this.onPointerUp);
    canvas.addEventListener('click', this.onCanvasClick);
  }

  private buildEnvironment(): void {
    // Starfield Particle Universe
    const starsCount = 1800;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    const starColors = new Float32Array(starsCount * 3);

    const cyan = new THREE.Color(0x00f0ff);
    const blue = new THREE.Color(0x2979ff);
    const white = new THREE.Color(0xffffff);

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 160;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 160;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 160;

      const choice = Math.random();
      const col = choice < 0.4 ? cyan : choice < 0.7 ? blue : white;
      starColors[i3] = col.r;
      starColors[i3 + 1] = col.g;
      starColors[i3 + 2] = col.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.starfieldParticles = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(this.starfieldParticles);

    // Cyber Floor Grid
    this.gridHelper = new THREE.GridHelper(90, 45, 0x00f0ff, 0x11223a);
    this.gridHelper.position.y = -12;
    const gridMat = this.gridHelper.material as THREE.Material;
    gridMat.transparent = true;
    gridMat.opacity = 0.35;
    this.scene.add(this.gridHelper);
  }

  private buildIdentityCore(): void {
    this.coreGroup = new THREE.Group();
    this.coreGroup.position.set(0, 0, 0);

    // 1. Inner Glowing Energy Core (Icosahedron)
    const innerGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    innerCore.userData = { isCore: true };
    this.coreGroup.add(innerCore);

    // 2. Central Crystal Nucleus
    const nucleusGeo = new THREE.OctahedronGeometry(1.4, 0);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x0070f3,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    nucleus.userData = { isCore: true };
    this.coreGroup.add(nucleus);

    // 3. Orbital Cyber Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.04, 16, 60), ringMat);
    ring1.rotation.x = Math.PI / 3;
    this.coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.04, 16, 60), ringMat);
    ring2.rotation.y = Math.PI / 4;
    this.coreGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(6.2, 0.03, 16, 80), ringMat);
    ring3.rotation.x = -Math.PI / 4;
    this.coreGroup.add(ring3);

    this.scene.add(this.coreGroup);
    this.interactableMeshes.push(innerCore, nucleus);
  }

  private buildSpatialNodes(): void {
    this.nodes.forEach(node => {
      const group = new THREE.Group();
      group.position.copy(node.position);

      // Node central floating geometric relic
      const geo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.4,
        wireframe: true,
        roughness: 0.3
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { node };

      // Holographic outer aura / halo
      const haloGeo = new THREE.OctahedronGeometry(2.3, 0);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.userData = { node };

      // Subtle beacon line to ground grid
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -12 - node.position.y, 0)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.15
      });
      const line = new THREE.Line(lineGeo, lineMat);

      group.add(mesh);
      group.add(haloMesh);
      group.add(line);

      node.mesh = group;
      node.haloMesh = haloMesh;

      this.nodesGroup.add(group);
      this.interactableMeshes.push(mesh, haloMesh);
    });

    this.scene.add(this.nodesGroup);
  }

  private onWindowResize = (): void => {
    if (!this.camera || !this.renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private onPointerMove = (e: PointerEvent): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.pointer.x = (e.clientX / width) * 2 - 1;
    this.pointer.y = -(e.clientY / height) * 2 + 1;

    // Mobile / drag rotation
    if (this.isPointerDown) {
      const deltaX = e.clientX - this.previousPointerPos.x;
      const deltaY = e.clientY - this.previousPointerPos.y;

      this.targetWorldRotation.y += deltaX * 0.005;
      this.targetWorldRotation.x += deltaY * 0.005;
      // Clamp vertical tilt
      this.targetWorldRotation.x = Math.max(-0.4, Math.min(0.4, this.targetWorldRotation.x));

      this.previousPointerPos = { x: e.clientX, y: e.clientY };
    }

    // Raycast for hover
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactableMeshes, false);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hit.userData && hit.userData['node']) {
        const foundNode = hit.userData['node'] as WorldNode;
        if (this.hoveredNode()?.id !== foundNode.id) {
          this.ngZone.run(() => {
            this.hoveredNode.set(foundNode);
            this.tooltipPos.set({ x: e.clientX, y: e.clientY });
            this.audioService.playHover();
          });
        } else {
          this.ngZone.run(() => {
            this.tooltipPos.set({ x: e.clientX, y: e.clientY });
          });
        }
        document.body.style.cursor = 'pointer';
        return;
      } else if (hit.userData && hit.userData['isCore']) {
        document.body.style.cursor = 'crosshair';
        return;
      }
    }

    if (this.hoveredNode()) {
      this.ngZone.run(() => {
        this.hoveredNode.set(null);
      });
      document.body.style.cursor = 'default';
    }
  };

  private onPointerDown = (e: PointerEvent): void => {
    this.isPointerDown = true;
    this.previousPointerPos = { x: e.clientX, y: e.clientY };
  };

  private onPointerUp = (): void => {
    this.isPointerDown = false;
  };

  private onCanvasClick = (e: MouseEvent): void => {
    // If modal is currently open, don't trigger 3D node clicks
    if (this.stateService.isModalActive() || this.stateService.terminalOpen()) {
      return;
    }

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactableMeshes, false);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hit.userData && hit.userData['node']) {
        const targetNode = hit.userData['node'] as WorldNode;
        this.ngZone.run(() => {
          this.stateService.navigateTo(targetNode.id);
        });
      } else if (hit.userData && hit.userData['isCore']) {
        this.ngZone.run(() => {
          this.stateService.registerCoreClick();
        });
      }
    }
  };

  private animate = (): void => {
    this.animFrameId = requestAnimationFrame(this.animate);

    const time = performance.now() * 0.001;
    const reduced = this.stateService.reducedMotion();

    // Smooth world rotation interpolation
    this.worldRotation.x += (this.targetWorldRotation.x - this.worldRotation.x) * 0.08;
    this.worldRotation.y += (this.targetWorldRotation.y - this.worldRotation.y) * 0.08;

    if (this.scene) {
      this.scene.rotation.y = this.worldRotation.y;
      this.scene.rotation.x = this.worldRotation.x;
    }

    // Core Animation
    if (this.coreGroup && !reduced) {
      this.coreGroup.rotation.y = time * 0.3;
      this.coreGroup.rotation.x = Math.sin(time * 0.2) * 0.15;
      const scale = 1 + Math.sin(time * 2) * 0.04;
      this.coreGroup.scale.set(scale, scale, scale);
    }

    // Spatial Nodes Animation
    if (!reduced) {
      this.nodes.forEach((node, idx) => {
        if (node.mesh) {
          node.mesh.rotation.y = time * 0.5 + idx;
          node.mesh.rotation.x = Math.sin(time + idx) * 0.2;
          node.mesh.position.y = node.position.y + Math.sin(time * 1.5 + idx) * 0.4;
        }
        if (node.haloMesh) {
          node.haloMesh.rotation.z = -time * 0.4 + idx;
        }
      });
    }

    // Subtle starfield drift
    if (this.starfieldParticles && !reduced) {
      this.starfieldParticles.rotation.y = time * 0.015;
    }

    // Camera subtle floating drift
    if (!reduced) {
      this.camera.position.x = this.baseCameraPos.x + Math.sin(time * 0.3) * 1.2;
      this.camera.position.y = this.baseCameraPos.y + Math.cos(time * 0.2) * 0.8;
    }

    this.renderer.render(this.scene, this.camera);
  };

  selectNodeFromUI(nodeId: PortfolioView): void {
    this.stateService.navigateTo(nodeId);
  }

  private disposeThree(): void {
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('pointerup', this.onPointerUp);

    if (this.canvasRef?.nativeElement) {
      const c = this.canvasRef.nativeElement;
      c.removeEventListener('pointermove', this.onPointerMove);
      c.removeEventListener('pointerdown', this.onPointerDown);
      c.removeEventListener('click', this.onCanvasClick);
    }

    if (this.scene) {
      this.scene.traverse((obj: THREE.Object3D) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(m => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

import { Component, ElementRef, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-animation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #rendererContainer class="three-container" [class.active]="show">
      <div class="fithae-overlay" *ngIf="show">
        <h1 class="display-1 fw-bold text-white animate-pop">FitHae!</h1>
      </div>
    </div>
  `,
  styles: [`
    .three-container {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 2000;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .three-container.active {
      opacity: 1;
      pointer-events: auto;
      background: rgba(0,0,0,0.4);
    }
    .fithae-overlay {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      text-shadow: 0 0 20px #E91E63;
    }
  `]
})
export class ThreeAnimationComponent implements OnInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  @Input() show = false;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private star!: THREE.Mesh;
  private animationId!: number;

  ngOnInit() {
    this.initThree();
    this.animate();
  }

  private initThree() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Create a Star-like shape (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xFFEB3B, // Yellow
      emissive: 0xE91E63, // Pink
      shininess: 100
    });
    this.star = new THREE.Mesh(geometry, material);
    this.scene.add(this.star);

    const light = new THREE.PointLight(0xffffff, 2, 100);
    light.position.set(5, 5, 5);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0x404040));
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    if (this.show) {
      this.star.rotation.x += 0.05;
      this.star.rotation.y += 0.05;
    }
    
    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}

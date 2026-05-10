import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-900 cursor-custom relative">
      <!-- Three.js Canvas -->
      <canvas #threeCanvas class="absolute inset-0 z-0 pointer-events-none w-full h-full"></canvas>

      <!-- Premium Hero Section -->
      <section class="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0 bg-slate-900/40 backdrop-blur-[1px]"></div>

        <div class="relative z-10 max-w-4xl mx-auto px-6 text-center mt-16">
          <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer">
            Ab Har <span class="text-fithae-yellow italic">Restaurant</span> Hoga FitHae!
          </h1>
          <p class="text-xl text-white/80 mb-10 font-medium max-w-2xl mx-auto">Discover, review, and experience the most premium dining spots in Islamabad & Rawalpindi with verified feedback on Food and Ambience.</p>
          
          <!-- Search Bar -->
          <div class="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/20 shadow-2xl hover:shadow-fithae-yellow/10 transition-shadow duration-500">
            <div class="flex-1 flex items-center gap-3 px-5 py-3 bg-white/90 hover:bg-white rounded-2xl transition-colors">
              <span class="material-symbols-outlined text-slate-400">restaurant</span>
              <input type="text" [(ngModel)]="searchQuery" (input)="onSearch()" 
                     placeholder="Search for a restaurant..." 
                     class="w-full bg-transparent border-none outline-none text-slate-900 font-bold placeholder:font-medium">
            </div>
            <div class="flex items-center gap-3 px-5 py-3 bg-white/90 hover:bg-white rounded-2xl min-w-[200px] transition-colors">
              <span class="material-symbols-outlined text-slate-400">location_on</span>
              <select [(ngModel)]="selectedCity" (change)="onSearch()" 
                      class="w-full bg-transparent border-none outline-none text-slate-900 font-bold appearance-none cursor-pointer">
                <option value="">All Cities</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Results Grid -->
      <main class="relative z-10 max-w-7xl mx-auto px-6 py-20 bg-slate-50/95 backdrop-blur-3xl rounded-t-[3rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)] min-h-screen">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-4xl font-black text-slate-900 tracking-tight">Premium Dining</h2>
          <div class="flex gap-2">
            <span class="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/20 flex items-center gap-2">
              <span class="material-symbols-outlined text-sm text-fithae-yellow">star</span> {{ hotels.length }} Spots Found
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div *ngFor="let hotel of hotels" class="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-fithae-yellow/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative cursor-pointer" [routerLink]="['/hotel', hotel._id]">
            
            <!-- Sponsored Tag -->
            <div *ngIf="hotel.isSponsored" 
                 class="absolute top-4 right-4 z-10 px-4 py-1.5 bg-fithae-yellow text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border-2 border-white animate-bounce">
              Sponsored Pick
            </div>

            <div class="aspect-[4/3] overflow-hidden relative bg-slate-100">
              <img [src]="hotel.imageUrl" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" [alt]="hotel.name">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                <span class="text-white font-bold flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30">
                  <span class="material-symbols-outlined">visibility</span> View Restaurant
                </span>
              </div>
            </div>

            <div class="p-8 flex-1 flex flex-col relative bg-white">
              <div class="flex justify-between items-start mb-4">
                <span class="text-slate-400 font-black text-[10px] uppercase tracking-widest">{{ hotel.city }}</span>
                <div class="flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-xl shadow-md group-hover:bg-fithae-yellow transition-colors duration-500">
                  <span class="material-symbols-outlined text-fithae-yellow group-hover:text-slate-900 text-sm fill-1 transition-colors">star</span>
                  <span class="text-xs font-black text-white group-hover:text-slate-900 transition-colors">{{ hotel.rating | number:'1.1-1' }}</span>
                </div>
              </div>

              <h3 class="text-2xl font-black text-slate-900 mb-3 group-hover:text-fithae-yellow transition-colors">{{ hotel.name }}</h3>
              <p class="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed italic">"{{ hotel.description }}"</p>

              <div class="mt-auto flex items-center justify-between pt-6 border-t border-slate-100 group-hover:border-fithae-yellow/20 transition-colors">
                <span class="text-slate-900 font-black text-2xl tracking-tighter">{{ hotel.priceRange || '$$$' }}<span class="text-slate-400 font-bold text-xs ml-2 tracking-normal uppercase">Price Tier</span></span>
                <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center transition-all group-hover:bg-slate-900 group-hover:text-white group-hover:-rotate-45 shadow-inner group-hover:shadow-xl">
                  <span class="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  hotels: any[] = [];
  searchQuery = '';
  selectedCity = '';
  loading = false;

  // Three.js instances
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private particles!: THREE.Points;
  private animationId: number = 0;
  private isBrowser: boolean;

  constructor(private api: ApiService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.loadHotels();
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initThreeJS();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser && this.animationId) {
      cancelAnimationFrame(this.animationId);
      if (this.renderer) {
        this.renderer.dispose();
      }
    }
  }

  loadHotels() {
    this.loading = true;
    this.api.getHotels(this.selectedCity, this.searchQuery).subscribe({
      next: (res) => {
        // Fallback rating handling if none exists
        this.hotels = res.map((h: any) => ({ ...h, rating: h.rating || 4.5 }));
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onSearch() {
    this.loadHotels();
  }

  // --- Immersive Background Animation (Three.js Thread/Particles) ---
  private initThreeJS() {
    const canvas = this.canvasRef.nativeElement;
    
    // Scene setup
    this.scene = new THREE.Scene();
    
    // Use window.innerWidth to ensure it spans the whole viewport
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create "Thread/Particle" geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      // Spread particles across a wide area
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material with a premium gold/yellow tint to match branding
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: '#fbbf24', // fithae-yellow
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);

    // Handle Resize
    window.addEventListener('resize', this.onWindowResize.bind(this));

    // Interactive mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation Loop
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      // Slow rotation for the thread/particles
      this.particles.rotation.y += 0.001;
      this.particles.rotation.x += 0.0005;

      // Mouse interaction (parallax)
      this.particles.position.x += (mouseX * 0.5 - this.particles.position.x) * 0.05;
      this.particles.position.y += (-mouseY * 0.5 - this.particles.position.y) * 0.05;

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  private onWindowResize() {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}

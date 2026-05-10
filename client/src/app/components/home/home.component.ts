import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as THREE from 'three';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-900 cursor-custom relative pt-24">
      <!-- Three.js Canvas -->
      <canvas #threeCanvas class="absolute inset-0 z-0 pointer-events-none w-full h-full"></canvas>

      <!-- Premium Hero Section -->
      <section class="relative h-[55vh] flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0 bg-slate-900/40 backdrop-blur-[1px]"></div>

        <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer">
            Ab Har <span class="text-fithae-yellow italic">Restaurant</span> Hoga FitHae!
          </h1>
          <p class="text-xl text-white/80 mb-10 font-medium max-w-2xl mx-auto">Discover, review, and experience the most premium dining spots in Islamabad & Rawalpindi.</p>
          
          <!-- Fuzzy Search Bar -->
          <div class="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-xl p-4 rounded-3xl border border-white/20 shadow-2xl hover:shadow-fithae-yellow/10 transition-shadow duration-500">
            <div class="flex-1 flex items-center gap-3 px-5 py-3 bg-white/90 hover:bg-white rounded-2xl transition-colors">
              <span class="material-symbols-outlined text-slate-400">restaurant</span>
              <input type="text" [(ngModel)]="searchQuery" (input)="onSearch()" 
                     placeholder="Search restaurants (e.g. mcdnald, monl...)" 
                     class="w-full bg-transparent border-none outline-none text-slate-900 font-bold placeholder:font-medium placeholder:text-slate-400">
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

      <!-- Leaderboard Section -->
      <section class="relative z-10 max-w-7xl mx-auto px-6 mb-12">
        <div class="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl">
          <h2 class="text-xl font-black text-white mb-4 flex items-center gap-2"><span class="material-symbols-outlined text-fithae-yellow">emoji_events</span> Top Reviewers Scoreboard</h2>
          <div class="flex overflow-x-auto gap-4 pb-2">
            <div *ngFor="let leader of leaderboard; let i = index" class="flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 min-w-[200px] hover:bg-white/10 transition-colors">
              <div class="w-10 h-10 rounded-full bg-fithae-yellow text-slate-900 flex items-center justify-center font-black text-lg shadow-lg">
                #{{ i + 1 }}
              </div>
              <div>
                <div class="text-white font-bold">{{ leader.username }}</div>
                <div class="text-white/50 text-xs font-medium">{{ leader.reviewCount }} Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Results Grid -->
      <main class="relative z-10 max-w-7xl mx-auto px-6 py-12 bg-slate-50/95 backdrop-blur-3xl rounded-t-[3rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)] min-h-screen">
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <h2 class="text-4xl font-black text-slate-900 tracking-tight">Premium Dining</h2>
          <div class="flex gap-4">
            <button (click)="showSuggestModal = true" class="px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-bold shadow-md border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">add_location_alt</span> Suggest Restaurant
            </button>
            <span class="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/20 flex items-center gap-2">
              <span class="material-symbols-outlined text-sm text-fithae-yellow">star</span> {{ filteredHotels.length }} Spots Found
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div *ngFor="let hotel of filteredHotels" class="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-fithae-yellow/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative cursor-pointer" [routerLink]="['/hotel', hotel._id]">
            
            <div *ngIf="hotel.isSponsored" class="absolute top-4 right-4 z-10 px-4 py-1.5 bg-fithae-yellow text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border-2 border-white animate-bounce">
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

      <!-- Suggest Restaurant Modal -->
      <div *ngIf="showSuggestModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
        <div class="bg-white rounded-[2.5rem] p-10 max-w-lg w-full mx-4 shadow-2xl relative">
          <button (click)="showSuggestModal = false" class="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
            <span class="material-symbols-outlined text-sm">close</span>
          </button>
          
          <h3 class="text-3xl font-black text-slate-900 mb-2">Not Listed?</h3>
          <p class="text-slate-500 mb-8 font-medium">Suggest a restaurant. Our admins will approve it shortly so you can leave your review!</p>

          <form (ngSubmit)="suggestRestaurant()" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Restaurant Name</label>
              <input type="text" [(ngModel)]="newSuggestion.name" name="name" required class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-primary font-bold">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">City</label>
              <select [(ngModel)]="newSuggestion.city" name="city" class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-primary font-bold">
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Location / Address</label>
              <input type="text" [(ngModel)]="newSuggestion.address" name="address" required class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-primary font-bold">
            </div>
            
            <button type="submit" [disabled]="isSubmitting" class="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl">
              {{ isSubmitting ? 'SUBMITTING...' : 'SEND FOR APPROVAL' }}
            </button>
          </form>
        </div>
      </div>

    </div>
  `
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  allHotels: any[] = [];
  filteredHotels: any[] = [];
  leaderboard: any[] = [];
  
  searchQuery = '';
  selectedCity = '';
  
  // Suggestion Modal
  showSuggestModal = false;
  isSubmitting = false;
  newSuggestion = {
    name: '',
    city: 'Islamabad',
    address: '',
    description: 'A new community-suggested dining spot.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3',
    priceRange: '$$'
  };

  // Fuse.js instance
  fuse: any;

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
    this.loadInitialData();
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

  loadInitialData() {
    // Only load approved hotels
    this.api.getHotels().subscribe({
      next: (res) => {
        // Ensure ratings exist
        this.allHotels = res.map((h: any) => ({ ...h, rating: h.rating || 4.5 }));
        this.filteredHotels = [...this.allHotels];
        
        // Initialize Fuse for fuzzy search
        this.fuse = new Fuse(this.allHotels, {
          keys: ['name', 'address', 'city'],
          threshold: 0.3, // 0.0 is perfect match, 1.0 is anything. 0.3 handles misspellings nicely!
        });
      }
    });

    // Load Scoreboard
    this.api.getLeaderboard().subscribe({
      next: (res) => this.leaderboard = res
    });
  }

  onSearch() {
    let result = this.allHotels;

    // 1. Filter by City strictly
    if (this.selectedCity) {
      result = result.filter(h => h.city === this.selectedCity);
    }

    // 2. Fuzzy Search by Text
    if (this.searchQuery.trim()) {
      // Create a temporary fuse instance just for the city-filtered results
      const tempFuse = new Fuse(result, { keys: ['name', 'address'], threshold: 0.4 });
      const fuzzyResults = tempFuse.search(this.searchQuery);
      this.filteredHotels = fuzzyResults.map(r => r.item);
    } else {
      this.filteredHotels = result;
    }
  }

  suggestRestaurant() {
    if(!this.api.isLoggedIn()) {
      alert("Please login or create an account to suggest a restaurant.");
      return;
    }

    this.isSubmitting = true;
    this.api.registerHotel(this.newSuggestion).subscribe({
      next: () => {
        alert("Restaurant suggested successfully! It is now pending admin approval.");
        this.showSuggestModal = false;
        this.isSubmitting = false;
        this.newSuggestion.name = '';
        this.newSuggestion.address = '';
      },
      error: () => {
        alert("Error suggesting restaurant. Are you logged in?");
        this.isSubmitting = false;
      }
    });
  }

  // --- Immersive Background Animation (Three.js Thread/Particles) ---
  private initThreeJS() {
    const canvas = this.canvasRef.nativeElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: '#fbbf24',
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);

    window.addEventListener('resize', this.onWindowResize.bind(this));

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.particles.rotation.y += 0.001;
      this.particles.rotation.x += 0.0005;
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

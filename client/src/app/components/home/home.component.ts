import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white">
      <!-- Premium Hero Section -->
      <section class="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div class="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3" 
               class="w-full h-full object-cover opacity-40 scale-110 blur-[2px]" alt="Hero">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Ab Har Hotel Hoga <span class="text-fithae-yellow italic">FitHae!</span>
          </h1>
          <p class="text-xl text-white/80 mb-10 font-medium">Discover and review the most premium stays in Islamabad & Rawalpindi.</p>
          
          <!-- Search Bar -->
          <div class="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-xl p-3 rounded-3xl border border-white/20 shadow-2xl">
            <div class="flex-1 flex items-center gap-3 px-4 py-2 bg-white rounded-2xl">
              <span class="material-symbols-outlined text-slate-400">search</span>
              <input type="text" [(ngModel)]="searchQuery" (input)="onSearch()" 
                     placeholder="Search by hotel name..." 
                     class="w-full bg-transparent border-none outline-none text-slate-900 font-medium">
            </div>
            <div class="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl min-w-[200px]">
              <span class="material-symbols-outlined text-slate-400">location_on</span>
              <select [(ngModel)]="selectedCity" (change)="onSearch()" 
                      class="w-full bg-transparent border-none outline-none text-slate-900 font-medium appearance-none">
                <option value="">All Cities</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Results Grid -->
      <main class="max-w-7xl mx-auto px-6 py-20">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold text-slate-900">Premium Collections</h2>
          <div class="flex gap-2">
            <span class="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-bold">{{ hotels.length }} Stays Found</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div *ngFor="let hotel of hotels" class="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-primary/20 hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative">
            
            <!-- Sponsored Tag -->
            <div *ngIf="hotel.isSponsored" 
                 class="absolute top-4 right-4 z-10 px-4 py-1.5 bg-fithae-yellow text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border-2 border-white animate-pulse">
              Sponsored Ad
            </div>

            <div class="aspect-[4/3] overflow-hidden relative">
              <img [src]="hotel.imageUrl" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" [alt]="hotel.name">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span class="text-white font-bold flex items-center gap-2">
                  <span class="material-symbols-outlined">visibility</span> View Property
                </span>
              </div>
            </div>

            <div class="p-8 flex-1 flex flex-col">
              <div class="flex justify-between items-start mb-3">
                <span class="text-primary font-bold text-xs uppercase tracking-widest">{{ hotel.city }}</span>
                <div class="flex items-center gap-1 bg-fithae-yellow/10 px-2 py-1 rounded-lg">
                  <span class="material-symbols-outlined text-fithae-yellow text-sm fill-1">star</span>
                  <span class="text-xs font-black text-slate-900">{{ hotel.rating || '4.5' }}</span>
                </div>
              </div>

              <h3 class="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{{ hotel.name }}</h3>
              <p class="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed italic">{{ hotel.description }}</p>

              <div class="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                <span class="text-slate-900 font-black text-xl">{{ hotel.priceRange || '$$$' }}<span class="text-slate-400 font-normal text-xs ml-1">/ night</span></span>
                <a [routerLink]="['/hotel', hotel._id]" 
                   class="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-all group-hover:rotate-[-45deg]">
                  <span class="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class HomeComponent implements OnInit {
  hotels: any[] = [];
  searchQuery = '';
  selectedCity = '';
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.loading = true;
    this.api.getHotels(this.selectedCity, this.searchQuery).subscribe({
      next: (res) => {
        this.hotels = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onSearch() {
    this.loadHotels();
  }
}

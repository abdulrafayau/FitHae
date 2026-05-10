import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <main class="mt-xxl pt-lg">
      <!-- Hero Section -->
      <section class="relative h-[450px] flex items-center justify-center text-white overflow-hidden" 
               style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'); background-size: cover; background-position: center;">
        <div class="max-w-4xl w-full px-lg text-center z-10">
          <h1 class="font-display-lg text-display-lg mb-lg drop-shadow-lg animate-pop">Ab Har Hotel Hoga <span class="text-fithae-yellow">FitHae!</span></h1>
          <p class="font-body-lg text-body-lg mb-xl opacity-90">Discover & Review Premium Hotels in Islamabad & Pindi</p>
          
          <div class="bg-white rounded-xl p-sm flex flex-col md:flex-row gap-sm shadow-xl max-w-3xl mx-auto border-2 border-transparent focus-within:border-fithae-pink transition-all">
            <div class="flex-1 flex items-center px-md border-b md:border-b-0 md:border-r border-slate-200">
              <span class="material-symbols-outlined text-fithae-pink mr-sm">location_on</span>
              <input type="text" [(ngModel)]="searchQuery" (input)="filterHotels()"
                     class="w-full border-none focus:ring-0 text-on-surface font-body-md py-md" placeholder="Search by name or city...">
            </div>
            <div class="flex items-center px-md">
               <span class="font-label-bold text-on-surface-variant text-sm">{{ filteredHotels.length }} Hotels found</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Filter Bar -->
      <section class="bg-surface border-b border-outline-variant sticky top-[64px] z-40">
        <div class="max-w-container-max mx-auto px-lg py-md flex flex-wrap items-center justify-between gap-md">
          <div class="flex items-center gap-sm overflow-x-auto no-scrollbar py-xs">
            <button (click)="filterByCity('All')" [class]="activeCity === 'All' ? 'bg-fithae-pink text-white px-lg py-sm rounded-full font-label-bold text-sm' : 'bg-surface-container-high hover:bg-surface-container-highest px-lg py-sm rounded-full font-label-bold text-sm text-on-surface-variant transition-colors'">All</button>
            <button (click)="filterByCity('Islamabad')" [class]="activeCity === 'Islamabad' ? 'bg-fithae-pink text-white px-lg py-sm rounded-full font-label-bold text-sm' : 'bg-surface-container-high hover:bg-surface-container-highest px-lg py-sm rounded-full font-label-bold text-sm text-on-surface-variant transition-colors'">Islamabad</button>
            <button (click)="filterByCity('Rawalpindi')" [class]="activeCity === 'Rawalpindi' ? 'bg-fithae-pink text-white px-lg py-sm rounded-full font-label-bold text-sm' : 'bg-surface-container-high hover:bg-surface-container-highest px-lg py-sm rounded-full font-label-bold text-sm text-on-surface-variant transition-colors'">Rawalpindi</button>
          </div>
          <div class="flex items-center gap-md">
            <span class="text-body-sm font-label-bold text-on-surface-variant">Sort by:</span>
            <select class="bg-transparent border-none focus:ring-0 font-label-bold text-fithae-pink cursor-pointer">
              <option>Rating</option>
              <option>Name</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="max-w-container-max mx-auto px-lg py-xl">
        <div class="flex flex-col lg:flex-row gap-xl">
          <!-- Hotel Cards -->
          <div class="flex-grow space-y-lg">
            <h2 class="font-headline-lg text-headline-lg mb-8 border-b-2 border-fithae-pink inline-block pb-1">Hotels in Islamabad/Pindi</h2>
            
            <div *ngIf="loading" class="text-center py-10">
              <div class="animate-spin inline-block w-8 h-8 border-4 border-fithae-pink border-t-transparent rounded-full"></div>
              <p class="mt-2 text-on-surface-variant">Finding the fit stays...</p>
            </div>

            <div *ngFor="let hotel of filteredHotels" 
                 class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm card-hover flex flex-col md:flex-row h-auto md:h-64 transition-all duration-300 border border-outline-variant/30"
                 [class.border-fithae-yellow]="hotel.isSponsored" [class.border-2]="hotel.isSponsored">
              <div class="w-full md:w-80 relative shrink-0">
                <img class="w-full h-full object-cover" [src]="'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'" alt="Hotel">
                <div *ngIf="hotel.isSponsored" class="absolute top-md left-md bg-fithae-yellow text-on-surface px-md py-xs rounded-full font-label-caps text-[10px] tracking-widest shadow-lg font-bold">SPONSORED</div>
              </div>
              <div class="p-lg flex flex-col justify-between flex-grow">
                <div>
                  <div class="flex justify-between items-start mb-xs">
                    <h3 class="font-headline-md text-headline-md hover:text-fithae-pink transition-colors cursor-pointer" [routerLink]="['/hotel', hotel.id]">{{ hotel.name }}</h3>
                    <div class="bg-secondary-container text-on-secondary-container px-md py-xs rounded-lg font-label-bold text-sm border-b-2 border-secondary">
                      Score: {{ hotel.rating || 'N/A' }}
                    </div>
                  </div>
                  <div class="flex items-center gap-xs mb-md">
                    <span class="material-symbols-outlined filled-star">star</span>
                    <span class="material-symbols-outlined filled-star">star</span>
                    <span class="material-symbols-outlined filled-star">star</span>
                    <span class="material-symbols-outlined filled-star">star</span>
                    <span class="material-symbols-outlined unfilled-star">star</span>
                  </div>
                  <p class="text-on-surface-variant font-body-md line-clamp-2 mb-md">{{ hotel.address || 'Address not available' }}</p>
                </div>
                <div class="flex items-center justify-between mt-auto">
                  <div class="flex items-center gap-md">
                    <span class="text-fithae-pink font-label-bold">$$$</span>
                    <span class="text-on-surface-variant font-body-sm flex items-center">
                      <span class="material-symbols-outlined text-xs mr-1">location_on</span>{{ hotel.city }}
                    </span>
                  </div>
                  <button class="text-fithae-pink font-label-bold border-b-2 border-transparent hover:border-fithae-pink transition-all" [routerLink]="['/hotel', hotel.id]">View Details</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="hidden lg:block w-80 shrink-0 space-y-xl">
            <div class="bg-surface-container-low p-lg rounded-xl border-t-4 border-fithae-pink">
              <h4 class="font-label-bold text-primary mb-md flex items-center">
                <span class="material-symbols-outlined mr-2 text-fithae-pink">map</span>Interactive Map
              </h4>
              <div class="w-full h-48 rounded-lg overflow-hidden bg-slate-200 ring-1 ring-outline-variant">
                <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60" alt="Map">
              </div>
              <button class="w-full mt-md py-sm bg-white border border-fithae-pink text-fithae-pink rounded-lg font-label-bold hover:bg-fithae-pink hover:text-white transition-all">Open Full Map</button>
            </div>
            
            <div class="bg-primary-container p-lg rounded-xl text-white shadow-lg">
              <h4 class="font-headline-md mb-sm text-fithae-yellow">FitHae Insider</h4>
              <p class="font-body-sm opacity-80 mb-lg">Get the fittest hotel deals delivered to your inbox.</p>
              <input type="email" class="w-full bg-white/10 border-white/20 rounded-lg text-white mb-md p-2 focus:ring-fithae-pink" placeholder="Your Email">
              <button class="w-full py-md bg-fithae-pink text-white rounded-lg font-label-bold shadow-lg">Join the Elite</button>
            </div>

            <div class="p-lg bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30">
               <h4 class="font-label-bold text-primary mb-4">Top Rated Stays</h4>
               <div class="space-y-4">
                  <div class="flex gap-3">
                     <div class="w-12 h-12 rounded-lg bg-slate-200 shrink-0"></div>
                     <div>
                        <p class="font-bold text-sm">Serena Hotel</p>
                        <p class="text-xs text-on-surface-variant">Islamabad • 9.8</p>
                     </div>
                  </div>
                  <div class="flex gap-3">
                     <div class="w-12 h-12 rounded-lg bg-slate-200 shrink-0"></div>
                     <div>
                        <p class="font-bold text-sm">Marriott Hotel</p>
                        <p class="text-xs text-on-surface-variant">Islamabad • 9.2</p>
                     </div>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .filled-star { color: #FACC15; font-variation-settings: 'FILL' 1; }
    .unfilled-star { color: #E2E8F0; }
  `]
})
export class HomeComponent implements OnInit {
  hotels: any[] = [];
  filteredHotels: any[] = [];
  loading = true;
  searchQuery = '';
  activeCity = 'All';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getHotels().subscribe(data => {
      this.hotels = data;
      this.filteredHotels = data;
      this.loading = false;
    });
  }

  filterHotels() {
    this.filteredHotels = this.hotels.filter(h => 
      (h.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
       h.city.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      (this.activeCity === 'All' || h.city === this.activeCity)
    );
  }

  filterByCity(city: string) {
    this.activeCity = city;
    this.filterHotels();
  }
}

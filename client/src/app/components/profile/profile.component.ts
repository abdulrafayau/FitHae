import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main class="mt-xxl pt-lg bg-surface min-h-screen px-lg py-xl">
      <div *ngIf="loading" class="text-center py-xxl">
        <div class="animate-spin inline-block w-8 h-8 border-4 border-fithae-pink border-t-transparent rounded-full"></div>
      </div>

      <div class="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-xl" *ngIf="!loading && profile">
        <!-- User Sidebar -->
        <div class="lg:col-span-4">
          <div class="bg-white rounded-3xl shadow-xl p-8 border border-outline-variant/30 text-center animate-pop">
            <div class="relative inline-block mb-6">
              <img [src]="'https://ui-avatars.com/api/?name=' + profile.user.username + '&background=E91E63&color=fff&size=128'" 
                   class="w-32 h-32 rounded-full border-4 border-fithae-yellow shadow-lg mx-auto" alt="Avatar">
              <span class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm"></span>
            </div>
            
            <h2 class="text-2xl font-bold text-primary mb-1">{{ profile.user.username }}</h2>
            <p class="text-on-surface-variant text-sm mb-6 uppercase tracking-widest font-bold">Premium Reviewer</p>
            
            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="p-4 bg-surface-container-low rounded-2xl">
                 <p class="text-2xl font-bold text-primary">{{ profile.reviews.length }}</p>
                 <p class="text-[10px] uppercase font-bold text-on-surface-variant">Reviews</p>
              </div>
              <div class="p-4 bg-surface-container-low rounded-2xl">
                 <p class="text-2xl font-bold text-primary">0</p>
                 <p class="text-[10px] uppercase font-bold text-on-surface-variant">Karma</p>
              </div>
            </div>

            <div class="space-y-3">
              <button class="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all">Edit Profile</button>
              <button (click)="logout()" class="w-full py-3 border border-error text-error rounded-xl font-bold text-sm hover:bg-error hover:text-white transition-all">Sign Out</button>
            </div>
          </div>
        </div>

        <!-- Review Activity -->
        <div class="lg:col-span-8">
          <div class="bg-white rounded-3xl shadow-xl p-8 border border-outline-variant/30 h-full">
            <div class="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/20">
               <h3 class="text-xl font-bold text-primary flex items-center gap-2">
                 <span class="material-symbols-outlined text-fithae-pink">history</span> Review Legacy
               </h3>
               <span class="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Timeline view</span>
            </div>

            <div *ngIf="profile.reviews.length === 0" class="text-center py-xxl bg-surface-container-low rounded-2xl border-2 border-dashed border-outline-variant">
              <span class="material-symbols-outlined text-5xl opacity-20 mb-4">rate_review</span>
              <p class="text-on-surface-variant italic">No reviews found in your archive.</p>
              <button routerLink="/" class="mt-4 px-6 py-2 bg-fithae-pink text-white rounded-full font-bold text-sm">Explore Now</button>
            </div>

            <div class="space-y-8">
              <div *ngFor="let review of profile.reviews" class="relative pl-8 border-l-2 border-fithae-pink/20 pb-8 last:pb-0">
                <div class="absolute -left-[9px] top-0 w-4 h-4 bg-fithae-pink rounded-full border-4 border-white shadow-sm"></div>
                
                <div class="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 hover:shadow-md transition-shadow">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h4 class="font-bold text-primary">{{ review.hotelName || 'StayStar Partner' }}</h4>
                      <p class="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">{{ review.createdAt | date:'longDate' }}</p>
                    </div>
                    <div class="flex gap-1">
                      <span *ngFor="let s of [1,2,3,4,5]" class="material-symbols-outlined text-sm" 
                            [class.filled-star]="review.rating >= s" [class.unfilled-star]="review.rating < s">star</span>
                    </div>
                  </div>
                  <p class="text-on-surface-variant italic leading-relaxed text-sm">"{{ review.comment }}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .filled-star { color: #FACC15; font-variation-settings: 'FILL' 1; }
    .unfilled-star { color: #E2E8F0; }
  `]
})
export class ProfileComponent implements OnInit {
  profile: any;
  loading: boolean = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  logout() {
    this.api.logout();
    window.location.href = '/login';
  }
}

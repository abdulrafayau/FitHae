import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ThreeAnimationComponent } from '../three-animation/three-animation.component';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ThreeAnimationComponent],
  template: `
    <app-three-animation [show]="showFitHae"></app-three-animation>
    
    <main class="mt-xxl pt-lg">
      <!-- Hero Gallery -->
      <section class="max-w-container-max mx-auto px-lg mt-md">
        <div class="grid grid-cols-12 grid-rows-2 gap-md h-[500px]">
          <div class="col-span-12 md:col-span-8 row-span-2 relative overflow-hidden rounded-xl">
            <img class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                 [src]="'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200'" alt="Hotel Main">
            <div class="absolute bottom-lg left-lg bg-primary/20 backdrop-blur-md px-md py-sm rounded-lg text-on-primary">
              <span class="font-label-caps text-label-caps uppercase">Featured View</span>
            </div>
          </div>
          <div class="hidden md:block col-span-4 row-span-1 overflow-hidden rounded-xl">
            <img class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                 src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600" alt="Detail 1">
          </div>
          <div class="hidden md:block col-span-4 row-span-1 overflow-hidden rounded-xl">
            <img class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                 src="https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=600" alt="Detail 2">
          </div>
        </div>
      </section>

      <!-- Content Grid -->
      <div class="max-w-container-max mx-auto px-lg py-xl grid grid-cols-12 gap-gutter">
        <!-- Main Content Area -->
        <div class="col-span-12 lg:col-span-8">
          <div class="flex justify-between items-start mb-lg">
            <div *ngIf="hotel">
              <div class="flex items-center gap-sm mb-xs">
                <span class="bg-fithae-yellow text-on-surface px-sm py-xs rounded font-label-caps text-label-caps uppercase tracking-widest font-bold">Fit Stay Score: {{ hotel.rating || '9.5' }}</span>
                <span class="text-on-surface-variant flex items-center gap-xs font-body-sm text-body-sm">
                  <span class="material-symbols-outlined text-sm">location_on</span> {{ hotel.city }}, Pakistan
                </span>
              </div>
              <h1 class="font-display-lg text-display-lg mb-xs">{{ hotel.name }}</h1>
              <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">{{ hotel.address }}</p>
            </div>
          </div>

          <!-- Amenities -->
          <section class="mb-xl bg-surface-container-lowest p-xl rounded-xl shadow-sm border border-outline-variant/30">
            <h2 class="font-headline-md text-headline-md mb-lg">Refined Amenities</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-lg">
              <div class="flex flex-col items-start gap-sm">
                <span class="material-symbols-outlined text-3xl text-fithae-pink">pool</span>
                <span class="font-label-bold text-label-bold">Infinity Pool</span>
              </div>
              <div class="flex flex-col items-start gap-sm">
                <span class="material-symbols-outlined text-3xl text-fithae-pink">spa</span>
                <span class="font-label-bold text-label-bold">Full-service Spa</span>
              </div>
              <div class="flex flex-col items-start gap-sm">
                <span class="material-symbols-outlined text-3xl text-fithae-pink">fitness_center</span>
                <span class="font-label-bold text-label-bold">Fitness Center</span>
              </div>
              <div class="flex flex-col items-start gap-sm">
                <span class="material-symbols-outlined text-3xl text-fithae-pink">restaurant</span>
                <span class="font-label-bold text-label-bold">Fine Dining</span>
              </div>
            </div>
          </section>

          <!-- Reviews Feed -->
          <section>
            <div class="flex items-center justify-between mb-lg">
              <h2 class="font-headline-md text-headline-md">Guest Perspectives ({{ reviews.length }})</h2>
              <div class="flex gap-2">
                 <button class="bg-surface-container-high px-4 py-2 rounded-lg font-label-bold text-sm">Most Recent</button>
                 <button class="bg-surface-container-high px-4 py-2 rounded-lg font-label-bold text-sm">Highest Rated</button>
              </div>
            </div>

            <div class="space-y-lg">
              <article *ngFor="let review of reviews" class="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between mb-md">
                  <div class="flex items-center gap-md">
                    <img [src]="'https://ui-avatars.com/api/?name=' + review.username + '&background=random'" alt="Reviewer" class="w-12 h-12 rounded-full border border-outline-variant">
                    <div>
                      <h4 class="font-label-bold text-label-bold">{{ review.username }}</h4>
                      <p class="font-body-sm text-body-sm text-on-surface-variant">{{ review.createdAt | date:'mediumDate' }} • Verified Guest</p>
                    </div>
                  </div>
                  <div class="flex gap-xs">
                    <span *ngFor="let s of [1,2,3,4,5]" class="material-symbols-outlined" 
                          [class.filled-star]="review.rating >= s" [class.unfilled-star]="review.rating < s">star</span>
                  </div>
                </div>
                <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">{{ review.comment }}</p>
              </article>
              
              <div *ngIf="reviews.length === 0" class="text-center py-10 bg-surface-container-low rounded-xl border border-dashed border-outline-variant">
                 <p class="text-on-surface-variant italic">Be the first to share your "Fit" experience!</p>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar Review Form -->
        <aside class="col-span-12 lg:col-span-4 space-y-lg">
          <div class="sticky top-[100px] bg-primary-container p-xl rounded-xl text-white shadow-xl">
            <h3 class="font-headline-md text-headline-md mb-md">Share Your Experience</h3>
            <p class="font-body-md opacity-80 mb-lg">Your insights help others find the perfect stay. Every verified review contributes to our community.</p>
            
            <div *ngIf="successMsg" class="mb-4 p-3 bg-green-500/20 text-green-300 rounded-lg text-sm border border-green-500/30">
               {{ successMsg }}
            </div>
            <div *ngIf="errorMsg" class="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm border border-red-500/30">
               {{ errorMsg }}
            </div>

            <form (submit)="submitReview()" class="space-y-4">
              <div *ngIf="!isLoggedIn()">
                <label class="block font-label-bold text-sm mb-1">Guest Name</label>
                <input type="text" [(ngModel)]="newReview.username" name="username" required
                       class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white outline-none focus:ring-2 focus:ring-fithae-yellow" placeholder="Your name">
              </div>
              
              <div>
                <label class="block font-label-bold text-sm mb-1">Fit Rating</label>
                <div class="flex gap-2">
                  <span *ngFor="let s of [1,2,3,4,5]" 
                        class="material-symbols-outlined text-3xl cursor-pointer transition-transform hover:scale-110"
                        [class.filled-star]="newReview.rating >= s" [class.unfilled-star]="newReview.rating < s"
                        (click)="newReview.rating = s">star</span>
                </div>
              </div>

              <div>
                <label class="block font-label-bold text-sm mb-1">Your Story</label>
                <textarea [(ngModel)]="newReview.comment" name="comment" required
                          class="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white outline-none focus:ring-2 focus:ring-fithae-yellow h-32 resize-none" 
                          placeholder="What made your stay exceptional?"></textarea>
              </div>

              <button type="submit" [disabled]="submitting"
                      class="w-full py-4 bg-fithae-yellow text-on-surface rounded-xl font-label-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg font-bold">
                {{ submitting ? 'Publishing...' : 'Publish Review' }}
              </button>
              <p class="text-[10px] text-center opacity-50 uppercase tracking-widest mt-2">Verified by FitHae Shield</p>
            </form>
          </div>
          
          <div class="bg-surface-container-low p-lg rounded-xl">
             <h4 class="font-label-bold mb-3">Hotel Info</h4>
             <ul class="space-y-2 text-sm text-on-surface-variant">
                <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs">call</span> +92 51 1234567</li>
                <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs">mail</span> info&#64;{{ (hotel?.name || 'hotel').split(' ')[0].toLowerCase() }}.com</li>
                <li class="flex items-center gap-2"><span class="material-symbols-outlined text-xs">language</span> www.{{ (hotel?.name || 'hotel').split(' ')[0].toLowerCase() }}.com.pk</li>
             </ul>
          </div>
        </aside>
      </div>
    </main>
  `,
  styles: [`
    .filled-star { color: #FACC15; font-variation-settings: 'FILL' 1; }
    .unfilled-star { color: #E2E8F0; }
  `]
})
export class HotelDetailComponent implements OnInit {
  hotel: any;
  reviews: any[] = [];
  submitting: boolean = false;
  successMsg: string = '';
  errorMsg: string = '';
  showFitHae: boolean = false;

  newReview = {
    username: '',
    rating: 5,
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getHotelById(id).subscribe(data => {
        this.hotel = data;
      });
      this.fetchReviews(id);
    }
  }

  fetchReviews(hotelId: string) {
    this.api.getReviews(hotelId).subscribe(data => {
      this.reviews = data;
    });
  }

  isLoggedIn() { return this.api.isLoggedIn(); }

  submitReview() {
    if (!this.hotel) return;
    this.submitting = true;
    this.successMsg = '';
    this.errorMsg = '';

    const payload = {
      hotelId: this.hotel.id,
      rating: this.newReview.rating,
      comment: this.newReview.comment,
      username: this.isLoggedIn() ? undefined : this.newReview.username
    };

    this.api.postReview(payload).subscribe({
      next: (res) => {
        if (payload.rating === 5) {
          this.showFitHae = true;
          setTimeout(() => this.showFitHae = false, 3000);
        }
        this.successMsg = 'Review posted successfully!';
        this.fetchReviews(this.hotel.id);
        this.newReview = { username: '', rating: 5, comment: '' };
        this.submitting = false;
      },
      error: (err) => {
        this.errorMsg = err.error.message || 'Error posting review.';
        this.submitting = false;
      }
    });
  }
}

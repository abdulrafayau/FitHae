import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-50">
      <!-- Image Banner -->
      <div class="h-[40vh] md:h-[60vh] relative">
        <img [src]="hotel?.imageUrl" class="w-full h-full object-cover" alt="Banner">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div class="absolute bottom-10 left-10 text-white">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-3 py-1 bg-fithae-yellow text-slate-900 text-[10px] font-black rounded-full uppercase tracking-widest">Premium Collection</span>
            <span class="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">{{ hotel?.city }}</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-black">{{ hotel?.name }}</h1>
          <p class="text-white/70 italic mt-2">{{ hotel?.address }}</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-12">
          <div class="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">About the Property</h2>
            <p class="text-slate-600 leading-relaxed text-lg italic">"{{ hotel?.description }}"</p>
            
            <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="p-4 bg-slate-50 rounded-2xl text-center">
                <span class="material-symbols-outlined text-primary mb-2">wifi</span>
                <p class="text-xs font-bold text-slate-500">Free WiFi</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-2xl text-center">
                <span class="material-symbols-outlined text-primary mb-2">pool</span>
                <p class="text-xs font-bold text-slate-500">Premium Pool</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-2xl text-center">
                <span class="material-symbols-outlined text-primary mb-2">restaurant</span>
                <p class="text-xs font-bold text-slate-500">Dining</p>
              </div>
              <div class="p-4 bg-slate-50 rounded-2xl text-center">
                <span class="material-symbols-outlined text-primary mb-2">local_parking</span>
                <p class="text-xs font-bold text-slate-500">Free Parking</p>
              </div>
            </div>
          </div>

          <!-- Reviews Section -->
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-3xl font-bold text-slate-900">User Experiences</h2>
              <span class="px-4 py-2 bg-slate-200 text-slate-600 rounded-full text-xs font-bold">{{ reviews.length }} Reviews</span>
            </div>

            <div *ngFor="let review of reviews" class="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
              <div class="flex justify-between items-start mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {{ review.username[0].toUpperCase() }}
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900">{{ review.username }}</h4>
                    <p class="text-[10px] text-slate-400">{{ review.createdAt | date:'mediumDate' }}</p>
                  </div>
                </div>
                <div class="flex text-fithae-yellow">
                   <span *ngFor="let s of [1,2,3,4,5]" class="material-symbols-outlined text-sm" 
                         [style.font-variation-settings]="'\\'FILL\\' ' + (s <= review.rating ? 1 : 0)">star</span>
                </div>
              </div>
              <p class="text-slate-600 italic">"{{ review.comment }}"</p>
            </div>
          </div>
        </div>

        <!-- Sidebar (Review Form) -->
        <div class="space-y-8">
          <div class="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-8">
            <h3 class="text-2xl font-bold mb-6">Leave a Review</h3>
            
            <form (ngSubmit)="onPostReview()" class="space-y-4">
              <div>
                <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Experience Score</label>
                <div class="flex gap-2">
                  <button type="button" *ngFor="let r of [1,2,3,4,5]" (click)="newReview.rating = r"
                    class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all"
                    [class.bg-fithae-yellow]="newReview.rating >= r" [class.text-slate-900]="newReview.rating >= r">
                    {{ r }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Display Name</label>
                <input type="text" name="username" [(ngModel)]="newReview.username" 
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-fithae-yellow transition-all">
              </div>

              <div>
                <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Your Story</label>
                <textarea name="comment" [(ngModel)]="newReview.comment" rows="4"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-fithae-yellow transition-all"
                  placeholder="Tell us about your stay..."></textarea>
              </div>

              <div *ngIf="message" class="p-3 bg-white/10 rounded-lg text-xs border border-white/10" [class.text-red-400]="isError" [class.text-fithae-yellow]="!isError">
                {{ message }}
              </div>

              <button type="submit" [disabled]="loading"
                class="w-full py-4 bg-fithae-yellow text-slate-900 rounded-xl font-black hover:bg-white transition-all shadow-lg">
                {{ loading ? 'POSTING...' : 'SUBMIT REVIEW' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HotelDetailComponent implements OnInit {
  hotel: any;
  reviews: any[] = [];
  newReview = {
    username: '',
    rating: 5,
    comment: ''
  };
  loading = false;
  message = '';
  isError = false;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getHotelById(id).subscribe(res => this.hotel = res);
      this.api.getReviews(id).subscribe(res => this.reviews = res);
    }
    
    const user = this.api.getCurrentUser();
    if (user) {
      this.newReview.username = user.fullName || user.username;
    }
  }

  onPostReview() {
    this.loading = true;
    this.message = '';
    const user = this.api.getCurrentUser();
    const reviewData = {
      ...this.newReview,
      hotelId: this.hotel._id,
      userId: user ? user.id : null
    };

    this.api.postReview(reviewData).subscribe({
      next: (res) => {
        this.reviews.unshift(res);
        this.newReview.comment = '';
        this.message = 'Review posted successfully!';
        this.isError = false;
        this.loading = false;
      },
      error: (err) => {
        this.message = err.error?.message || 'Error posting review.';
        this.isError = true;
        this.loading = false;
      }
    });
  }
}

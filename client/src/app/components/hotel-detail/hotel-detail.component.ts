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
    <div class="min-h-screen bg-slate-50 cursor-custom pt-24">
      <!-- Image Banner -->
      <div class="h-[40vh] md:h-[60vh] relative overflow-hidden mt-2 rounded-t-[3rem] mx-4 md:mx-6 shadow-2xl">
        <img [src]="hotel?.imageUrl" class="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" alt="Banner">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div class="absolute bottom-10 left-10 text-white z-10">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-3 py-1 bg-fithae-yellow text-slate-900 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">Premium Dining</span>
            <span class="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">{{ hotel?.city }}</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-black tracking-tight">{{ hotel?.name }}</h1>
          <p class="text-white/80 italic mt-2 text-lg">{{ hotel?.address }}</p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-12">
          
          <!-- Best Item Highlight -->
          <div *ngIf="popularItem" class="bg-gradient-to-r from-fithae-yellow to-yellow-300 rounded-[2rem] p-8 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all">
            <div class="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-700">
               <span class="material-symbols-outlined text-[150px]">restaurant_menu</span>
            </div>
            <p class="text-slate-900 text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Community Favorite</p>
            <h3 class="text-3xl font-black text-slate-900">Must Try: {{ popularItem }}</h3>
          </div>

          <div class="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 transition-all hover:shadow-2xl">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">About the Restaurant</h2>
            <p class="text-slate-600 leading-relaxed text-lg italic">"{{ hotel?.description }}"</p>
            
            <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="p-5 bg-slate-50 rounded-2xl text-center group hover:bg-slate-900 transition-colors">
                <span class="material-symbols-outlined text-primary mb-2 group-hover:text-fithae-yellow transition-colors">restaurant</span>
                <p class="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">Fine Dining</p>
              </div>
              <div class="p-5 bg-slate-50 rounded-2xl text-center group hover:bg-slate-900 transition-colors">
                <span class="material-symbols-outlined text-primary mb-2 group-hover:text-fithae-yellow transition-colors">local_cafe</span>
                <p class="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">Premium Cafe</p>
              </div>
              <div class="p-5 bg-slate-50 rounded-2xl text-center group hover:bg-slate-900 transition-colors">
                <span class="material-symbols-outlined text-primary mb-2 group-hover:text-fithae-yellow transition-colors">deck</span>
                <p class="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">Outdoor Seating</p>
              </div>
              <div class="p-5 bg-slate-50 rounded-2xl text-center group hover:bg-slate-900 transition-colors">
                <span class="material-symbols-outlined text-primary mb-2 group-hover:text-fithae-yellow transition-colors">local_parking</span>
                <p class="text-xs font-bold text-slate-500 group-hover:text-white transition-colors">Valet Parking</p>
              </div>
            </div>
          </div>

          <!-- Reviews Section -->
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-3xl font-bold text-slate-900 tracking-tight">Customer Experiences</h2>
              <span class="px-4 py-2 bg-slate-200 text-slate-600 rounded-full text-xs font-bold">{{ reviews.length }} Verified Reviews</span>
            </div>

            <div *ngFor="let review of reviews" class="bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex justify-between items-start mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                    {{ review.username[0].toUpperCase() }}
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 text-lg">{{ review.username }}</h4>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ review.createdAt | date:'mediumDate' }}</p>
                  </div>
                </div>
              </div>
              
              <div class="flex flex-wrap gap-4 mb-4">
                <div class="bg-slate-50 px-3 py-2 rounded-xl flex items-center gap-2 border border-slate-100">
                  <span class="material-symbols-outlined text-sm text-fithae-yellow fill-1">restaurant</span>
                  <div>
                    <div class="text-[10px] font-bold text-slate-400 uppercase">Food</div>
                    <div class="text-sm font-black text-slate-900">{{ review.foodRating }}/5</div>
                  </div>
                </div>
                <div class="bg-slate-50 px-3 py-2 rounded-xl flex items-center gap-2 border border-slate-100">
                  <span class="material-symbols-outlined text-sm text-green-500 fill-1">eco</span>
                  <div>
                    <div class="text-[10px] font-bold text-slate-400 uppercase">Ambience</div>
                    <div class="text-sm font-black text-slate-900">{{ review.environmentRating }}/5</div>
                  </div>
                </div>
                <div *ngIf="review.bestItem" class="bg-fithae-yellow/10 px-3 py-2 rounded-xl flex items-center gap-2 border border-fithae-yellow/30">
                  <span class="material-symbols-outlined text-sm text-fithae-yellow">star</span>
                  <div>
                    <div class="text-[10px] font-bold text-yellow-700 uppercase">Ate</div>
                    <div class="text-sm font-black text-slate-900">{{ review.bestItem }}</div>
                  </div>
                </div>
              </div>

              <p class="text-slate-600 italic leading-relaxed">"{{ review.comment }}"</p>
            </div>
          </div>
        </div>

        <!-- Sidebar (Review Form) -->
        <div class="space-y-8">
          <div class="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-28 transition-all hover:shadow-fithae-yellow/10">
            <h3 class="text-2xl font-bold mb-6 tracking-tight">Rate Your Experience</h3>
            
            <form (ngSubmit)="onPostReview()" class="space-y-6">
              
              <!-- Food Rating -->
              <div>
                <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-fithae-yellow mb-2 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">restaurant</span> Food Quality
                </label>
                <div class="flex gap-2">
                  <button type="button" *ngFor="let r of [1,2,3,4,5]" (click)="newReview.foodRating = r"
                    class="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center transition-all hover:bg-fithae-yellow/20"
                    [class.bg-fithae-yellow]="newReview.foodRating >= r" [class.text-slate-900]="newReview.foodRating >= r"
                    [class.border-fithae-yellow]="newReview.foodRating >= r">
                    {{ r }}
                  </button>
                </div>
              </div>

              <!-- Environment Rating -->
              <div>
                <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-green-400 mb-2 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm">eco</span> Environment & Ambience
                </label>
                <div class="flex gap-2">
                  <button type="button" *ngFor="let r of [1,2,3,4,5]" (click)="newReview.environmentRating = r"
                    class="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center transition-all hover:bg-green-400/20"
                    [class.bg-green-400]="newReview.environmentRating >= r" [class.text-slate-900]="newReview.environmentRating >= r"
                    [class.border-green-400]="newReview.environmentRating >= r">
                    {{ r }}
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2 mt-4">Display Name</label>
                <input type="text" name="username" [(ngModel)]="newReview.username" 
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-fithae-yellow focus:bg-white/10 transition-all font-medium text-white placeholder:text-white/30" placeholder="e.g. Guest">
              </div>

              <div>
                <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Best Item You Ate (Optional)</label>
                <input type="text" name="bestItem" [(ngModel)]="newReview.bestItem" 
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-fithae-yellow focus:bg-white/10 transition-all font-medium text-white placeholder:text-white/30" placeholder="e.g. Alfredo Pasta">
              </div>

              <div>
                <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Your Story</label>
                <textarea name="comment" [(ngModel)]="newReview.comment" rows="4" required
                  class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-fithae-yellow focus:bg-white/10 transition-all font-medium text-white placeholder:text-white/30"
                  placeholder="Tell us about the taste and atmosphere..."></textarea>
              </div>

              <div *ngIf="message" class="p-4 bg-white/5 rounded-xl text-xs font-bold border border-white/10" [class.text-red-400]="isError" [class.text-fithae-yellow]="!isError">
                {{ message }}
              </div>

              <button type="submit" [disabled]="loading"
                class="w-full py-4 bg-fithae-yellow text-slate-900 rounded-xl font-black hover:bg-white hover:-translate-y-1 transition-all shadow-lg shadow-fithae-yellow/20">
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
  popularItem = '';
  newReview = {
    username: '',
    foodRating: 5,
    environmentRating: 5,
    bestItem: '',
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
      this.api.getReviews(id).subscribe(res => {
        // Ensure legacy reviews have values
        this.reviews = res.map((r: any) => ({
          ...r,
          foodRating: r.foodRating || r.rating || 5,
          environmentRating: r.environmentRating || r.rating || 5
        }));
        this.calculatePopularItem();
      });
    }
    
    const user = this.api.getCurrentUser();
    if (user) {
      this.newReview.username = user.fullName || user.username;
    }
  }

  calculatePopularItem() {
    const items = this.reviews.map(r => r.bestItem).filter(i => i && i.trim() !== '');
    if (items.length === 0) {
      this.popularItem = '';
      return;
    }
    
    const frequency: any = {};
    let maxFreq = 0;
    let mostPopular = '';

    for (const item of items) {
      const formattedItem = item.toLowerCase().trim();
      frequency[formattedItem] = (frequency[formattedItem] || 0) + 1;
      if (frequency[formattedItem] > maxFreq) {
        maxFreq = frequency[formattedItem];
        mostPopular = item; // Keep original casing
      }
    }
    this.popularItem = mostPopular;
  }

  onPostReview() {
    if(!this.newReview.comment) return;
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
        this.calculatePopularItem();
        this.newReview.comment = '';
        this.newReview.bestItem = '';
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

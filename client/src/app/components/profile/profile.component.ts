import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-50 py-12 px-4">
      <div class="max-w-4xl mx-auto space-y-8">
        
        <!-- Profile Header -->
        <div class="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div class="relative">
            <img [src]="user?.profilePicture" class="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg" alt="Profile">
            <span class="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></span>
          </div>
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold text-slate-900">{{ user?.fullName }}</h1>
            <p class="text-primary font-medium">@{{ user?.username }}</p>
            <div class="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500 italic">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">mail</span> {{ user?.email }}</span>
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">call</span> {{ user?.contact }}</span>
            </div>
          </div>
          <button (click)="logout()" class="px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold hover:bg-red-100 transition-colors border border-red-100">
            Logout
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Password Change Section -->
          <div class="lg:col-span-1 bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
            <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">lock</span> Change Password
            </h3>
            
            <form (ngSubmit)="onChangePassword()" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Old Password</label>
                <input type="password" name="oldPassword" [(ngModel)]="passwordData.oldPassword" required
                  class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">New Password</label>
                <input type="password" name="newPassword" [(ngModel)]="passwordData.newPassword" required
                  class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none">
              </div>

              <div *ngIf="message" [class]="isError ? 'text-red-500 bg-red-50' : 'text-green-600 bg-green-50'" class="text-xs p-3 rounded-lg border">
                {{ message }}
              </div>

              <button type="submit" [disabled]="loading"
                class="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg">
                {{ loading ? 'Updating...' : 'Update Password' }}
              </button>
            </form>
          </div>

          <!-- Activity Section -->
          <div class="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
             <div class="flex items-center justify-between mb-8">
               <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                 <span class="material-symbols-outlined text-primary">rate_review</span> My Review History
               </h3>
               <span class="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                 {{ reviews.length }} Reviews
               </span>
             </div>

             <div *ngIf="reviews.length === 0" class="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
               <span class="material-symbols-outlined text-4xl text-slate-200 mb-2">history</span>
               <p class="text-slate-400 italic">No reviews posted yet.</p>
             </div>

             <div class="space-y-4">
               <div *ngFor="let review of reviews" class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                 <div class="flex justify-between items-start mb-2">
                   <h4 class="font-bold text-slate-900">{{ review.hotelName || 'FitHae Premium Stay' }}</h4>
                   <div class="flex text-fithae-yellow">
                     <span *ngFor="let s of [1,2,3,4,5]" class="material-symbols-outlined text-sm" 
                           [style.font-variation-settings]="'\\'FILL\\' ' + (s <= review.rating ? 1 : 0)">star</span>
                   </div>
                 </div>
                 <p class="text-slate-600 text-sm italic">"{{ review.comment }}"</p>
                 <span class="text-[10px] text-slate-400 mt-2 block">{{ review.createdAt | date:'mediumDate' }}</span>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: any;
  reviews: any[] = [];
  passwordData = { oldPassword: '', newPassword: '' };
  loading = false;
  message = '';
  isError = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.api.getProfile().subscribe({
      next: (res) => {
        this.user = res.user;
        this.reviews = res.reviews;
        // Update local storage with full details
        localStorage.setItem('user', JSON.stringify(this.user));
      },
      error: () => this.router.navigate(['/login'])
    });
  }

  onChangePassword() {
    this.loading = true;
    this.message = '';
    this.api.changePassword(this.passwordData).subscribe({
      next: (res) => {
        this.message = 'Password changed successfully!';
        this.isError = false;
        this.loading = false;
        this.passwordData = { oldPassword: '', newPassword: '' };
      },
      error: (err) => {
        this.message = err.error?.message || 'Failed to update password.';
        this.isError = true;
        this.loading = false;
      }
    });
  }

  logout() {
    this.api.logout();
    this.router.navigate(['/login']);
  }
}

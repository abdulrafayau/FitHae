import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-50 py-12 px-6">
      <div class="max-w-7xl mx-auto space-y-8">
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 class="text-4xl font-black text-slate-900">Admin Control Center</h1>
            <p class="text-slate-500 italic mt-1">Manage Properties, Reviews, and Users.</p>
          </div>
          <div class="flex gap-2">
            <button (click)="currentTab = 'properties'" [class.bg-slate-900]="currentTab === 'properties'" [class.text-white]="currentTab === 'properties'" class="px-6 py-2 rounded-xl font-bold transition-all border border-slate-200 hover:bg-slate-100">Properties</button>
            <button (click)="currentTab = 'reviews'" [class.bg-slate-900]="currentTab === 'reviews'" [class.text-white]="currentTab === 'reviews'" class="px-6 py-2 rounded-xl font-bold transition-all border border-slate-200 hover:bg-slate-100">Reviews</button>
            <button (click)="currentTab = 'users'" [class.bg-slate-900]="currentTab === 'users'" [class.text-white]="currentTab === 'users'" class="px-6 py-2 rounded-xl font-bold transition-all border border-slate-200 hover:bg-slate-100">Users</button>
          </div>
        </div>

        <!-- Properties Tab -->
        <div *ngIf="currentTab === 'properties'" class="space-y-8 animate-in fade-in duration-300">
          <div class="flex justify-end">
            <button (click)="showAddForm = !showAddForm" 
              class="px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center gap-2">
              <span class="material-symbols-outlined">{{ showAddForm ? 'close' : 'add' }}</span>
              {{ showAddForm ? 'Close Form' : 'Register New Hotel' }}
            </button>
          </div>

          <!-- Add Hotel Form -->
          <div *ngIf="showAddForm" class="bg-white rounded-[2rem] shadow-2xl p-8 lg:p-12 border border-primary/10">
            <h2 class="text-2xl font-bold text-slate-900 mb-8">Hotel Registration</h2>
            <form (ngSubmit)="onRegisterHotel()" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="lg:col-span-2">
                <label class="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">Hotel Name</label>
                <input type="text" name="name" [(ngModel)]="hotelData.name" required
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-lg font-bold">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">City</label>
                <select name="city" [(ngModel)]="hotelData.city" required
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold">
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                </select>
              </div>
              <div class="lg:col-span-3">
                <label class="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">Full Address</label>
                <input type="text" name="address" [(ngModel)]="hotelData.address" required
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none">
              </div>
              <div class="lg:col-span-3">
                <label class="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">Description</label>
                <textarea name="description" [(ngModel)]="hotelData.description" rows="3"
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none"></textarea>
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">Image URL</label>
                <input type="text" name="imageUrl" [(ngModel)]="hotelData.imageUrl"
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">Price Range</label>
                <select name="priceRange" [(ngModel)]="hotelData.priceRange"
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold">
                  <option value="$">$ Budget</option>
                  <option value="$$">$$ Moderate</option>
                  <option value="$$$">$$$ Premium</option>
                  <option value="$$$$">$$$$ Luxury</option>
                </select>
              </div>
              <div class="flex items-end">
                <button type="submit" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl">
                  SAVE PROPERTY
                </button>
              </div>
            </form>
          </div>

          <!-- Hotels List -->
          <div class="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 class="text-2xl font-bold text-slate-900">Manage Properties</h2>
              <div class="flex items-center gap-2 text-slate-400 text-sm">
                <span class="material-symbols-outlined text-sm">info</span> {{ hotels.length }} total active listings
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th class="px-8 py-4">Property</th>
                    <th class="px-8 py-4">Location</th>
                    <th class="px-8 py-4">Status</th>
                    <th class="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr *ngFor="let hotel of hotels" class="hover:bg-slate-50/50 transition-colors">
                    <td class="px-8 py-6">
                      <div class="flex items-center gap-4">
                        <img [src]="hotel.imageUrl" class="w-12 h-12 rounded-xl object-cover" alt="Thumb">
                        <div>
                          <div class="font-bold text-slate-900 text-lg">{{ hotel.name }}</div>
                          <div class="text-xs text-slate-400 italic">{{ hotel.priceRange }} • {{ hotel.rating }} ★</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-8 py-6">
                      <div class="text-slate-600 font-medium">{{ hotel.city }}</div>
                      <div class="text-[10px] text-slate-400 max-w-[200px] truncate">{{ hotel.address }}</div>
                    </td>
                    <td class="px-8 py-6">
                      <span *ngIf="hotel.isSponsored" class="px-3 py-1 bg-fithae-yellow text-slate-900 text-[10px] font-black rounded-full">SPONSORED</span>
                      <span *ngIf="!hotel.isSponsored" class="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-black rounded-full">STANDARD</span>
                    </td>
                    <td class="px-8 py-6 text-right">
                      <div class="flex justify-end gap-2">
                        <button (click)="onSponsor(hotel._id)" class="p-2 text-slate-400 hover:text-primary transition-colors" title="Boost Post">
                          <span class="material-symbols-outlined">rocket_launch</span>
                        </button>
                        <button (click)="deleteHotel(hotel._id)" class="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Delete Property">
                          <span class="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Reviews Tab -->
        <div *ngIf="currentTab === 'reviews'" class="space-y-8 animate-in fade-in duration-300">
           <div class="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 class="text-2xl font-bold text-slate-900">Manage Global Reviews</h2>
              <div class="flex items-center gap-2 text-slate-400 text-sm">
                <span class="material-symbols-outlined text-sm">rate_review</span> {{ reviews.length }} total reviews
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th class="px-8 py-4">User</th>
                    <th class="px-8 py-4">Hotel</th>
                    <th class="px-8 py-4">Rating & Comment</th>
                    <th class="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr *ngFor="let review of reviews" class="hover:bg-slate-50/50 transition-colors">
                    <td class="px-8 py-6">
                      <div class="font-bold text-slate-900">{{ review.username }}</div>
                      <div class="text-[10px] text-slate-400">{{ review.createdAt | date:'short' }}</div>
                    </td>
                    <td class="px-8 py-6">
                      <div class="text-slate-600 font-medium max-w-[150px] truncate">{{ review.hotelId?.name || 'Unknown' }}</div>
                    </td>
                    <td class="px-8 py-6">
                      <div class="flex text-fithae-yellow mb-1">
                        <span *ngFor="let s of [1,2,3,4,5]" class="material-symbols-outlined text-sm" 
                              [style.font-variation-settings]="'\\'FILL\\' ' + (s <= review.rating ? 1 : 0)">star</span>
                      </div>
                      <div class="text-sm text-slate-600 italic max-w-md truncate">"{{ review.comment }}"</div>
                    </td>
                    <td class="px-8 py-6 text-right">
                      <button (click)="deleteReview(review._id)" class="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Delete Review">
                        <span class="material-symbols-outlined">delete</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Users Tab -->
        <div *ngIf="currentTab === 'users'" class="space-y-8 animate-in fade-in duration-300">
           <div class="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 class="text-2xl font-bold text-slate-900">Manage Users</h2>
              <div class="flex items-center gap-2 text-slate-400 text-sm">
                <span class="material-symbols-outlined text-sm">group</span> {{ users.length }} registered users
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th class="px-8 py-4">User Details</th>
                    <th class="px-8 py-4">Role</th>
                    <th class="px-8 py-4">Joined</th>
                    <th class="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr *ngFor="let user of users" class="hover:bg-slate-50/50 transition-colors">
                    <td class="px-8 py-6">
                      <div class="flex items-center gap-4">
                        <img [src]="user.profilePicture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'" class="w-10 h-10 rounded-full object-cover">
                        <div>
                          <div class="font-bold text-slate-900">{{ user.fullName }} <span class="text-xs text-slate-400 font-normal">(&#64;{{ user.username }})</span></div>
                          <div class="text-xs text-slate-500">{{ user.email }} • {{ user.contact }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-8 py-6">
                      <span *ngIf="user.role === 'admin'" class="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest">Admin</span>
                      <span *ngIf="user.role !== 'admin'" class="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-widest">User</span>
                    </td>
                    <td class="px-8 py-6">
                      <div class="text-sm text-slate-600">{{ user.createdAt | date:'mediumDate' }}</div>
                    </td>
                    <td class="px-8 py-6 text-right">
                      <button *ngIf="user.role !== 'admin'" (click)="deleteUser(user._id)" class="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Delete User">
                        <span class="material-symbols-outlined">person_remove</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  currentTab: 'properties' | 'reviews' | 'users' = 'properties';
  
  hotels: any[] = [];
  reviews: any[] = [];
  users: any[] = [];
  
  showAddForm = false;
  hotelData = {
    name: '',
    city: 'Islamabad',
    address: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
    priceRange: '$$$'
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() {
    this.loadHotels();
    this.loadReviews();
    this.loadUsers();
  }

  // --- Properties ---
  loadHotels() {
    this.api.getHotels().subscribe(res => this.hotels = res);
  }

  onRegisterHotel() {
    this.api.registerHotel(this.hotelData).subscribe({
      next: (res) => {
        alert('Hotel registered successfully!');
        this.showAddForm = false;
        this.loadHotels();
        this.hotelData = { name: '', city: 'Islamabad', address: '', description: '', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3', priceRange: '$$$' };
      },
      error: (err) => alert('Registration failed: ' + (err.error?.message || 'Unknown error'))
    });
  }

  onSponsor(id: string) {
    const days = prompt('Enter sponsorship duration in days:', '7');
    if (days) {
      this.api.sponsorHotel(id, parseInt(days)).subscribe({
        next: () => {
          alert('Sponsorship updated!');
          this.loadHotels();
        },
        error: (err) => alert('Failed: ' + (err.error?.message || 'Unauthorized'))
      });
    }
  }

  deleteHotel(id: string) {
    if (confirm('Are you sure you want to completely delete this property? This will also remove all its reviews.')) {
      this.api.deleteHotel(id).subscribe({
        next: () => {
          this.loadHotels();
          this.loadReviews(); // Refresh reviews too
        },
        error: (err) => alert('Delete failed: ' + (err.error?.message || 'Unauthorized'))
      });
    }
  }

  // --- Reviews ---
  loadReviews() {
    this.api.getAllReviews().subscribe({
      next: (res) => this.reviews = res,
      error: (err) => console.log('Reviews fetch failed', err)
    });
  }

  deleteReview(id: string) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.api.deleteReview(id).subscribe({
        next: () => this.loadReviews(),
        error: (err) => alert('Delete failed: ' + (err.error?.message || 'Unauthorized'))
      });
    }
  }

  // --- Users ---
  loadUsers() {
    this.api.getAllUsers().subscribe({
      next: (res) => this.users = res,
      error: (err) => console.log('Users fetch failed', err)
    });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user? This cannot be undone.')) {
      this.api.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => alert('Delete failed: ' + (err.error?.message || 'Unauthorized'))
      });
    }
  }
}

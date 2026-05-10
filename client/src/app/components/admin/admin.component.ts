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
        
        <div class="flex items-center justify-between">
          <h1 class="text-4xl font-bold text-slate-900">Admin Control Center</h1>
          <button (click)="showAddForm = !showAddForm" 
            class="px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center gap-2">
            <span class="material-symbols-outlined">{{ showAddForm ? 'close' : 'add' }}</span>
            {{ showAddForm ? 'Close Form' : 'Register New Hotel' }}
          </button>
        </div>

        <!-- Add Hotel Form -->
        <div *ngIf="showAddForm" class="bg-white rounded-[2rem] shadow-2xl p-8 lg:p-12 border border-primary/10 animate-in fade-in slide-in-from-top-4 duration-500">
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
                      <button (click)="downloadQR(hotel._id, hotel.name)" class="p-2 text-slate-400 hover:text-slate-900 transition-colors" title="Get QR">
                        <span class="material-symbols-outlined">qr_code_2</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  hotels: any[] = [];
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
    this.loadHotels();
  }

  loadHotels() {
    this.api.getHotels().subscribe(res => this.hotels = res);
  }

  onRegisterHotel() {
    this.api.registerHotel(this.hotelData).subscribe({
      next: (res) => {
        alert('Hotel registered successfully!');
        this.showAddForm = false;
        this.loadHotels();
        this.hotelData = { name: '', city: 'Islamabad', address: '', description: '', imageUrl: '', priceRange: '$$$' };
      },
      error: (err) => alert('Registration failed: ' + err.error?.message)
    });
  }

  onSponsor(id: string) {
    const days = prompt('Enter sponsorship duration in days:', '7');
    if (days) {
      this.api.sponsorHotel(id, parseInt(days)).subscribe(() => {
        alert('Sponsorship updated!');
        this.loadHotels();
      });
    }
  }

  downloadQR(id: string, name: string) {
    const url = `${window.location.origin}/hotel/${id}`;
    // Simple alert for now, in a real app would use a QR generator lib
    alert(`QR Code Link for ${name}:\n${url}\n\n(Asset ready for export)`);
  }
}

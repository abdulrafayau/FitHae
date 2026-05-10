import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeComponent],
  template: `
    <div class="min-h-screen flex bg-surface">
      <!-- Sidebar -->
      <aside class="h-full w-[280px] fixed left-0 top-0 flex flex-col bg-primary-container shadow-xl z-50 p-md gap-sm text-white">
        <div class="px-md py-lg mb-md">
          <h1 class="font-headline-sm text-headline-sm text-fithae-yellow font-bold tracking-tight text-2xl">FitHae</h1>
          <p class="font-body-sm opacity-60">Admin Console</p>
        </div>

        <div class="flex items-center gap-md p-md mb-lg bg-white/10 rounded-xl">
          <div class="w-10 h-10 rounded-full bg-fithae-pink flex items-center justify-center">
            <span class="material-symbols-outlined">admin_panel_settings</span>
          </div>
          <div class="overflow-hidden">
            <h3 class="font-label-bold text-sm truncate">{{ adminName }}</h3>
            <p class="text-[10px] uppercase tracking-widest opacity-60 font-bold">System Root</p>
          </div>
        </div>

        <nav class="flex-1 flex flex-col gap-xs">
          <a class="flex items-center gap-md p-md rounded-lg font-label-bold bg-fithae-pink text-white transition-all">
            <span class="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a class="flex items-center gap-md p-md rounded-lg font-label-bold opacity-60 hover:opacity-100 hover:bg-white/5 transition-all">
            <span class="material-symbols-outlined">hotel</span>
            <span>Hotels</span>
          </a>
          <a class="flex items-center gap-md p-md rounded-lg font-label-bold opacity-60 hover:opacity-100 hover:bg-white/5 transition-all">
            <span class="material-symbols-outlined">qr_code_2</span>
            <span>QR Assets</span>
          </a>
        </nav>

        <button (click)="logout()" class="mt-auto w-full bg-white/10 text-white p-md rounded-xl font-label-bold flex items-center justify-center gap-sm hover:bg-red-500 transition-colors">
          <span class="material-symbols-outlined">logout</span> Log Out
        </button>
      </aside>

      <!-- Main Canvas -->
      <main class="flex-1 ml-[280px] overflow-y-auto bg-surface h-screen">
        <header class="sticky top-0 z-40 bg-surface/80 backdrop-blur-md shadow-sm h-xxl flex items-center justify-between px-xl py-8">
          <div class="flex flex-col">
            <h2 class="font-headline-md text-headline-md text-primary text-2xl font-bold">System Overview</h2>
            <span class="font-body-sm text-on-surface-variant">Manage your hospitality network performance.</span>
          </div>
          <div class="flex items-center gap-md">
             <div class="bg-fithae-pink/10 text-fithae-pink px-4 py-2 rounded-full font-bold text-sm">
                Live Data Connected
             </div>
          </div>
        </header>

        <div class="p-xl space-y-lg">
          <!-- Stats -->
          <section class="grid grid-cols-1 md:grid-cols-4 gap-lg p-8">
            <div class="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30">
              <span class="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Total Hotels</span>
              <div class="flex items-end justify-between mt-2">
                <span class="text-3xl font-bold">{{ hotels.length }}</span>
                <span class="text-fithae-pink font-bold">+143 API</span>
              </div>
            </div>
            <div class="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30">
              <span class="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Active Ads</span>
              <div class="flex items-end justify-between mt-2">
                <span class="text-3xl font-bold">{{ getSponsoredCount() }}</span>
                <span class="text-fithae-yellow font-bold">Premium</span>
              </div>
            </div>
          </section>

          <!-- Main Actions -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 px-8">
            <!-- Left: Hotel List -->
            <div class="lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
               <div class="p-6 border-b border-outline-variant/30 flex justify-between items-center">
                  <h3 class="font-bold text-lg">Manage Network</h3>
                  <div class="flex gap-2">
                     <button class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold">Add Manual Stay</button>
                  </div>
               </div>
               <div class="overflow-x-auto">
                 <table class="w-full text-left">
                   <thead class="bg-surface-container-low text-xs uppercase tracking-widest text-on-surface-variant font-bold">
                     <tr>
                       <th class="p-4">Hotel Entity</th>
                       <th class="p-4">Status</th>
                       <th class="p-4 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody class="text-sm">
                     <tr *ngFor="let hotel of hotels" class="border-t border-outline-variant/20 hover:bg-surface-container-low/50 transition-all">
                       <td class="p-4">
                         <div class="font-bold">{{ hotel.name }}</div>
                         <div class="text-[10px] opacity-60">{{ hotel.city }}</div>
                       </td>
                       <td class="p-4">
                         <span *ngIf="hotel.isSponsored" class="px-3 py-1 bg-fithae-yellow/20 text-on-surface rounded-full text-[10px] font-bold">SPONSORED</span>
                         <span *ngIf="!hotel.isSponsored" class="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold">STANDARD</span>
                       </td>
                       <td class="p-4 text-right">
                         <button (click)="promoteHotel(hotel)" class="text-fithae-pink font-bold hover:underline mr-4 text-xs">Promote</button>
                         <button (click)="generateQR(hotel)" class="bg-primary text-white px-3 py-1 rounded text-xs">QR</button>
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </div>

            <!-- Right: QR Asset Generator -->
            <div class="lg:col-span-4 space-y-8">
               <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30" *ngIf="selectedHotel">
                  <h3 class="font-bold mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-fithae-pink">qr_code_scanner</span> Asset Preview
                  </h3>
                  <div class="bg-primary-container p-6 rounded-xl flex flex-col items-center gap-4">
                    <div class="bg-white p-4 rounded-xl shadow-lg border-4 border-fithae-yellow/30">
                       <qrcode [qrdata]="qrUrl" [width]="200" [errorCorrectionLevel]="'M'"></qrcode>
                    </div>
                    <div class="text-center">
                       <p class="text-white font-bold text-sm">{{ selectedHotel.name }}</p>
                       <p class="text-white/60 text-[10px] uppercase tracking-widest mt-1">Review Landing Asset</p>
                    </div>
                  </div>
                  <button class="w-full mt-6 py-3 bg-fithae-pink text-white rounded-xl font-bold text-sm shadow-lg shadow-fithae-pink/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Download High-Res SVG
                  </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class AdminComponent implements OnInit {
  hotels: any[] = [];
  adminName = 'Abdul Rafay';
  selectedHotel: any;
  qrUrl: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels() {
    this.api.getHotels().subscribe(data => {
      this.hotels = data;
    });
  }

  getSponsoredCount() {
    return this.hotels.filter(h => h.isSponsored).length;
  }

  promoteHotel(hotel: any) {
    const days = prompt(`Enter number of days to sponsor ${hotel.name}:`, '7');
    if (days && !isNaN(parseInt(days))) {
      this.api.sponsorHotel(hotel.id, parseInt(days)).subscribe({
        next: () => {
          alert(`${hotel.name} is now sponsored!`);
          this.loadHotels();
        },
        error: (err) => alert('Error updating sponsorship.')
      });
    }
  }

  generateQR(hotel: any) {
    this.selectedHotel = hotel;
    this.qrUrl = `${window.location.origin}/hotel/${hotel.id}`;
  }

  logout() { this.api.logout(); }
}

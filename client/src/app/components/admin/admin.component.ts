import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { QRCodeComponent } from 'angularx-qrcode'; // Import QRCode Component

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeComponent],
  template: `
    <div class="min-h-screen bg-slate-50 py-12 px-6 relative">
      <div class="max-w-7xl mx-auto space-y-8">
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 class="text-4xl font-black text-slate-900 tracking-tight">Admin Control Center</h1>
            <p class="text-slate-500 italic mt-1">Manage Restaurants, Advanced Reviews, and Users.</p>
          </div>
          <div class="flex gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
            <button (click)="currentTab = 'properties'" [class.bg-slate-900]="currentTab === 'properties'" [class.text-white]="currentTab === 'properties'" class="px-6 py-2 rounded-xl font-bold transition-all text-sm hover:bg-slate-100">Restaurants</button>
            <button (click)="currentTab = 'reviews'" [class.bg-slate-900]="currentTab === 'reviews'" [class.text-white]="currentTab === 'reviews'" class="px-6 py-2 rounded-xl font-bold transition-all text-sm hover:bg-slate-100">Reviews</button>
            <button (click)="currentTab = 'users'" [class.bg-slate-900]="currentTab === 'users'" [class.text-white]="currentTab === 'users'" class="px-6 py-2 rounded-xl font-bold transition-all text-sm hover:bg-slate-100">Users</button>
          </div>
        </div>

        <!-- Restaurants Tab -->
        <div *ngIf="currentTab === 'properties'" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="flex justify-end">
            <button (click)="showAddForm = !showAddForm" 
              class="px-6 py-3 bg-fithae-yellow text-slate-900 rounded-2xl font-black shadow-lg shadow-fithae-yellow/20 hover:scale-105 transition-all flex items-center gap-2 border border-yellow-400">
              <span class="material-symbols-outlined">{{ showAddForm ? 'close' : 'add' }}</span>
              {{ showAddForm ? 'Close Form' : 'Register New Restaurant' }}
            </button>
          </div>

          <!-- Add Form -->
          <div *ngIf="showAddForm" class="bg-white rounded-[2rem] shadow-2xl p-8 lg:p-12 border border-slate-200">
            <h2 class="text-2xl font-bold text-slate-900 mb-8">Restaurant Registration</h2>
            <form (ngSubmit)="onRegisterHotel()" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="lg:col-span-2">
                <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Restaurant Name</label>
                <input type="text" name="name" [(ngModel)]="hotelData.name" required
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-lg font-bold transition-all">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">City</label>
                <select name="city" [(ngModel)]="hotelData.city" required
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold transition-all">
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                </select>
              </div>
              <div class="lg:col-span-3">
                <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Full Address</label>
                <input type="text" name="address" [(ngModel)]="hotelData.address" required
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all">
              </div>
              <div class="lg:col-span-3">
                <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Atmosphere / Description</label>
                <textarea name="description" [(ngModel)]="hotelData.description" rows="3"
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all"></textarea>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Banner Image URL</label>
                <input type="text" name="imageUrl" [(ngModel)]="hotelData.imageUrl"
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Price Point</label>
                <select name="priceRange" [(ngModel)]="hotelData.priceRange"
                  class="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none font-bold transition-all">
                  <option value="$">$ Budget Friendly</option>
                  <option value="$$">$$ Moderate Dining</option>
                  <option value="$$$">$$$ Premium / Fine Dining</option>
                  <option value="$$$$">$$$$ Luxury Experience</option>
                </select>
              </div>
              <div class="flex items-end">
                <button type="submit" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl hover:shadow-2xl">
                  SAVE RESTAURANT
                </button>
              </div>
            </form>
          </div>

          <!-- Restaurants List -->
          <div class="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 class="text-2xl font-bold text-slate-900">Manage Restaurants</h2>
              <div class="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <span class="material-symbols-outlined text-sm">restaurant</span> {{ hotels.length }} active dining spots
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-white text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                  <tr>
                    <th class="px-8 py-5">Restaurant</th>
                    <th class="px-8 py-5">Location</th>
                    <th class="px-8 py-5">Status</th>
                    <th class="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr *ngFor="let hotel of hotels" class="hover:bg-slate-50/80 transition-colors group">
                    <td class="px-8 py-6">
                      <div class="flex items-center gap-4">
                        <img [src]="hotel.imageUrl" class="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" alt="Thumb">
                        <div>
                          <div class="font-bold text-slate-900 text-lg">{{ hotel.name }}</div>
                          <div class="text-xs text-slate-500 font-medium">{{ hotel.priceRange }} • Avg Rating: {{ hotel.rating | number:'1.1-1' }} ★</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-8 py-6">
                      <div class="text-slate-900 font-bold">{{ hotel.city }}</div>
                      <div class="text-xs text-slate-400 max-w-[200px] truncate">{{ hotel.address }}</div>
                    </td>
                    <td class="px-8 py-6">
                      <span *ngIf="hotel.isSponsored" class="px-4 py-1.5 bg-fithae-yellow/20 text-yellow-700 border border-fithae-yellow/50 text-[10px] font-black rounded-full uppercase tracking-widest">SPONSORED</span>
                      <span *ngIf="!hotel.isSponsored" class="px-4 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-widest">STANDARD</span>
                    </td>
                    <td class="px-8 py-6 text-right">
                      <div class="flex justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button (click)="onSponsor(hotel._id)" class="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm" title="Boost Post">
                          <span class="material-symbols-outlined text-sm">rocket_launch</span>
                        </button>
                        <button (click)="openQRModal(hotel._id, hotel.name)" class="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm" title="Generate Access QR">
                          <span class="material-symbols-outlined text-sm">qr_code_2</span>
                        </button>
                        <button (click)="deleteHotel(hotel._id)" class="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm" title="Delete Restaurant">
                          <span class="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Reviews Tab (Omitted for brevity in edit, similar updates to spacing and borders) -->
        <div *ngIf="currentTab === 'reviews'" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div class="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 class="text-2xl font-bold text-slate-900">Manage Granular Reviews</h2>
              <div class="flex items-center gap-2 text-slate-400 text-sm">
                <span class="material-symbols-outlined text-sm">rate_review</span> {{ reviews.length }} total reviews
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th class="px-8 py-5">User</th>
                    <th class="px-8 py-5">Restaurant</th>
                    <th class="px-8 py-5">Metrics & Feedback</th>
                    <th class="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr *ngFor="let review of reviews" class="hover:bg-slate-50/50 transition-colors">
                    <td class="px-8 py-6">
                      <div class="font-bold text-slate-900">{{ review.username }}</div>
                      <div class="text-[10px] text-slate-400">{{ review.createdAt | date:'short' }}</div>
                    </td>
                    <td class="px-8 py-6">
                      <div class="text-slate-900 font-bold max-w-[150px] truncate">{{ review.hotelId?.name || 'Unknown' }}</div>
                    </td>
                    <td class="px-8 py-6">
                      <div class="flex gap-4 mb-2">
                        <div class="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">
                          <span class="material-symbols-outlined text-xs text-fithae-yellow fill-1">restaurant</span> Food: {{ review.foodRating }}/5
                        </div>
                        <div class="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-100 shadow-sm">
                          <span class="material-symbols-outlined text-xs text-green-500 fill-1">eco</span> Env: {{ review.environmentRating }}/5
                        </div>
                      </div>
                      <div class="text-sm text-slate-600 italic max-w-md truncate leading-relaxed">"{{ review.comment }}"</div>
                    </td>
                    <td class="px-8 py-6 text-right">
                      <button (click)="deleteReview(review._id)" class="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm" title="Delete Review">
                        <span class="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Users Tab -->
        <div *ngIf="currentTab === 'users'" class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div class="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
            <div class="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 class="text-2xl font-bold text-slate-900">Manage Platform Users</h2>
              <div class="flex items-center gap-2 text-slate-400 text-sm">
                <span class="material-symbols-outlined text-sm">group</span> {{ users.length }} registered users
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead class="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th class="px-8 py-5">User Details</th>
                    <th class="px-8 py-5">Role</th>
                    <th class="px-8 py-5">Joined</th>
                    <th class="px-8 py-5 text-right">Actions</th>
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
                      <span *ngIf="user.role === 'admin'" class="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-md">Admin</span>
                      <span *ngIf="user.role !== 'admin'" class="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-widest border border-slate-200">User</span>
                    </td>
                    <td class="px-8 py-6">
                      <div class="text-sm text-slate-600 font-medium">{{ user.createdAt | date:'mediumDate' }}</div>
                    </td>
                    <td class="px-8 py-6 text-right">
                      <button *ngIf="user.role !== 'admin'" (click)="deleteUser(user._id)" class="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm" title="Ban/Delete User">
                        <span class="material-symbols-outlined text-sm">person_remove</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <!-- QR Code Modal Backdrop -->
      <div *ngIf="showQRModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
        <div class="bg-white rounded-[2rem] p-10 max-w-sm w-full shadow-2xl relative scale-in-center">
          
          <button (click)="closeQRModal()" class="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
            <span class="material-symbols-outlined text-sm">close</span>
          </button>

          <div class="text-center mb-6">
            <h3 class="text-2xl font-black text-slate-900 leading-tight">Table QR</h3>
            <p class="text-sm text-slate-500 italic mt-1">{{ selectedRestaurantName }}</p>
          </div>

          <div class="flex justify-center p-4 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner" id="qr-container">
            <!-- Functional QR Code -->
            <qrcode [qrdata]="qrUrl" [width]="220" [errorCorrectionLevel]="'M'"></qrcode>
          </div>

          <div class="mt-8 text-center space-y-3">
             <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scan to view & review directly</p>
             <button (click)="printQR()" class="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-sm">print</span> Print QR Stand
             </button>
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
  
  // QR Modal State
  showQRModal = false;
  qrUrl = '';
  selectedRestaurantName = '';

  showAddForm = false;
  hotelData = {
    name: '',
    city: 'Islamabad',
    address: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3', // Updated to restaurant placeholder
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
        this.showAddForm = false;
        this.loadHotels();
        this.hotelData = { name: '', city: 'Islamabad', address: '', description: '', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3', priceRange: '$$$' };
      },
      error: (err) => alert('Registration failed: ' + (err.error?.message || 'Unknown error'))
    });
  }

  onSponsor(id: string) {
    const days = prompt('Enter sponsorship duration in days:', '7');
    if (days) {
      this.api.sponsorHotel(id, parseInt(days)).subscribe({
        next: () => this.loadHotels(),
        error: (err) => alert('Failed: ' + (err.error?.message || 'Unauthorized'))
      });
    }
  }

  deleteHotel(id: string) {
    if (confirm('Are you sure you want to completely delete this restaurant? This will also remove all its reviews.')) {
      this.api.deleteHotel(id).subscribe({
        next: () => {
          this.loadHotels();
          this.loadReviews(); 
        },
        error: (err) => alert('Delete failed: ' + (err.error?.message || 'Unauthorized'))
      });
    }
  }

  // --- QR Code Modals & Printing ---
  openQRModal(id: string, name: string) {
    this.qrUrl = `${window.location.origin}/hotel/${id}`;
    this.selectedRestaurantName = name;
    this.showQRModal = true;
  }

  closeQRModal() {
    this.showQRModal = false;
    this.qrUrl = '';
    this.selectedRestaurantName = '';
  }

  printQR() {
    // Get the QR canvas image data
    const qrCanvas = document.querySelector('#qr-container canvas') as HTMLCanvasElement;
    if (!qrCanvas) {
      alert('QR Code is still rendering, please wait a second.');
      return;
    }
    const qrImageURL = qrCanvas.toDataURL('image/png');

    // Create a new window for printing the Stand Design
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Stand - ${this.selectedRestaurantName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Lexend:wght@700&display=swap');
            body {
              margin: 0;
              padding: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background-color: #fff;
              font-family: 'Outfit', sans-serif;
            }
            .stand-container {
              width: 4in;
              height: 6in;
              border: 2px solid #0f172a;
              border-radius: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              padding: 40px 20px;
              box-sizing: border-box;
              text-align: center;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .header h1 {
              font-family: 'Lexend', sans-serif;
              font-size: 24px;
              color: #0f172a;
              margin: 0 0 5px 0;
            }
            .header p {
              color: #64748b;
              font-size: 14px;
              margin: 0;
            }
            .qr-wrapper {
              background: #fff;
              padding: 15px;
              border-radius: 15px;
              border: 2px dashed #cbd5e1;
            }
            .qr-wrapper img {
              width: 200px;
              height: 200px;
            }
            .instructions {
              font-weight: 700;
              color: #0f172a;
              font-size: 16px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .footer {
              margin-top: auto;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              width: 100%;
            }
            .brand {
              font-family: 'Lexend', sans-serif;
              font-size: 20px;
              font-weight: 900;
              color: #0f172a;
            }
            .brand span {
              color: #fbbf24;
              font-style: italic;
            }
            .slogan {
              font-size: 10px;
              color: #94a3b8;
              margin-top: 4px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="stand-container">
            <div class="header">
              <h1>${this.selectedRestaurantName}</h1>
              <p>Premium Dining Experience</p>
            </div>
            
            <div class="qr-wrapper">
              <img src="${qrImageURL}" alt="Scan to Review" />
            </div>
            
            <div class="instructions">
              Scan to view menu & review us
            </div>
            
            <div class="footer">
              <div class="brand"><span>Fit</span>Hae</div>
              <div class="slogan">Verified Premium Stays & Dining</div>
            </div>
          </div>
          <script>
            // Wait for image to load before triggering print
            window.onload = function() {
              setTimeout(() => {
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
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
    if (confirm('Are you sure you want to ban/delete this user? This cannot be undone.')) {
      this.api.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => alert('Delete failed: ' + (err.error?.message || 'Unauthorized'))
      });
    }
  }
}

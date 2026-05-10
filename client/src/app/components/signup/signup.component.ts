import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-surface px-md py-xxl">
      <div class="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/30 animate-pop">
        <div class="p-8 md:p-12">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-primary mb-2">Join <span class="text-fithae-pink">FitHae</span></h1>
            <p class="text-on-surface-variant text-sm">Become part of Pakistan's elite hotel community.</p>
          </div>

          <div *ngIf="errorMsg" class="mb-6 p-3 bg-red-500/10 text-red-600 rounded-lg text-sm border border-red-500/20 text-center font-bold">
            {{ errorMsg }}
          </div>

          <form (submit)="onSubmit()" class="space-y-6">
            <div>
              <label class="block font-label-bold text-sm mb-2">Username</label>
              <div class="relative">
                 <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">person</span>
                 <input type="text" [(ngModel)]="username" name="username" required
                        class="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-fithae-pink outline-none transition-all">
              </div>
            </div>
            <div>
              <label class="block font-label-bold text-sm mb-2">Password</label>
              <div class="relative">
                 <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">lock</span>
                 <input type="password" [(ngModel)]="password" name="password" required
                        class="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-fithae-pink outline-none transition-all">
              </div>
            </div>

            <button type="submit" 
                    class="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
              Create Account
            </button>
          </form>

          <div class="mt-8 text-center">
            <p class="text-sm text-on-surface-variant">Already a member? <a routerLink="/login" class="text-fithae-pink font-bold hover:underline">Log In</a></p>
          </div>
        </div>
        <div class="bg-primary-container p-4 text-center">
           <p class="text-[10px] text-white/50 uppercase tracking-widest font-bold">Trusted by 10,000+ Travelers</p>
        </div>
      </div>
    </div>
  `
})
export class SignupComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private api: ApiService, private router: Router) {}

  onSubmit() {
    this.api.signup({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: any) => this.errorMsg = err.error.message || 'Registration failed.'
    });
  }
}

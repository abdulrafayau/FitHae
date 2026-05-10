import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-slate-100">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-slate-900 mb-2">Reset Password</h2>
          <p class="text-slate-500 italic">Security verification required.</p>
        </div>

        <form (ngSubmit)="onReset()" class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">Username or Email</label>
            <input type="text" name="identifier" [(ngModel)]="formData.identifier" required
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none">
          </div>

          <div class="p-5 bg-primary/5 rounded-2xl border border-primary/10">
            <label class="block text-sm font-black text-slate-900 mb-2 italic">Question: Who do you love most?</label>
            <input type="text" name="securityAnswer" [(ngModel)]="formData.securityAnswer" required placeholder="Enter your answer"
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-white">
          </div>

          <div>
            <label class="block text-sm font-bold text-slate-700 mb-1">New Password</label>
            <input type="password" name="newPassword" [(ngModel)]="formData.newPassword" required
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none">
          </div>

          <div *ngIf="message" [class]="isError ? 'text-red-500 bg-red-50' : 'text-green-600 bg-green-50'" class="text-sm p-4 rounded-xl border">
            {{ message }}
          </div>

          <button type="submit" [disabled]="loading"
            class="w-full bg-slate-900 text-white py-4 rounded-xl font-black hover:bg-black transition-all shadow-xl shadow-slate-200">
            {{ loading ? 'Processing...' : 'RESET PASSWORD' }}
          </button>
        </form>

        <div class="mt-8 text-center">
          <a routerLink="/login" class="text-primary font-bold text-sm hover:underline flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">arrow_back</span> Back to Login
          </a>
        </div>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  formData = {
    identifier: '',
    securityAnswer: '',
    newPassword: ''
  };
  loading = false;
  message = '';
  isError = false;

  constructor(private api: ApiService, private router: Router) {}

  onReset() {
    this.loading = true;
    this.message = '';
    this.api.resetPassword(this.formData).subscribe({
      next: (res) => {
        this.message = 'Password reset successful! Redirecting...';
        this.isError = false;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.message = err.error?.message || 'Verification failed.';
        this.isError = true;
        this.loading = false;
      }
    });
  }
}

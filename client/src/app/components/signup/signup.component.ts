import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div class="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <!-- Brand Section -->
        <div class="md:w-1/3 bg-primary p-8 text-white flex flex-col justify-center items-center text-center">
          <h2 class="text-3xl font-bold mb-4">FitHae!</h2>
          <p class="text-white/80">Join the most premium hotel review platform in Islamabad & Rawalpindi.</p>
        </div>

        <!-- Form Section -->
        <div class="md:w-2/3 p-8 lg:p-12">
          <h2 class="text-2xl font-bold text-slate-900 mb-6">Create Account</h2>
          
          <form (ngSubmit)="onSubmit()" #signupForm="ngForm" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" name="fullName" [(ngModel)]="formData.fullName" required
                  class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Username</label>
                <input type="text" name="username" [(ngModel)]="formData.username" required
                  class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" name="email" [(ngModel)]="formData.email" required
                  class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
                <input type="text" name="contact" [(ngModel)]="formData.contact" required
                  class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input type="password" name="password" [(ngModel)]="formData.password" required
                class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
            </div>

            <div class="p-4 bg-fithae-yellow/10 rounded-xl border border-fithae-yellow/20">
              <label class="block text-sm font-bold text-slate-900 mb-1 italic">Security Question: Who do you love most?</label>
              <input type="text" name="securityAnswer" [(ngModel)]="formData.securityAnswer" required placeholder="Enter your answer"
                class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
              <p class="text-[10px] text-slate-500 mt-1">*This will be used if you forget your password.</p>
            </div>

            <div *ngIf="error" class="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
              {{ error }}
            </div>

            <button type="submit" [disabled]="!signupForm.valid || loading"
              class="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 disabled:opacity-50">
              {{ loading ? 'Creating Account...' : 'Sign Up' }}
            </button>
          </form>

          <p class="mt-6 text-center text-slate-600 text-sm">
            Already have an account? 
            <a routerLink="/login" class="text-primary font-bold hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class SignupComponent {
  formData = {
    username: '',
    fullName: '',
    email: '',
    contact: '',
    password: '',
    securityAnswer: ''
  };
  loading = false;
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    
    this.api.register(this.formData).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}

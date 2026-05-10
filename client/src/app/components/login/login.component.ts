import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 lg:p-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
          <p class="text-slate-600 italic">"Ab Har Hotel Hoga FitHae!"</p>
        </div>
        
        <form (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Username or Email</label>
            <input type="text" name="identifier" [(ngModel)]="formData.identifier" required
              class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Enter your username or email">
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input type="password" name="password" [(ngModel)]="formData.password" required
              class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="••••••••">
          </div>

          <div *ngIf="error" class="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
            {{ error }}
          </div>

          <button type="submit" [disabled]="loading"
            class="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
            {{ loading ? 'Logging in...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-100 text-center">
          <p class="text-slate-600 text-sm">
            Don't have an account? 
            <a routerLink="/signup" class="text-primary font-bold hover:underline">Create One</a>
          </p>
          <a routerLink="/forgot-password" class="text-xs text-slate-400 hover:text-primary mt-4 block italic">Forgot your password?</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  formData = {
    identifier: '',
    password: ''
  };
  loading = false;
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    
    this.api.login(this.formData).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Invalid credentials. Please try again.';
        this.loading = false;
      }
    });
  }
}

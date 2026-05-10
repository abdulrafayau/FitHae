import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm">
      <nav class="max-w-container-max mx-auto px-lg flex items-center justify-between h-xxl">
        <div class="flex items-center gap-xl">
          <a routerLink="/" class="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
            <span class="text-fithae-pink">Fit</span>Hae
          </a>
          <div class="hidden md:flex gap-lg">
            <a routerLink="/" routerLinkActive="text-primary border-b-2 border-secondary-container" [routerLinkActiveOptions]="{exact: true}" 
               class="text-on-surface-variant hover:text-primary transition-colors font-label-bold text-label-bold pb-1">Hotels</a>
            <a routerLink="/about" routerLinkActive="text-primary border-b-2 border-secondary-container"
               class="text-on-surface-variant hover:text-primary transition-colors font-label-bold text-label-bold pb-1">About Us</a>
            <a *ngIf="isLoggedIn()" routerLink="/profile" routerLinkActive="text-primary border-b-2 border-secondary-container"
               class="text-on-surface-variant hover:text-primary transition-colors font-label-bold text-label-bold pb-1">My Reviews</a>
            <a *ngIf="isAdmin()" routerLink="/admin" routerLinkActive="text-primary border-b-2 border-secondary-container"
               class="text-on-surface-variant hover:text-primary transition-colors font-label-bold text-label-bold pb-1">Dashboard</a>
          </div>
        </div>
        <div class="flex items-center gap-md">
          <button *ngIf="!isLoggedIn()" routerLink="/login" 
                  class="hidden md:block px-lg py-sm bg-primary text-on-primary rounded-lg font-label-bold text-label-bold hover:scale-[1.01] transition-all duration-200 active:scale-95">
            Log In
          </button>
          <div *ngIf="isLoggedIn()" class="flex items-center gap-3">
             <span class="hidden md:inline font-label-bold text-on-surface-variant">Hi, {{ getUserName() }}</span>
             <img [src]="'https://ui-avatars.com/api/?name=' + getUserName() + '&background=E91E63&color=fff'" 
                  alt="User profile" class="w-10 h-10 rounded-full border border-outline-variant cursor-pointer" routerLink="/profile">
             <button (click)="logout()" class="text-sm text-error font-label-bold hover:underline">Exit</button>
          </div>
        </div>
      </nav>
    </header>
  `
})
export class NavbarComponent {
  constructor(private api: ApiService) {}

  isLoggedIn() { return this.api.isLoggedIn(); }
  isAdmin() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'admin' || user.username === '@admin';
  }
  getUserName() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.username || 'User';
  }
  logout() { this.api.logout(); }
}

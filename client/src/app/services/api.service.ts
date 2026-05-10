import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api';

  constructor(private http: HttpClient) { }

  // Auth
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/change-password`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, data);
  }

  // Admin - Users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/users`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/auth/users/${id}`);
  }

  // Admin - Reviews
  getAllReviews(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews/all`);
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reviews/${id}`);
  }

  // Hotels
  getHotels(city?: string, search?: string): Observable<any> {
    let params: any = {};
    if (city) params.city = city;
    if (search) params.search = search;
    return this.http.get(`${this.apiUrl}/hotels`, { params });
  }

  getHotelById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/hotels/${id}`);
  }

  registerHotel(hotelData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hotels`, hotelData);
  }

  deleteHotel(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/hotels/${id}`);
  }

  sponsorHotel(id: string, days: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/hotels/${id}/sponsor`, { days });
  }

  // Reviews
  getReviews(hotelId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews/${hotelId}`);
  }

  postReview(reviewData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, reviewData);
  }

  // Helpers
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api';

  constructor(private http: HttpClient) { }

  // Auth
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Hotels
  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hotels`);
  }

  getHotelById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hotels/${id}`);
  }

  addHotel(hotelData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/hotels`, hotelData);
  }

  sponsorHotel(hotelId: string, days: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/hotels/${hotelId}/sponsor`, { days });
  }

  // Reviews
  getReviews(hotelId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/${hotelId}`);
  }

  postReview(reviewData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, reviewData);
  }

  // User Profile
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    return this.http.get(`${this.apiUrl}/users/profile`, { headers });
  }

  // Helper
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

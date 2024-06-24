import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    // Verifique se o token JWT existe no localStorage
    return !!localStorage.getItem('token');
  }
}

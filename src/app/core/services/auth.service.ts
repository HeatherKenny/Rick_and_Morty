import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'rick_morty_token';
  private readonly USER_KEY = 'rick_morty_user';
  
  isAuthenticated = signal<boolean>(this.hasToken());
  currentUser = signal<any>(this.getUser());

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Simulação de login - aceita qualquer usuário/senha
    if (username && password) {
      const fakeToken = this.generateFakeJWT(username);
      const user = {
        username: username,
        email: `${username}@rickandmorty.com`,
        avatar: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
      };
      
      localStorage.setItem(this.TOKEN_KEY, fakeToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      
      this.isAuthenticated.set(true);
      this.currentUser.set(user);
      
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private generateFakeJWT(username: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      sub: username, 
      iat: Date.now(),
      exp: Date.now() + 86400000 // 24 horas
    }));
    const signature = btoa('fake-signature');
    return `${header}.${payload}.${signature}`;
  }
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" 
               alt="Rick and Morty Logo" 
               class="logo">
          <h2>Dashboard Login</h2>
          <p class="text-muted">Entre com suas credenciais</p>
        </div>
        
        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="mb-3">
            <label for="username" class="form-label">Usuário</label>
            <input 
              type="text" 
              class="form-control" 
              id="username" 
              [(ngModel)]="username" 
              name="username"
              required
              placeholder="Digite seu usuário">
          </div>
          
          <div class="mb-3">
            <label for="password" class="form-label">Senha</label>
            <input 
              type="password" 
              class="form-control" 
              id="password" 
              [(ngModel)]="password" 
              name="password"
              required
              placeholder="Digite sua senha">
          </div>
          
          @if (errorMessage()) {
            <div class="alert alert-danger" role="alert">
              {{ errorMessage() }}
            </div>
          }
          
          <button 
            type="submit" 
            class="btn btn-primary w-100"
            [disabled]="!loginForm.valid">
            Entrar
          </button>
        </form>
        
        <div class="login-footer">
          <p class="text-muted small">
            Dica: Use qualquer usuário e senha para entrar
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #A6EEE6FF 0%, #97ce4c 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 15px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 450px;
    }

    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .logo {
      width: 200px;
      margin-bottom: 20px;
    }

    .login-header h2 {
      color: #333;
      margin-bottom: 10px;
    }

    .form-label {
      font-weight: 600;
      color: #555;
    }

    .form-control {
      border-radius: 8px;
      padding: 12px;
      border: 1px solid #ddd;
    }

    .form-control:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    }

    .btn-primary {
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 10px;
    }

    .login-footer {
      margin-top: 20px;
      text-align: center;
    }

    .alert {
      border-radius: 8px;
      margin-bottom: 15px;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = signal<string>('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.errorMessage.set('');
    
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/characters']);
    } else {
      this.errorMessage.set('Usuário ou senha inválidos');
    }
  }
}

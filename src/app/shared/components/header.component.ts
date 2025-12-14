import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div class="container-fluid">
        <button class="btn btn-link text-white me-3" (click)="toggleSidebar.emit()">
          <i class="bi bi-list fs-4"></i>
        </button>
        
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" 
               alt="Logo" 
               height="30" 
               class="me-2">
          <span>Dashboard</span>
        </a>
        
        <div class="ms-auto">
          <div class="dropdown">
            <button class="btn btn-link text-white dropdown-toggle d-flex align-items-center" 
                    type="button" 
                    id="userDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false">
              <img [src]="authService.currentUser()?.avatar || 'https://via.placeholder.com/40'" 
                   alt="Avatar" 
                   class="rounded-circle me-2" 
                   width="40" 
                   height="40">
              <span class="d-none d-md-inline">{{ authService.currentUser()?.username }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <a class="dropdown-item" (click)="goToProfile()">
                  <i class="bi bi-person me-2"></i>Meu Perfil
                </a>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item text-danger" (click)="logout()">
                  <i class="bi bi-box-arrow-right me-2"></i>Sair
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 1000;
    }

    .navbar-brand img {
      filter: brightness(0) invert(1);
    }

    .btn-link {
      text-decoration: none;
    }

    .btn-link:hover {
      opacity: 0.8;
    }

    .dropdown-toggle::after {
      margin-left: 0.5em;
    }

    .dropdown-item {
      cursor: pointer;
    }

    .dropdown-item:hover {
      background-color: #f8f9fa;
    }

    .rounded-circle {
      object-fit: cover;
      border: 2px solid white;
    }
  `]
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <div class="profile-container">
        <button class="btn btn-outline-primary mb-4" (click)="goBack()">
          <i class="bi bi-arrow-left me-2"></i>Voltar
        </button>

        <div class="card profile-card">
          <div class="row g-0">
            <div class="col-md-4">
              <div class="profile-image-container">
                <img [src]="authService.currentUser()?.avatar || 'https://via.placeholder.com/400'" 
                     alt="Profile Picture" 
                     class="img-fluid profile-image">
              </div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title mb-4">Meu Perfil</h2>
                
                <div class="row">
                  <div class="col-12 mb-3">
                    <div class="info-item">
                      <label class="info-label">Nome de Usuário</label>
                      <p class="info-value">{{ authService.currentUser()?.username }}</p>
                    </div>
                  </div>

                  <div class="col-12 mb-3">
                    <div class="info-item">
                      <label class="info-label">E-mail</label>
                      <p class="info-value">{{ authService.currentUser()?.email }}</p>
                    </div>
                  </div>

                  <div class="col-12 mb-3">
                    <div class="info-item">
                      <label class="info-label">Status</label>
                      <div>
                        <span class="badge bg-success">Ativo</span>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 mb-3">
                    <div class="info-item">
                      <label class="info-label">Função</label>
                      <p class="info-value">Administrador do Dashboard</p>
                    </div>
                  </div>

                  <div class="col-12 mb-3">
                    <div class="info-item">
                      <label class="info-label">Membro desde</label>
                      <p class="info-value">{{ currentDate }}</p>
                    </div>
                  </div>
                </div>

                <div class="mt-4">
                  <button class="btn btn-primary me-2">
                    <i class="bi bi-pencil me-2"></i>Editar Perfil
                  </button>
                  <button class="btn btn-outline-danger" (click)="logout()">
                    <i class="bi bi-box-arrow-right me-2"></i>Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-md-4 mb-3">
            <div class="card stats-card">
              <div class="card-body text-center">
                <i class="bi bi-people-fill stats-icon text-primary"></i>
                <h3 class="stats-number">826</h3>
                <p class="stats-label">Personagens</p>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="card stats-card">
              <div class="card-body text-center">
                <i class="bi bi-geo-alt-fill stats-icon text-success"></i>
                <h3 class="stats-number">126</h3>
                <p class="stats-label">Localizações</p>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-3">
            <div class="card stats-card">
              <div class="card-body text-center">
                <i class="bi bi-film stats-icon text-info"></i>
                <h3 class="stats-number">51</h3>
                <p class="stats-label">Episódios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .profile-card {
      border: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border-radius: 15px;
      overflow: hidden;
    }

    .profile-image-container {
      height: 100%;
      min-height: 400px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .profile-image {
      width: 100%;
      max-width: 300px;
      border-radius: 50%;
      border: 5px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .card-body {
      padding: 40px;
    }

    .card-title {
      font-size: 2.5rem;
      font-weight: bold;
      color: #333;
    }

    .info-item {
      margin-bottom: 15px;
    }

    .info-label {
      font-weight: 600;
      color: #666;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
      display: block;
    }

    .info-value {
      font-size: 1.1rem;
      color: #333;
      margin: 0;
    }

    .badge {
      font-size: 1rem;
      padding: 0.5em 1em;
    }

    .stats-card {
      border: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-radius: 10px;
      transition: transform 0.2s;
    }

    .stats-card:hover {
      transform: translateY(-5px);
    }

    .stats-icon {
      font-size: 3rem;
      margin-bottom: 15px;
    }

    .stats-number {
      font-size: 2.5rem;
      font-weight: bold;
      margin: 10px 0;
      color: #333;
    }

    .stats-label {
      color: #666;
      font-size: 1rem;
      margin: 0;
    }

    @media (max-width: 768px) {
      .card-title {
        font-size: 1.8rem;
      }

      .card-body {
        padding: 20px;
      }

      .profile-image-container {
        min-height: 300px;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  currentDate: string = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  goBack(): void {
    this.router.navigate(['/characters']);
  }

  logout(): void {
    this.authService.logout();
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Character } from '../../core/services/api.service';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <div class="details-container">
        <button class="btn btn-outline-primary mb-4" (click)="goBack()">
          <i class="bi bi-arrow-left me-2"></i>Voltar
        </button>

        @if (loading()) {
          <div class="loading-spinner">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Carregando...</span>
            </div>
          </div>
        }

        @if (error()) {
          <div class="alert alert-danger" role="alert">
            {{ error() }}
          </div>
        }

        @if (character()) {
          <div class="card character-details-card">
            <div class="row g-0">
              <div class="col-md-4">
                <img [src]="character()!.image" 
                     [alt]="character()!.name" 
                     class="img-fluid character-image">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title mb-4">{{ character()!.name }}</h2>
                  
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <div class="info-item">
                        <label class="info-label">Status</label>
                        <div>
                          <span class="badge" 
                                [class.bg-success]="character()!.status === 'Alive'"
                                [class.bg-danger]="character()!.status === 'Dead'"
                                [class.bg-secondary]="character()!.status === 'unknown'">
                            {{ character()!.status }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <div class="info-item">
                        <label class="info-label">Espécie</label>
                        <p class="info-value">{{ character()!.species }}</p>
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <div class="info-item">
                        <label class="info-label">Gênero</label>
                        <p class="info-value">{{ character()!.gender }}</p>
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <div class="info-item">
                        <label class="info-label">Tipo</label>
                        <p class="info-value">{{ character()!.type || 'Desconhecido' }}</p>
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <div class="info-item">
                        <label class="info-label">Origem</label>
                        <p class="info-value">{{ character()!.origin.name }}</p>
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <div class="info-item">
                        <label class="info-label">Localização Atual</label>
                        <p class="info-value">{{ character()!.location.name }}</p>
                      </div>
                    </div>

                    <div class="col-12 mb-3">
                      <div class="info-item">
                        <label class="info-label">Episódios</label>
                        <p class="info-value">
                          <span class="badge bg-primary">
                            {{ character()!.episode.length }} episódios
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .details-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .character-details-card {
      border: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border-radius: 15px;
      overflow: hidden;
    }

    .character-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

    @media (max-width: 768px) {
      .card-title {
        font-size: 1.8rem;
      }

      .card-body {
        padding: 20px;
      }
    }
  `]
})
export class CharacterDetailsComponent implements OnInit {
  character = signal<Character | null>(null);
  loading = signal<boolean>(false);
  error = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCharacter(+id);
    }
  }

  loadCharacter(id: number): void {
    this.loading.set(true);
    this.error.set('');

    this.apiService.getCharacterById(id).subscribe({
      next: (character) => {
        this.character.set(character);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar detalhes do personagem.');
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/characters']);
  }
}

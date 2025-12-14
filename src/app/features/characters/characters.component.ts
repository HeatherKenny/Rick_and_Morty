import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Character } from '../../core/services/api.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <div class="search-bar">
        <h3>Personagens</h3>
      </div>

      <div class="table-container">
        @if (loading() && characters().length === 0) {
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

        @if (characters().length > 0) {
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Status</th>
                  <th>Espécie</th>
                  <th>Gênero</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                @for (character of characters(); track character.id) {
                  <tr>
                    <td>
                      <img [src]="character.image" 
                           [alt]="character.name" 
                           class="character-thumb"
                           width="50" 
                           height="50">
                    </td>
                    <td>{{ character.name }}</td>
                    <td>
                      <span class="badge" [class.bg-success]="character.status === 'Alive'"
                            [class.bg-danger]="character.status === 'Dead'"
                            [class.bg-secondary]="character.status === 'unknown'">
                        {{ character.status }}
                      </span>
                    </td>
                    <td>{{ character.species }}</td>
                    <td>{{ character.gender }}</td>
                    <td>
                      <button class="btn btn-sm btn-primary" 
                              (click)="viewDetails(character.id)">
                        Detalhes
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          @if (loading() && characters().length > 0) {
            <div class="loading-spinner">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando mais...</span>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .character-thumb {
      border-radius: 8px;
      object-fit: cover;
    }

    .table {
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .table thead {
      background-color: #f8f9fa;
    }

    .table tbody tr {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .table tbody tr:hover {
      background-color: #f8f9fa;
    }

    .badge {
      font-size: 0.85rem;
      padding: 0.4em 0.8em;
    }
  `]
})
export class CharactersComponent implements OnInit {
  characters = signal<Character[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');
  currentPage = 1;
  hasMorePages = true;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    if (this.loading() || !this.hasMorePages) return;

    this.loading.set(true);
    this.error.set('');

    this.apiService.getCharacters(this.currentPage).subscribe({
      next: (response) => {
        this.characters.set([...this.characters(), ...response.results]);
        this.hasMorePages = !!response.info.next;
        this.currentPage++;
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar personagens. Tente novamente.');
        this.loading.set(false);
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/characters', id]);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100 && !this.loading() && this.hasMorePages) {
      this.loadCharacters();
    }
  }
}

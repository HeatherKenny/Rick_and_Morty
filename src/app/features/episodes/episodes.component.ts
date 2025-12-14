import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Episode } from '../../core/services/api.service';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <div class="search-bar">
        <div class="row">
          <div class="col-md-6">
            <h3>Episódios</h3>
          </div>
          <div class="col-md-6">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Buscar episódios..." 
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange($event)">
          </div>
        </div>
      </div>

      <div class="table-container">
        @if (loading() && episodes().length === 0) {
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

        @if (episodes().length > 0) {
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Episódio</th>
                  <th>Nome</th>
                  <th>Data de Exibição</th>
                  <th>Personagens</th>
                </tr>
              </thead>
              <tbody>
                @for (episode of episodes(); track episode.id) {
                  <tr>
                    <td>
                      <span class="badge bg-primary">{{ episode.episode }}</span>
                    </td>
                    <td><strong>{{ episode.name }}</strong></td>
                    <td>{{ episode.air_date }}</td>
                    <td>
                      <span class="badge bg-secondary">
                        {{ episode.characters.length }} personagens
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          @if (loading() && episodes().length > 0) {
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
    .table {
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .table thead {
      background-color: #f8f9fa;
    }

    .table tbody tr {
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
export class EpisodesComponent implements OnInit {
  episodes = signal<Episode[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');
  currentPage = 1;
  hasMorePages = true;
  searchTerm = '';

  constructor(
    private apiService: ApiService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchTerm = this.searchService.searchTerm();
    this.loadEpisodes();
    
    this.searchService.searchObservable$.subscribe(term => {
      this.resetAndSearch(term);
    });
  }

  loadEpisodes(): void {
    if (this.loading() || !this.hasMorePages) return;

    this.loading.set(true);
    this.error.set('');

    this.apiService.getEpisodes(this.currentPage, this.searchTerm).subscribe({
      next: (response) => {
        this.episodes.set([...this.episodes(), ...response.results]);
        this.hasMorePages = !!response.info.next;
        this.currentPage++;
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar episódios. Tente novamente.');
        this.loading.set(false);
      }
    });
  }

  onSearchChange(term: string): void {
    this.searchService.updateSearch(term);
  }

  resetAndSearch(term: string): void {
    this.episodes.set([]);
    this.currentPage = 1;
    this.hasMorePages = true;
    this.searchTerm = term;
    this.loadEpisodes();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100 && !this.loading() && this.hasMorePages) {
      this.loadEpisodes();
    }
  }
}

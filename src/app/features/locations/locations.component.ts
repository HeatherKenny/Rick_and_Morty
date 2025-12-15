import { Component, OnInit, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Location } from '../../core/services/api.service';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid">
      <div class="search-bar">
        <div class="row">
          <div class="col-md-6">
            <h3>Localizações</h3>
          </div>
          <div class="col-md-6">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Buscar localizações..." 
              [(ngModel)]="searchTerm"
              (ngModelChange)="onSearchChange($event)">
          </div>
        </div>
      </div>

      <div class="table-container">
        @if (loading() && locations().length === 0) {
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

        @if (locations().length > 0) {
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Dimensão</th>
                  <th>Residentes</th>
                </tr>
              </thead>
              <tbody>
                @for (location of locations(); track location.id) {
                  <tr>
                    <td><strong>{{ location.name }}</strong></td>
                    <td>
                      <span class="badge bg-info">{{ location.type || 'Desconhecido' }}</span>
                    </td>
                    <td>{{ location.dimension || 'Desconhecida' }}</td>
                    <td>
                      <span class="badge bg-secondary">
                        {{ location.residents.length }} residentes
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          @if (loading() && locations().length > 0) {
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
export class LocationsComponent implements OnInit {
  locations = signal<Location[]>([]);
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
    this.loadLocations();
    
    this.searchService.searchObservable$.subscribe(term => {
      this.resetAndSearch(term);
    });
  }

  loadLocations(): void {
    if (this.loading() || !this.hasMorePages) return;

    this.loading.set(true);
    this.error.set('');

    this.apiService.getLocations(this.currentPage, this.searchTerm).subscribe({
      next: (response) => {
        this.locations.set([...this.locations(), ...response.results]);
        this.hasMorePages = !!response.info.next;
        this.currentPage++;
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar localizações. Tente novamente.');
        this.loading.set(false);
      }
    });
  }

  onSearchChange(term: string): void {
    this.searchService.updateSearch(term);
  }

  resetAndSearch(term: string): void {
    this.locations.set([]);
    this.currentPage = 1;
    this.hasMorePages = true;
    this.searchTerm = term;
    this.loadLocations();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100 && !this.loading() && this.hasMorePages) {
      this.loadLocations();
    }
  }
}

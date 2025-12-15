import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Character } from '../../core/services/api.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Personagens</h2>
      
      @if (loading()) {
        <p>Carregando...</p>
      }

      @if (error()) {
        <p style="color: red;">{{ error() }}</p>
      }

      @if (characters().length > 0) {
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status</th>
              <th>Espécie</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            @for (character of characters(); track character.id) {
              <tr>
                <td>{{ character.name }}</td>
                <td>{{ character.status }}</td>
                <td>{{ character.species }}</td>
                <td>
                  <button (click)="viewDetails(character.id)">Detalhes</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
        
        <div style="margin-top: 20px;">
          <button (click)="loadMore()" [disabled]="!hasMorePages || loading()">
            Carregar Mais
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    h2 {
      margin-bottom: 20px;
    }
    table {
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px;
      text-align: left;
    }
    button {
      padding: 5px 10px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background-color: #0056b3;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
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
        this.error.set('Erro ao carregar personagens.');
        this.loading.set(false);
      }
    });
  }

  loadMore(): void {
    this.loadCharacters();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/characters', id]);
  }
}

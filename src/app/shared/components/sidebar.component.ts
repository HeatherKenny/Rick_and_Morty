import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar" [class.closed]="!isOpen">
      <div class="sidebar-header">
        <h5>Menu</h5>
      </div>
      
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" routerLink="/characters" routerLinkActive="active">
            <i class="bi bi-people-fill me-2"></i>
            <span>Characters</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/locations" routerLinkActive="active">
            <i class="bi bi-geo-alt-fill me-2"></i>
            <span>Locations</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/episodes" routerLinkActive="active">
            <i class="bi bi-film me-2"></i>
            <span>Episodes</span>
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      top: 56px;
      left: 0;
      width: 250px;
      height: calc(100vh - 56px);
      background-color: #2c3e50;
      color: white;
      transition: transform 0.3s ease;
      z-index: 999;
      overflow-y: auto;
    }

    .sidebar.closed {
      transform: translateX(-250px);
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .sidebar-header h5 {
      margin: 0;
      font-weight: 600;
    }

    .nav {
      padding: 10px 0;
    }

    .nav-link {
      color: rgba(255,255,255,0.8);
      padding: 15px 20px;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }

    .nav-link:hover {
      background-color: rgba(255,255,255,0.1);
      color: white;
    }

    .nav-link.active {
      background-color: rgba(0,181,204,0.2);
      color: white;
      border-left-color: #00b5cc;
    }

    .nav-link i {
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-250px);
      }
      
      .sidebar:not(.closed) {
        transform: translateX(0);
      }
    }
  `]
})
export class SidebarComponent {
  @Input() isOpen = true;
}

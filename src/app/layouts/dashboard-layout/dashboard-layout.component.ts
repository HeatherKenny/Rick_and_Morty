import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header.component';
import { SidebarComponent } from '../../shared/components/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="dashboard-container">
      <app-header (toggleSidebar)="toggleSidebar()"></app-header>
      <app-sidebar [isOpen]="sidebarOpen()"></app-sidebar>
      
      <main class="main-content" [class.sidebar-closed]="!sidebarOpen()">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
    }
  `]
})
export class DashboardLayoutComponent {
  sidebarOpen = signal<boolean>(true);

  toggleSidebar(): void {
    this.sidebarOpen.set(!this.sidebarOpen());
  }
}

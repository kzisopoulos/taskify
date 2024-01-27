import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/state/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  public constructor(private authService: AuthService) {}
  public username$ = this.authService.username$;

  public logout() {
    return this.authService.handleLogout().subscribe();
  }
}

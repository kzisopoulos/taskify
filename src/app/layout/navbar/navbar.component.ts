import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../../core/services/auth/state/auth-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  public constructor(private authStateService: AuthStateService) {}
  public username$!: Observable<string | undefined>;

  public ngOnInit(): void {
    this.username$ = this.authStateService.username$;
  }

  public logout(): void {
    this.authStateService.handleLogout();
  }
}

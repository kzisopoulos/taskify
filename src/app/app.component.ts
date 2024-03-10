import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Layout
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from './core/services/auth/state/auth.service';
import { Observable } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import { RouteResponse } from './core/models/response.interface';
import { AuthRouteResponse } from './core/models/auth.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    LetDirective,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public checkAuth$!: Observable<RouteResponse<AuthRouteResponse>>;
  public constructor(private authService: AuthService) {}
  public ngOnInit(): void {
    this.checkAuth$ = this.authService.checkAuth$;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

// Layout
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from './core/services/auth.service';

const firebaseConfig = {
  apiKey: 'AIzaSyCQxVJT80YlxjTIrmq6r99OxYS8nu9_PI0',
  authDomain: 'ng-tasks-8a3b4.firebaseapp.com',
  projectId: 'ng-tasks-8a3b4',
  storageBucket: 'ng-tasks-8a3b4.appspot.com',
  messagingSenderId: '342175569492',
  appId: '1:342175569492:web:b9a7224a5f631e9c7abfc1',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Taskify App';
  constructor(private authService: AuthService, private router: Router) {
    this.authService.checkAuth();
  }
}

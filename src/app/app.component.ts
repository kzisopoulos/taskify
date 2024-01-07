import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

// Layout
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from './core/services/auth/state/auth.service';
import { Subscription, of, switchMap } from 'rxjs';
import { TasksService } from './core/services/tasks/state/tasks.service';

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
export class AppComponent implements OnDestroy {
  title = 'Taskify App';
  public authSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private tasksService: TasksService,
    private router: Router
  ) {
    this.authSubscription = this.authService.checkAuth$
      .pipe(
        switchMap((value) => {
          if (value.success) {
            return this.tasksService.loadTasks();
          }
          return of(null);
        })
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}

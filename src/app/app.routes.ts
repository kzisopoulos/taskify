import { Routes } from '@angular/router';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { authGuard } from './core/guards/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: TasksListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

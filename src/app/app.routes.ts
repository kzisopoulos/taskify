import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { authGuard } from './core/guards/auth.guard';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'create',
    component: CreateTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-task/:id',
    component: EditTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

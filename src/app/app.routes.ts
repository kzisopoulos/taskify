import { Routes } from '@angular/router';
import { TaskListComponent } from './components/pages/task-list/task-list.component';
import { CreateTaskComponent } from './components/pages/create-task/create-task.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { EditTaskComponent } from './components/pages/edit-task/edit-task.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { authGuardGuard } from './components/guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'create',
    component: CreateTaskComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'edit-task/:id',
    component: EditTaskComponent,
    canActivate: [authGuardGuard],
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

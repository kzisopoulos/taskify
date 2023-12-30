import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCheck,
  heroPencil,
  heroPlus,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import { IconButtonComponent } from '../../components/ui/icon-button/icon-button.component';
import { TasksService } from '../../core/services/tasks/state/tasks.service';
import { map } from 'rxjs';
import { TaskRouteResponse } from '../../core/models/task.interface';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgIconComponent, IconButtonComponent],
  providers: [provideIcons({ heroPencil, heroCheck, heroPlus, heroTrash })],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  constructor(private taskService: TasksService, private router: Router) {}
  completedTasks$ = this.taskService.tasks$.pipe(
    map((tasks) => tasks?.filter((task) => task.done))
  );
  pendingTasks$ = this.taskService.tasks$.pipe(
    map((tasks) => tasks?.filter((task) => !task.done))
  );

  completeTask(task: TaskRouteResponse) {
    this.taskService
      .updateTask(task.id, { ...task, done: true })
      .subscribe((res) => res);
  }

  createTask() {
    this.router.navigate(['/create']);
  }

  editTask(id: number) {
    this.router.navigate([`/edit-task/${id}`]);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe((res) => res);
  }
}

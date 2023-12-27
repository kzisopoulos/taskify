import { Component, OnInit } from '@angular/core';
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
import {
  TasksService,
  TaskRouteResponse,
} from '../../core/services/tasks.service';
import { map, tap } from 'rxjs';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgIconComponent, IconButtonComponent],
  providers: [provideIcons({ heroPencil, heroCheck, heroPlus, heroTrash })],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TasksService, private router: Router) {}
  tasks$ = this.taskService.tasks$;
  completedTasks$ = this.taskService.tasks$.pipe(
    map((tasks) => tasks?.filter((task) => task.done))
  );
  pendingTasks$ = this.taskService.tasks$.pipe(
    map((tasks) => tasks?.filter((task) => !task.done))
  );
  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  completeTask(task: TaskRouteResponse) {
    this.taskService
      .updateTask(task.id, { ...task, done: true })
      .pipe(tap(() => this.taskService.loadTasks()))
      .subscribe((res) => res);
  }

  createTask() {
    this.router.navigate(['/create']);
  }

  editTask(id: number) {
    this.router.navigate([`/edit-task/${id}`]);
  }

  deleteTask(id: number) {
    this.taskService
      .deleteTask(id)
      .pipe(tap(() => this.taskService.loadTasks()))
      .subscribe((res) => res);
  }
}

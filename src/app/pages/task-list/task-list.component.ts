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
import { TasksService } from '../../core/services/tasks/state/tasks.service';
import { Observable, map } from 'rxjs';
import { TaskRouteResponse } from '../../core/models/task.interface';
import { LetDirective } from '@ngrx/component';
import { RouteResponse } from '../../core/models/response.interface';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgIconComponent, IconButtonComponent, LetDirective],
  providers: [provideIcons({ heroPencil, heroCheck, heroPlus, heroTrash })],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  public constructor(
    private taskService: TasksService,
    private router: Router
  ) {}

  public completedTasks$!: Observable<TaskRouteResponse[] | undefined>;
  public pendingTasks$!: Observable<TaskRouteResponse[] | undefined>;
  public tasks$!: Observable<RouteResponse<TaskRouteResponse[]>>;

  public ngOnInit(): void {
    this.tasks$ = this.taskService.loadTasks();

    this.completedTasks$ = this.taskService.tasks$.pipe(
      map((tasks) => tasks?.filter((task) => task.done))
    );
    this.pendingTasks$ = this.taskService.tasks$.pipe(
      map((tasks) => tasks?.filter((task) => !task.done))
    );
  }

  public completeTask(task: TaskRouteResponse) {
    this.taskService.updateTask(task.id, { ...task, done: true });
  }

  public createTask() {
    this.router.navigate(['/create']);
  }

  public editTask(id: number) {
    this.router.navigate([`/edit-task/${id}`]);
  }

  public deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }
}

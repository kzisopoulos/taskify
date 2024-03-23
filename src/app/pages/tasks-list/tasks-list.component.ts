import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCheck,
  heroPencil,
  heroPlus,
  heroTrash,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { TasksStateService } from '../../core/services/tasks/state/tasks-state.service';
import { Observable, map } from 'rxjs';
import { TaskRouteResponse } from '../../core/models/task.interface';
import { LetDirective } from '@ngrx/component';
import { TaskListComponent } from './components/task-list/task-list.component';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    LetDirective,
    TaskListComponent,
    CdkDrag,
    CdkDropList,
  ],
  providers: [
    provideIcons({ heroPencil, heroCheck, heroPlus, heroTrash, heroXMark }),
  ],
  templateUrl: './tasks-list.component.html',
  styles: `
  .cdk-drop-list {
    overflow: hidden;
  }
`,
})
export class TasksListComponent implements OnInit {
  public constructor(private taskStateService: TasksStateService) {}

  public completedTasks$!: Observable<TaskRouteResponse[] | undefined>;
  public pendingTasks$!: Observable<TaskRouteResponse[] | undefined>;

  public ngOnInit(): void {
    this.taskStateService.loadTasks();

    this.completedTasks$ = this.taskStateService.tasks$.pipe(
      map((tasks) => tasks?.filter((task) => task.status === 'DONE'))
    );
    this.pendingTasks$ = this.taskStateService.tasks$.pipe(
      map((tasks) => tasks?.filter((task) => task.status === 'PENDING'))
    );
  }

  public deleteTask(id: string) {
    this.taskStateService.deleteTask(id);
  }

  public moveTask(event: CdkDragDrop<TaskRouteResponse[]>) {
    const selectedTask = event.item.data as TaskRouteResponse;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.taskStateService.updateTask(selectedTask.id, {
        ...selectedTask,
        status: event.container.id === 'done' ? 'DONE' : 'PENDING',
      });
    }
  }
}

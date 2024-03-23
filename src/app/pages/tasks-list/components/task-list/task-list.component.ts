import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  TaskStatus,
  TaskRouteResponse,
} from '../../../../core/models/task.interface';
import { NgIconComponent } from '@ng-icons/core';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { TasksStateService } from '../../../../core/services/tasks/state/tasks-state.service';
import { Observable, map } from 'rxjs';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { TaskListTheme } from '../../../../core/models/task.theme.interface';
import { taskListStyleConfig } from '../../styles-config';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgIconComponent, TaskListItemComponent, CdkDrag],
  templateUrl: './task-list.component.html',
  styles: `
    .cdk-drag-preview {
    color: white;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}`,
})
export class TaskListComponent implements OnInit {
  @Input({ required: true }) public tasks!: TaskRouteResponse[];
  @Input({ required: true }) public listType!: TaskStatus;
  @Input({ required: true }) public title!: string;

  public styleConfig!: TaskListTheme;

  public color!: string;

  public currentlyMutadedTaskId$!: Observable<string>;

  public constructor(private tasksStateService: TasksStateService) {}
  public ngOnInit(): void {
    this.styleConfig = taskListStyleConfig[this.listType];
    this.currentlyMutadedTaskId$ = this.tasksStateService.isMutatingTask$.pipe(
      map((value) => (value.isEditing ? value.taskId : ''))
    );
  }

  public setMutateMode(taskId: string): void {
    this.tasksStateService.setMutatingTask(taskId);
  }

  public handleMutateClick(updatedTask: TaskRouteResponse): void {
    this.tasksStateService.mutateTask(updatedTask);
  }

  public handleDeleteClick(taskId: string): void {
    this.tasksStateService.deleteTask(taskId);
  }

  public handleAddNewTask(): void {
    this.tasksStateService.addEmptyTaskShell(this.listType);
  }
}

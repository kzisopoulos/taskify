import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  TaskListType,
  TaskRouteResponse,
} from '../../../../core/models/task.interface';
import { NgIconComponent } from '@ng-icons/core';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { TasksService } from '../../../../core/services/tasks/state/tasks-state.service';
import { AuthService } from '../../../../core/services/auth/state/auth-state.service';
import { BehaviorSubject, Observable, map, pairwise, tap } from 'rxjs';
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
  @Input({ required: true }) public listType!: TaskListType;
  @Input({ required: true }) public title!: string;

  public styleConfig!: TaskListTheme;

  public color!: string;

  private idToEditSubject = new BehaviorSubject<number>(0);
  public idToEdit$!: Observable<number>;

  public constructor(
    private tasksService: TasksService,
    private authService: AuthService
  ) {}
  public ngOnInit(): void {
    this.styleConfig = taskListStyleConfig[this.listType];
    this.idToEdit$ = this.idToEditSubject.asObservable().pipe(
      pairwise(),
      tap(([prev, curr]) => {
        if (prev === -1 && curr !== -1) {
          // Discard the new task if it's empty and not being edited
          this.tasks = this.tasks.filter(
            (task) => task.id !== -1 && task.title !== ''
          );
        }
      }),
      map(([prev, curr]) => {
        if (curr === -1 && prev !== -1) {
          // Scenario #1: Cancelling a new task by clicking "X"
          return 0;
        } else if (curr === -1 && prev === -1) {
          // Scenario #3: Prevent creating a new shell if one is already open
          return 0;
        } else {
          // For other scenarios, maintain the current ID
          return curr;
        }
      })
    );
  }

  public toggleEditMode(taskId: number): void {
    if (this.idToEditSubject.getValue() === taskId) {
      this.idToEditSubject.next(0);
      return;
    }
    this.idToEditSubject.next(taskId);
  }

  public handleEditClick(updatedTask: TaskRouteResponse): void {
    // Scenario #4: Handling the edit state of existing tasks
    if (this.idToEditSubject.getValue() === updatedTask.id) {
      // If the task is already in edit mode, cancel the edit mode
      this.idToEditSubject.next(0);
    } else {
      // Set the edit mode for the selected task
      this.idToEditSubject.next(updatedTask.id);
    }

    if (updatedTask.id === -1) {
      this.tasksService.createTask({
        done: this.listType === 'done' ? true : false,
        note: 'temp',
        priority: 'temp',
        title: updatedTask.title,
      });
    } else {
      this.tasksService.updateTask(updatedTask.id, updatedTask);
    }
  }

  public handleDeleteClick(taskId: number): void {
    this.tasksService.deleteTask(taskId);
    this.idToEditSubject.next(0);
  }

  public handleAddNewTask(): void {
    if (this.idToEditSubject.getValue() !== -1) {
      // Insert one empty task (shell)
      this.tasks = [
        ...this.tasks,
        {
          id: -1,
          done: this.listType === 'done' ? true : false,
          note: 'temp',
          priority: 'temp',
          title: '',
          userId: this.authService.getUserId() || 0,
        },
      ];
      this.idToEditSubject.next(-1);
    }
  }
}

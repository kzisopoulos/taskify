import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  TaskStatus,
  TaskRouteResponse,
} from '../../../../core/models/task.interface';
import { NgIconComponent } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { TaskListTheme } from '../../../../core/models/task.theme.interface';
import { taskListStyleConfig } from '../../styles-config';

@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FormsModule],
  templateUrl: './task-list-item.component.html',
})
export class TaskListItemComponent implements OnInit {
  @Input({ required: true }) public task!: TaskRouteResponse;
  @Input({ required: true }) public listType!: TaskStatus;
  @Input({ required: true }) public color!: string;
  @Input({ required: true }) public isMutating!: boolean;

  public newTitle!: string;

  @Output() public toggleEdit = new EventEmitter<string>();
  @Output() public editClick = new EventEmitter<TaskRouteResponse>();
  @Output() public deleteClick = new EventEmitter<string>();

  public styleConfig!: TaskListTheme;

  public showIcons = false;

  public ngOnInit(): void {
    this.styleConfig = taskListStyleConfig[this.listType];
    this.newTitle = this.task.title;
  }

  public handleEditToggle() {
    this.toggleEdit.emit(this.task.id);
    this.newTitle = this.task.title;
  }

  public handleEdit() {
    this.editClick.emit({ ...this.task, title: this.newTitle });
  }

  public handleDelete() {
    this.deleteClick.emit(this.task.id);
  }
}

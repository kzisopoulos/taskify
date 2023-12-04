import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TasksService } from '../../../services/tasks.service';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheck, heroPencil } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroPencil, heroCheck })],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks: Task[];
  completedTasks: Task[];

  constructor(protected tasksList: TasksService, private router: Router) {
    this.tasks = this.tasksList.getTasks();
    this.completedTasks = this.tasksList.getCompletedTasks();
  }
  updateValues() {
    this.tasks = this.tasksList.getTasks();
    this.completedTasks = this.tasksList.getCompletedTasks();
  }

  completeTask(id: string) {
    this.tasksList.markTaskComplete(id);
    this.updateValues();
  }

  editTask(id: string) {
    this.router.navigate(['/edit-task', id]);
  }
}

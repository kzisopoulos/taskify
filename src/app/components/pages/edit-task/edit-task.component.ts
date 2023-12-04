import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Task, TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent {
  taskId: string | null = '';
  task: Task | null = null;

  constructor(private route: ActivatedRoute, private tasksList: TasksService) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    this.task = this.tasksList.getTask(this.taskId);
  }
}

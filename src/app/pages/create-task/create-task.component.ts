import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../core/services/tasks/state/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent {
  public constructor(
    private taskService: TasksService,
    private router: Router
  ) {}
  private fb = new FormBuilder();

  public createTaskForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    note: ['', Validators.required],
    priority: ['', Validators.required],
  });

  public onCreateTaskSubmit() {
    this.taskService.createTask({
      title: this.createTaskForm.value.title || '',
      note: this.createTaskForm.value.note || '',
      priority: this.createTaskForm.value.priority || '',
      done: false,
    });
    this.router.navigate(['']);
  }
}

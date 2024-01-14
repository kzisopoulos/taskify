import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../core/services/tasks/state/tasks.service';
import { map, switchMap, tap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
})
export class EditTaskComponent implements OnInit {
  constructor(
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TasksService
  ) {}

  task$ = this.route.params.pipe(
    takeUntilDestroyed(this.destroyRef),
    map(({ id }) => Number(id)),
    switchMap((id) =>
      this.taskService.tasks$.pipe(
        map((tasks) => {
          return tasks?.find((task) => task.id === id);
        })
      )
    )
  );

  ngOnInit(): void {
    this.task$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((task) => {
      if (task)
        this.editTaskForm.setValue({
          title: task?.title,
          note: task?.note,
          priority: task?.priority,
        });
    });
  }

  private fb = new FormBuilder();

  editTaskForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    note: ['', Validators.required],
    priority: ['', Validators.required],
  });

  onEditTaskSubmit(taskId: number) {
    this.taskService
      .updateTask(taskId, {
        title: this.editTaskForm.value.title || '',
        note: this.editTaskForm.value.note || '',
        priority: this.editTaskForm.value.priority || '',
        done: false,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.router.navigate(['']))
      )
      .subscribe();
  }
}

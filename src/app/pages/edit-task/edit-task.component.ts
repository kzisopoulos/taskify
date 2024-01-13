import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../core/services/tasks/state/tasks.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-task.component.html',
})
export class EditTaskComponent {
  taskId: number | null = 0;
  task$ = this.taskService.tasks$.pipe(
    map((tasks) => {
      return tasks?.find((task) => task.id === this.taskId);
    })
  );
  constructor(
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private taskService: TasksService
  ) {
    this.route.params
      .pipe(
        tap(console.log),
        map(({ id }) => id),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((id) => (this.taskId = Number(id)));
  }
}

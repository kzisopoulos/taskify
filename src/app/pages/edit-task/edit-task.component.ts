import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../core/services/tasks/state/tasks.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-task.component.html',
})
export class EditTaskComponent implements OnInit {
  taskId: number | null = 0;
  task$ = this.taskService.tasks$.pipe(
    map((tasks) => {
      return tasks?.find((task) => task.id === this.taskId);
    })
  );
  constructor(
    private route: ActivatedRoute,
    private taskService: TasksService
  ) {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
  }
}

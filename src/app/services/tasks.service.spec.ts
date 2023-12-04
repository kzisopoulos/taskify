import { TestBed } from '@angular/core/testing';
import { TasksService, Task } from './tasks.service';
import { v4 as uuidV4 } from 'uuid';

describe('TasksService', () => {
  let service: TasksService;
  let sampleTask: Task;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksService],
    });
    service = TestBed.inject(TasksService);
    sampleTask = {
      id: uuidV4(),
      title: 'New Task',
      priority: 'Medium',
      note: 'This is a note',
      done: false,
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task', () => {
    const initialLength = service.tasksList.length;
    service.addTask(sampleTask);
    expect(service.tasksList.length).toEqual(initialLength + 1);
  });

  it('should remove a task', () => {
    service.addTask(sampleTask);
    const initialLength = service.tasksList.length;
    service.removeTask(sampleTask.id);
    expect(service.tasksList.length).toEqual(initialLength - 1);
  });

  it('should return pending tasks', () => {
    const pendingTasks = service.getTasks();
    const allPending = pendingTasks.every((task) => !task.done);
    expect(allPending).toBeTrue();
  });

  it('should return completed tasks', () => {
    const completedTasks = service.getCompletedTasks();
    const allCompleted = completedTasks.every((task) => task.done);
    expect(allCompleted).toBeTrue();
  });

  it('should mark a task as complete', () => {
    service.addTask(sampleTask);
    service.markTaskComplete(sampleTask.id);
    const task = service.getTask(sampleTask.id);
    expect(task?.done).toBeTrue();
  });

  it('should get a specific task by ID', () => {
    service.addTask(sampleTask);
    const task = service.getTask(sampleTask.id);
    expect(task).toBeDefined();
    expect(task?.id).toEqual(sampleTask.id);
  });

  it('should return null for a nonexistent task ID', () => {
    const task = service.getTask('nonexistent-id');
    expect(task).toBeNull();
  });
});

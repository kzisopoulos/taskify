export interface TaskRouteResponse {
  id: string;
  title: string;
  status: TaskStatus;
  userId: string;
}

export interface CreateTaskBodyProps {
  title: string;
  status: TaskStatus;
  userId: string;
}

export interface UpdateTaskBodyProps {
  title: string;
  status: TaskStatus;
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';

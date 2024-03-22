export interface TaskRouteResponse {
  id: number;
  title: string;
  priority: string;
  note: string;
  done: boolean;
  userId: number;
}

export interface CreateTaskBodyProps {
  title: string;
  priority: string;
  note: string;
  done: boolean;
  userId: number;
}

export interface UpdateTaskBodyProps {
  title: string;
  priority: string;
  note: string;
  done: boolean;
}

export type TaskListType = 'pending' | 'done';

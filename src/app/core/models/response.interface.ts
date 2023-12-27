export interface RouteResponse<T> {
  success: boolean;
  code: number;
  message: string;
  error: string | null;
  data: T | null;
}

export interface TaskModel {
  id: string;
  title: string;
  isCompleted: boolean;
  date?: string; // YYYY-MM-DD
  userId: string;
}

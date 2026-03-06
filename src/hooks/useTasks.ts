import createFirestoreService from "../services/firestore-service";
import { db } from "../config/firebase";
import useFirestoreCollection from "./useFirestoreCollection";
import { where } from "firebase/firestore";
import type { TaskModel } from "../interfaces/task";
import { formatDate } from "../utils/formatDate";
import type { FirestoreEntity } from "../interfaces/firestore-entity.type";

const taskService = createFirestoreService<TaskModel>(db, "tasks");

export default function useTasks(date: Date) {
  const { data: tasks, isLoading } = useFirestoreCollection<TaskModel>(
    taskService,
    [where("date", "==", formatDate(date))],
    (tasks: FirestoreEntity<TaskModel>[]) => {
      return [...tasks].sort((a, b) => {
        const aOrder = a.isCompleted ? 1 : 0;
        const bOrder = b.isCompleted ? 1 : 0;
        return aOrder - bOrder;
      });
    },
  );
  return {
    tasks,
    isLoading,
    createTask: taskService.create,
    deleteTask: taskService.delete,
    updateTask: taskService.update,
  };
}

import { useEffect, useState } from "react";
import type { TaskModel } from "../interfaces/task";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export default function useTasks(date: Date) {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const tasksColRef = collection(db, "tasks");

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = (await getDocs(tasksColRef)).docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          }) as TaskModel,
      );
      setTasks(tasks);
    };
    loadTasks();
  }, [date]);

  const addTask = (taskText: string) => {
    const addTaskToDb = async () => {
      const newTask = {
        title: taskText,
        isCompleted: false,
        userId: "",
      };
      const newTaskRef = await addDoc(tasksColRef, newTask);
      setTasks((prev) => [
        {
          ...newTask,
          id: newTaskRef.id,
        },
        ...prev,
      ]);
    };
    addTaskToDb();
  };

  const updateTask = (id: string, isCompleted: boolean) => {
    const updateTaskInDb = async () => {
      console.log(id);
      const taskReference = doc(tasksColRef, id);
      const updatedTaskRef = await updateDoc(taskReference, {
        isCompleted,
      });
      setTasks((prev) =>
        prev
          .map((task) =>
            task.id === id ? { ...task, isCompleted: isCompleted } : task,
          )
          .sort((a, b) => {
            const aOrder = a.isCompleted ? 1 : 0;
            const bOrder = b.isCompleted ? 1 : 0;
            return aOrder - bOrder;
          }),
      );
    };
    updateTaskInDb();
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask };
}

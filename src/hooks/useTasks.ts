import { useEffect, useMemo, useState } from "react";
import type { TaskModel } from "../interfaces/task";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { formatDate } from "../utils/formatDate";

export default function useTasks(date: Date) {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const tasksColRef = useMemo(() => collection(db, "tasks"), []);

  useEffect(() => {
    const loadTasks = async () => {
      console.log(formatDate(date));
      const q = query(tasksColRef, where("date", "==", formatDate(date)));
      const tasks = (await getDocs(q)).docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          }) as TaskModel,
      );
      setTasksList(tasks);
    };
    loadTasks();
  }, [date]);

  const addTask = async (taskText: string, date: Date) => {
    const newTask = {
      title: taskText,
      isCompleted: false,
      userId: "",
      date: formatDate(date),
    };
    const newTaskRef = await addDoc(tasksColRef, newTask);
    const updatedTasksList = [
      {
        ...newTask,
        id: newTaskRef.id,
      },
      ...tasks,
    ];
    setTasksList(updatedTasksList);
  };

  const updateTask = async (id: string, isCompleted: boolean) => {
    const taskReference = doc(tasksColRef, id);
    await updateDoc(taskReference, {
      isCompleted,
    });
    const updatedTasksList = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: isCompleted } : task,
    );
    setTasksList(updatedTasksList);
  };

  const deleteTask = async (id: string) => {
    const taskReference = doc(tasksColRef, id);
    await deleteDoc(taskReference);
    const updatedTasksList = tasks.filter((task) => task.id !== id);
    setTasksList(updatedTasksList);
  };

  const setTasksList = (tasks: TaskModel[]) => {
    setTasks(
      tasks.sort((a, b) => {
        const aOrder = a.isCompleted ? 1 : 0;
        const bOrder = b.isCompleted ? 1 : 0;
        return aOrder - bOrder;
      }),
    );
  };

  return { tasks, addTask, updateTask, deleteTask };
}

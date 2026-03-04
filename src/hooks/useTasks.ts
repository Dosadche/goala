import { useEffect, useMemo, useState } from "react";
import type { TaskModel } from "../interfaces/task";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
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
    const q = query(tasksColRef, where("date", "==", formatDate(date)));
    const loadTasks = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as TaskModel[];
      setTasks(
        [...tasks].sort((a, b) => {
          const aOrder = a.isCompleted ? 1 : 0;
          const bOrder = b.isCompleted ? 1 : 0;
          return aOrder - bOrder;
        }),
      );
    });
    return loadTasks;
  }, [date, tasksColRef]);

  const addTask = async (taskText: string, date: Date) => {
    await addDoc(tasksColRef, {
      title: taskText,
      isCompleted: false,
      userId: "",
      date: formatDate(date),
    });
  };

  const updateTask = async (id: string, isCompleted: boolean) => {
    await updateDoc(doc(tasksColRef, id), {
      isCompleted,
    });
  };

  const deleteTask = async (id: string) => {
    await deleteDoc(doc(tasksColRef, id));
  };

  return { tasks, addTask, updateTask, deleteTask };
}

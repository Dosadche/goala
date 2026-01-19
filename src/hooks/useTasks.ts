import { useEffect, useRef, useState } from "react";
import type { TaskModel } from "../interfaces/task";
import { formatDate } from "../utils/formatDate";

export default function useTasks(date: Date) {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const isHydratingRef = useRef(true);

  useEffect(() => {
    isHydratingRef.current = true;
    const formattedDate = formatDate(date);
    const rawTasks = localStorage.getItem(formattedDate);
    if (!rawTasks) {
      setTasks([]);
      return;
    }
    try {
      setTasks(JSON.parse(rawTasks));
    } catch {
      setTasks([]);
    }
  }, [date]);

  useEffect(() => {
    if (isHydratingRef.current) {
      isHydratingRef.current = false;
      return;
    }
    const key = formatDate(date);
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [tasks]);

  const updateTask = (id: string, isCompleted: boolean) => {
    console.log(":: task is updated");
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: isCompleted } : task
      )
    );
  };

  const addTask = (taskText: string) => {
    setTasks((prev) => {
      const updatedTasks = [
        {
          id: crypto.randomUUID(),
          title: taskText,
          isCompleted: false,
        },
        ...prev,
      ];
      return updatedTasks;
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask };
}

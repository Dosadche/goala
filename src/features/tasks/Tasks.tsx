import { useState } from "react";
import Card from "../../ui/Card";
import Task from "./Task";
import TaskInput from "./TaskInput";
import CalendarController from "./CalendarController";
import useTasks from "../../hooks/useTasks";

export default function Tasks() {
  const [date, setDate] = useState<Date>(new Date());
  const { tasks, addTask, updateTask, deleteTask } = useTasks(date);

  return (
    <>
      <div className="flex flex-col gap-4">
        <Card>
          <CalendarController
            date={date}
            onDateChange={(date: Date) => setDate(date)}
          />
          <div className="w-[300px] h-[300px] flex flex-col gap-2 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {tasks.length ? (
              tasks.map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  onStatusChange={(isCompleted) =>
                    updateTask(task.id, isCompleted)
                  }
                  onDeleteClick={() => deleteTask(task.id)}
                />
              ))
            ) : (
              <p className="m-auto text-sm">No tasks yet...</p>
            )}
          </div>
        </Card>
        <TaskInput onSubmit={(taskText) => addTask(taskText)} />
      </div>
    </>
  );
}

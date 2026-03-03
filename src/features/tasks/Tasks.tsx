import { useEffect, useRef, useState } from "react";
import Card from "../../ui/Card";
import Task from "./Task";
import TaskInput from "./TaskInput";
import CalendarController from "./CalendarController";
import useTasks from "../../hooks/useTasks";
import { animated, SpringValue, useTransition } from "react-spring";
import clsx from "clsx";
import TaskContextMenu from "./TaskContextMenu";
import type { TaskModel } from "../../interfaces/task";

interface ContextMenu {
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  taskId: string;
}

export default function Tasks() {
  const CONTEXT_MENU_WIDTH = 90;
  const TASK_ITEM_HEIGHT = 65.81;
  const [date, setDate] = useState<Date>(new Date());
  const { tasks, addTask, updateTask, deleteTask } = useTasks(date);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
  const transitions = useTransition<
    { task: TaskModel; y: number },
    { y: SpringValue<number>; opacity: SpringValue<number> }
  >(
    tasks.map((task: TaskModel, index: number) => ({
      task,
      y: index * TASK_ITEM_HEIGHT,
    })),
    {
      keys: ({ task }) => task.id,
      from: {
        position: "absolute",
        opacity: 0,
      },
      leave: ({ y }) => ({ opacity: 0, y }),
      enter: ({ y }) => ({
        y,
        opacity: 1,
      }),
      update: ({ y }) => ({
        y,
      }),
    },
  );
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!contextMenuRef.current) return;
      if (!contextMenuRef.current.contains(event.target as Node)) {
        setContextMenu(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick, true);
    document.addEventListener("touchstart", handleOutsideClick, true);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
      document.removeEventListener("touchstart", handleOutsideClick, true);
    };
  }, []);

  const handleContextMenuClick = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(() => {
      const left = Math.min(
        event.clientX,
        window.innerWidth - CONTEXT_MENU_WIDTH,
      );
      return {
        taskId: id,
        position: {
          top: `${event.clientY}px`,
          left: `${left}px`,
        },
      };
    });
  };

  const handleDeleteTaskClicked = () => {
    if (contextMenu?.taskId) {
      deleteTask(contextMenu.taskId);
    }
    setContextMenu(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CalendarController
          date={date}
          onDateChange={(date: Date) => setDate(date)}
        />
        <div
          className="w-[300px] h-[300px] overflow-y-auto relative [scrollbar-width:none] [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden"
        >
          {tasks.length ? (
            transitions(({ y, opacity }, { task }) => (
              <animated.div
                key={task.id}
                style={{
                  position: "absolute",
                  width: "100%",
                  opacity,
                  transform: y.to((y: number) => `translate3d(0, ${y}px, 0)`),
                }}
              >
                <Task
                  task={task}
                  onStatusChange={(isCompleted) =>
                    updateTask(task.id, isCompleted)
                  }
                  onContextMenuClick={(event: React.MouseEvent) =>
                    handleContextMenuClick(task.id, event)
                  }
                />
              </animated.div>
            ))
          ) : (
            <p className="m-auto text-sm">No tasks yet...</p>
          )}
        </div>
      </Card>
      <TaskInput onSubmit={(taskText) => addTask(taskText, date)} />
      <div
        role="menu"
        tabIndex={0}
        ref={contextMenuRef}
        onClick={(event) => event.stopPropagation()}
        className={clsx("fixed w-[90px] z-50", contextMenu ? "flex" : "hidden")}
        style={contextMenu?.position}
      >
        <TaskContextMenu onDeleteClick={handleDeleteTaskClicked} />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import useToggle from "../../hooks/useToggle";
import type { TaskModel } from "../../interfaces/task";
import Checkbox from "../ui/Checkbox";
import TaskContextMenu from "./TaskContextMenu";
import clsx from "clsx";

interface TaskProps {
  task: TaskModel;
  onStatusChange: (value: boolean) => void;
  onDeleteClick: () => void;
}

interface ContextMenuPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export default function Task({
  task,
  onStatusChange,
  onDeleteClick,
}: TaskProps) {
  const CONTEXT_MENU_WIDTH = 90;
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [isContextMenuVisible, toggleContextMenu] = useToggle(false);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition>({});
  const handleContextMenuClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenuPosition(() => {
      const left = Math.min(
        event.clientX,
        window.innerWidth - CONTEXT_MENU_WIDTH
      );
      return {
        top: `${event.clientY}px`,
        left: `${left}px`,
      };
    });
    toggleContextMenu(true);
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!contextMenuRef.current) return;
      if (!contextMenuRef.current.contains(event.target as Node)) {
        toggleContextMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick, true);
    document.addEventListener("touchstart", handleOutsideClick, true);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
      document.removeEventListener("touchstart", handleOutsideClick, true);
    };
  }, [toggleContextMenu]);

  return (
    <div
      tabIndex={0}
      onClick={() => onStatusChange(!task.isCompleted)}
      onContextMenu={handleContextMenuClick}
      className={clsx(
        "w-full p-4 border rounded-[8px] cursor-pointer transition-colors",
        task.isCompleted
          ? "bg-(--goala-green-transparent) border-(--goala-green)"
          : "bg-(--goala-blue-transparent) border-(--goala-blue)"
      )}
    >
      <Checkbox
        isChecked={task.isCompleted}
        label={task.title}
        onChange={(value) => onStatusChange(value)}
      />
      <div
        tabIndex={0}
        ref={contextMenuRef}
        onClick={(event) => event.stopPropagation()}
        className={clsx(
          "absolute w-[90px]",
          isContextMenuVisible ? "flex" : "hidden"
        )}
        style={contextMenuPosition}
      >
        <TaskContextMenu onDeleteClick={onDeleteClick} />
      </div>
    </div>
  );
}

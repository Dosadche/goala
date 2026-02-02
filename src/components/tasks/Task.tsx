import type { TaskModel } from "../../interfaces/task";
import Checkbox from "../ui/Checkbox";
import clsx from "clsx";

interface TaskProps {
  task: TaskModel;
  onStatusChange: (value: boolean) => void;
  onContextMenuClick: (event: React.MouseEvent) => void;
}

export default function Task({
  task,
  onStatusChange,
  onContextMenuClick,
}: TaskProps) {
  return (
    <div
      tabIndex={0}
      onClick={() => onStatusChange(!task.isCompleted)}
      onContextMenu={(event: React.MouseEvent) => onContextMenuClick(event)}
      className={clsx(
        "w-full p-4 border rounded-[8px] cursor-pointer transition-colors",
        task.isCompleted
          ? "bg-(--goala-green-transparent) border-(--goala-green)"
          : "bg-(--goala-blue-transparent) border-(--goala-blue)",
      )}
    >
      <Checkbox
        isChecked={task.isCompleted}
        label={task.title}
        onChange={(value) => onStatusChange(value)}
      />
    </div>
  );
}

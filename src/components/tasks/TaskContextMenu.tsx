import trashIconSvg from "../../assets/icons/trash.svg";

interface TaskContextMenuProps {
  onDeleteClick: () => void;
}

export default function TaskContextMenu({
  onDeleteClick,
}: TaskContextMenuProps) {
  return (
    <div className="bg-(--card-bg) backdrop-blur-[10px] w-full rounded-[10px] border border-(--card-bg) flex flex-col hover:bg-(--white-transparent) transition-colors">
      <button
        onClick={onDeleteClick}
        className="py-1 px-2 text-sm flex items-center gap-1"
      >
        <img src={trashIconSvg} alt="Delete icon" className="h-4" />
        <span>Delete</span>
      </button>
    </div>
  );
}

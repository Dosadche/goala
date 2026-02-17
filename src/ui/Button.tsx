import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  customClasses?: string;
  type?: ButtonType;
}

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger",
}

const BUTTON_CLASSES: Record<ButtonType, string> = {
  [ButtonType.Primary]:
    "bg-(--goala-blue-transparent) border border-(--goala-blue-darker) hover:bg-(--goala-blue-darker)",
  [ButtonType.Secondary]:
    "bg-(--goala-green-transparent) border border-(--goala-green) hover:bg-(--goala-green)",
  [ButtonType.Danger]:
    "bg-(--goala-red-transparent) border border-(--goala-red) hover:bg-(--goala-red)",
};

export default function Button({
  children,
  customClasses,
  type = ButtonType.Primary,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "h-10 px-4 py-1 cursor-pointer rounded-[8px] font-semibold transition-colors",
        BUTTON_CLASSES[type],
        customClasses,
      )}
    >
      {children}
    </button>
  );
}

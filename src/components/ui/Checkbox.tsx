import clsx from "clsx";
import checkIconSrc from "../../assets/icons/check.svg";

interface CheckboxProps {
  isChecked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export default function Checkbox({
  isChecked,
  label,
  onChange,
}: CheckboxProps) {
  const id = crypto.randomUUID();

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />

        <span
          className={clsx(
            "h-5 w-5 flex items-center justify-center rounded-[4px] border transition-colors",
            isChecked
              ? "border-(--goala-blue-darker) bg-(--goala-blue-darker) hover:bg-(--goala-blue)"
              : "border-(--white) hover:bg-(--card-bg)",
          )}
        >
          <img
            src={checkIconSrc}
            alt=""
            className={isChecked ? "opacity-100" : "opacity-0"}
          />
        </span>

        {label && <span>{label}</span>}
      </label>
    </div>
  );
}

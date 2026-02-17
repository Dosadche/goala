import { useState } from "react";
import Card from "../../ui/Card";
import sendIconSrc from "../../assets/icons/send.svg";

interface TaskInputProps {
  onSubmit: (text: string) => void;
}

export default function TaskInput({ onSubmit }: TaskInputProps) {
  const [taskText, setTaskText] = useState<string>("");

  const submit = () => {
    if (taskText?.length) {
      onSubmit(taskText);
      setTaskText("");
    }
  };

  return (
    <>
      <Card>
        <div className="flex items-center gap-2">
          <input
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                submit();
              }
            }}
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            type="text"
            placeholder="Add new task"
            className="border-none outline-none w-full"
          />
          <button onClick={submit} className="cursor-pointer">
            <img src={sendIconSrc} alt="Send icon" />
          </button>
        </div>
      </Card>
    </>
  );
}

import arrowRightIconSrc from "../../assets/icons/arrow-right.svg";
import arrowLeftIconSrc from "../../assets/icons/arrow-left.svg";

interface CalendarControllerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export default function CalendarController({
  date,
  onDateChange,
}: CalendarControllerProps) {
  const buttonClasses = "cursor-pointer h-5 w-5";
  const iconClasses = "transition-all h-4 w-4 hover:h-5 hover:w-5";

  const handleChangeDateClick = (
    currentDate: Date,
    direction: "next" | "prev"
  ) => {
    const updatedDate = new Date(currentDate);
    updatedDate.setDate(
      updatedDate.getDate() + (direction === "next" ? 1 : -1)
    );
    onDateChange(updatedDate);
  };

  const setToday = () => onDateChange(new Date());

  return (
    <div className="pb-4 flex justify-between items-center h-9">
      <button
        onClick={() => handleChangeDateClick(date, "prev")}
        className={buttonClasses}
      >
        <img
          src={arrowLeftIconSrc}
          alt="Arrow left icon"
          className={iconClasses}
        />
      </button>
      <button
        onClick={setToday}
        className="font-semibold text-sm cursor-pointer"
      >
        {date.toDateString()}
      </button>
      <button
        onClick={() => handleChangeDateClick(date, "next")}
        className={buttonClasses}
      >
        <img
          src={arrowRightIconSrc}
          alt="Arrow right icon"
          className={iconClasses}
        />
      </button>
    </div>
  );
}

import { useState } from "react";
import goalaLogoSrc from "../../assets/images/coala.png";
import clsx from "clsx";

export default function Logo() {
  const [isLogoVisible, setIsLogoVisible] = useState<boolean>(true);
  const logoClasses = "transition-opacity duration-300";
  const showLogoClasses = isLogoVisible ? "opacity-100" : "opacity-0";
  const showTextClasses = isLogoVisible ? "opacity-0" : "opacity-100";
  return (
    <div
      onMouseEnter={() => setIsLogoVisible(false)}
      onMouseLeave={() => setIsLogoVisible(true)}
      className="relative h-[200px] w-[200px]"
    >
      <img
        src={goalaLogoSrc}
        alt="Goala logo"
        className={clsx(
          "h-[200px] w-[200px] absolute",
          logoClasses,
          showLogoClasses
        )}
      />
      <h2
        className={clsx(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-(--goala-green) drop-shadow-(--goala-logo-shadow)",
          logoClasses,
          showTextClasses
        )}
      >
        GOALA
      </h2>
    </div>
  );
}

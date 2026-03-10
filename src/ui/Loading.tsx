import bambooSrc from "../assets/images/bamboo.png";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen p-4 flex flex-col">
      <div className="flex items-center gap-1 bg-(--card-bg) p-4 w-fit ml-auto rounded-[20px]">
        <p className="text-lg font-semibold">Loading...</p>
        <img
          src={bambooSrc}
          alt="Bamboo Image"
          className="h-8 w-8 animate-spin"
        />
      </div>
    </div>
  );
}

import Tasks from "../tasks/Tasks";
import Logo from "../../ui/Logo";

export default function Dashboard() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <Logo />
      <Tasks />
    </section>
  );
}

import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Background from "./components/ui/Background";

export default function App() {
  return (
    <section className="h-screen w-screen">
      <Background />
      <Dashboard />
    </section>
  );
}

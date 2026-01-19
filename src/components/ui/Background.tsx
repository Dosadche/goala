export default function Background() {
  return (
    <div className="w-[100vw] h-[100vh] absolute overflow-hidden -z-11 after:content-[''] after:[background:var(--dashboard-gradient)] after:h-[2400px] after:w-[1600px] after:absolute after:-z-1 after:top-[35vh] after:left-1/2 after:-translate-x-1/2"></div>
  );
}

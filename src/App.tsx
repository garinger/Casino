import ColorSplotch from "./components/ColorSplotch";

export default function App() {
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-2">
      <h1 className="text-xl font-semibold text-white">Casino</h1>
      <div className="flex w-full justify-center gap-2">
        <ColorSplotch color={"bg-roulette-black"} />
        <ColorSplotch color={"bg-roulette-red"} />
        <ColorSplotch color={"bg-roulette-green"} />
        <ColorSplotch color={"bg-dark-background"} />
      </div>
    </div>
  );
}

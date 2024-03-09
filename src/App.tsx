import PastOutcomeList from "./components/PastOutcomeList";
import RouletteBar from "./components/RouletteBar";
import RouletteCountdown from "./components/RouletteCountdown";

export default function App() {
  return (
    <div className="mt-24 flex flex-col items-center justify-center gap-5">
      <PastOutcomeList />
      <RouletteBar />
      <RouletteCountdown />
    </div>
  );
}

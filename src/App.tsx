import PastOutcomeList from "./components/PastOutcomeList";

export default function App() {
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-2">
      <h1 className="text-xl font-semibold text-white">Casino</h1>
      <PastOutcomeList />
    </div>
  );
}

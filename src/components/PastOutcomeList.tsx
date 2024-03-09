import useRouletteStore from "../store/rouletteStore";
import PastOutcome from "./PastOutcome";
import { RouletteGame } from "../types/RouletteGame";

export default function PastOutcomeList() {
  const pastGames: RouletteGame[] = useRouletteStore((state) =>
    state.pastGames.slice(-10).reverse(),
  );

  return (
    <div className="flex w-3/4 gap-2 overflow-hidden md:w-2/3 xl:w-1/2">
      {pastGames.map((pastGame: RouletteGame) => (
        <PastOutcome key={pastGame.id} outcome={pastGame.outcome} />
      ))}
    </div>
  );
}

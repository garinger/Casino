import useRouletteState from "../store/rouletteStore";
import PastOutcome from "./PastOutcome";
import { PastRouletteGame } from "../types/PastRouletteGame";

export default function PastOutcomeList() {
  const pastGames: PastRouletteGame[] = useRouletteState((state) =>
    state.pastGames.slice(-10).reverse(),
  );

  return (
    <div className="flex w-3/4 gap-2 overflow-hidden md:w-2/3 xl:w-1/2">
      {pastGames.map((pastGame: PastRouletteGame) => (
        <PastOutcome key={pastGame.id} outcome={pastGame.outcome} />
      ))}
    </div>
  );
}

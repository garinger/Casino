import { useState } from "react";
import useRouletteStore from "../store/rouletteStore";
import useInterval from "../hooks/useInterval";

function calculateTimePercentage(
  currentTime: number,
  futureTime: number,
  duration: number,
) {
  const timePassed = futureTime - currentTime;
  const percentagePassed = timePassed / duration;
  return Math.max(0, Math.min(1, percentagePassed));
}

export default function RouletteCountdown() {
  const nextSpin = useRouletteStore((state) => state.nextSpin);
  const [progress, setProgress] = useState(1);

  const refreshRate = 1000 / 144;
  useInterval(() => {
    setProgress(calculateTimePercentage(Date.now(), nextSpin!, 6000));
  }, refreshRate);

  return (
    <div className="w-3/4 md:w-2/3 xl:w-1/2">
      <div
        className="h-1 w-full origin-left rounded bg-white will-change-transform"
        style={{ transform: `scaleX(${progress === 1 ? 0 : progress})` }}
      ></div>
    </div>
  );
}

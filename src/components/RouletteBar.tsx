import { useState } from "react";
import RouletteItem from "./RouletteItem";
import useRouletteStore from "../store/rouletteStore";
import useInterval from "../hooks/useInterval";
import { RouletteColor } from "../types/RouletteColor";

const pattern = [
  RouletteColor.BLACK,
  RouletteColor.RED,
  RouletteColor.BLACK,
  RouletteColor.RED,
  RouletteColor.BLACK,
  RouletteColor.RED,
  RouletteColor.BLACK,
  RouletteColor.RED,
  RouletteColor.BLACK,
  RouletteColor.RED,
  RouletteColor.BLACK,
  RouletteColor.RED,
  RouletteColor.BLACK,
  RouletteColor.RED,
  RouletteColor.GREEN,
];

const rouletteItems = [
  ...pattern,
  ...pattern,
  ...pattern,
  ...pattern,
  ...pattern,
  ...pattern,
  ...pattern,
];

function bezier(
  t: number,
  initial: number,
  p1: number,
  p2: number,
  final: number,
) {
  return (
    (1 - t) * (1 - t) * (1 - t) * initial +
    3 * (1 - t) * (1 - t) * t * p1 +
    3 * (1 - t) * t * t * p2 +
    t * t * t * final
  );
}

function calcProgress(startTime: number, currTime: number, endTime: number) {
  if (currTime < startTime) return 0.0;

  const curr = currTime - startTime;
  const end = endTime - startTime;

  const percentage = curr / end;
  if (percentage > 1) return 1.0;

  return curr / end;
}

export default function RouletteBar() {
  const spinStart = useRouletteStore((state) => state.spinStart);
  const spinEnd = useRouletteStore((state) => state.spinEnd);
  const outcome = useRouletteStore((state) => state.outcome);
  const spinOffset = useRouletteStore((state) => state.spinOffset);

  const itemCount = 105,
    itemWidth = 64,
    itemGap = 8,
    middleLineWidth = 4;

  const start =
    (itemCount * (itemWidth + itemGap)) / 2 -
    middleLineWidth / 2 -
    itemWidth / 2;

  const end = start - (itemWidth + itemGap) * (59 + outcome!) - spinOffset!;

  const [position, setPosition] = useState(start);

  const refreshRate = 1000 / 144;
  useInterval(() => {
    const progress = calcProgress(
      new Date(spinStart!).getTime(),
      performance.now() + performance.timeOrigin,
      new Date(spinEnd!).getTime(),
    );
    const newPosition = bezier(progress, start, end + 100, end, end);
    setPosition(newPosition);
  }, refreshRate);

  return (
    <div className="relative w-3/4 overflow-clip rounded-xl bg-dark-background md:w-2/3 xl:w-1/2">
      <div className="absolute bottom-0 left-1/2 right-0 top-0 z-50 h-full w-1 bg-white"></div>
      <div
        className="flex justify-center gap-2 py-4 will-change-transform"
        style={{ transform: `translateX(${position}px)` }}
      >
        {rouletteItems.map((color: RouletteColor, index) => (
          <RouletteItem key={index} color={color} />
        ))}
      </div>
    </div>
  );
}

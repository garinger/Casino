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

function calculatePosition(startPos: number, endPos: number, startTime: Date, endTime: Date, currentTime: Date) {
  // Calculate the total duration in milliseconds
  const totalDuration = endTime.getTime() - startTime.getTime();

  // Calculate the elapsed time in milliseconds
  const elapsedTime = currentTime.getTime() - startTime.getTime();

  // Ensure that the elapsed time is within the bounds of the start and end time
  if (elapsedTime < 0) {
    return startPos;
  } else if (elapsedTime >= totalDuration) {
    return endPos;
  }

  // Calculate the proportion of the journey completed
  const journeyProgress = elapsedTime / totalDuration;

  // Calculate the current position based on the journey progress
  const currentPosition = startPos + journeyProgress * (endPos - startPos);

  return currentPosition;
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

  // TODO: Add spin offset.
  const end = start - (itemWidth + itemGap) * (59 + outcome!) - spinOffset!;

  const [position, setPosition] = useState(start);

  // TODO: Use performance.now() instead of dates!
  // TODO: Try a different calculatePosition function.
  useInterval(() => {
    setPosition(
      calculatePosition(
        start,
        end,
        new Date(spinStart!),
        new Date(spinEnd!),
        new Date(),
      ),
    );
  }, 1000 / 144);

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

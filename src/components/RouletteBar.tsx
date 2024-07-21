import { useState, useRef, useEffect } from "react";
import RouletteItem from "./RouletteItem";
import useRouletteStore from "../store/rouletteStore";
import useInterval from "../hooks/useInterval";
import { RouletteColor } from "../types/RouletteColor";
import RouletteBarMiddleLine from "./RouletteBarMiddleLine";
import useSound from "use-sound";
import tick from "../assets/sounds/tick.mp3";

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
  const delta = useRouletteStore((state) => state.delta);
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
      spinStart! + delta!,
      performance.now() + performance.timeOrigin,
      spinEnd! + delta!,
    );
    const newPosition = bezier(progress, start, end + 100, end, end);
    setPosition(newPosition);
  }, refreshRate);

  const [hoveredItem, setHoveredItem] = useState<number>(0);
  const barRef = useRef<HTMLDivElement>(null);
  const middleLineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [play] = useSound(tick);

  useEffect(() => {
    const checkOverlap = () => {
      if (!middleLineRef.current || !barRef.current) return;

      const middleLineRect = middleLineRef.current?.getBoundingClientRect();

      if (itemRefs.current)
        for (let i = 0; i < itemRefs.current.length; i++) {
          const itemRect = itemRefs.current[i].getBoundingClientRect();

          if (
            middleLineRect.left < itemRect.right &&
            middleLineRect.right > itemRect.left &&
            middleLineRect.top < itemRect.bottom &&
            middleLineRect.bottom > itemRect.top
          ) {
            setHoveredItem(i);
            return;
          }
        }
    };

    checkOverlap();
  }, [position]);

  useEffect(() => {
    play();
  }, [hoveredItem]);

  return (
    <div className="relative w-3/4 overflow-clip rounded-xl bg-dark-background md:w-2/3 xl:w-1/2">
      <RouletteBarMiddleLine ref={middleLineRef} />
      <div
        className="flex items-center justify-center gap-2 py-4 will-change-transform"
        style={{ transform: `translateX(${position}px)` }}
        ref={barRef}
      >
        {rouletteItems.map((color: RouletteColor, index) => (
          <RouletteItem
            key={index}
            color={color}
            hovered={hoveredItem === index}
            ref={(el: HTMLDivElement) => (itemRefs.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
}

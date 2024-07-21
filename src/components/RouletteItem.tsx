import { forwardRef } from "react";
import { RouletteColor } from "../types/RouletteColor";

type Props = {
  color: RouletteColor;
  hovered: boolean;
};

const RouletteItem = forwardRef(({ color, hovered }: Props, ref: any) => {
  const bg =
    color === RouletteColor.GREEN
      ? "bg-roulette-green"
      : color === RouletteColor.RED
        ? "bg-roulette-red"
        : "bg-roulette-black";

  const hoveredStyle = hovered ? "h-[68px] min-w-[68px]" : "h-16 min-w-16";

  return (
    <div
      className={`${bg} ${hoveredStyle} h-16 min-w-16 rounded-lg`}
      ref={ref}
    ></div>
  );
});

export default RouletteItem;

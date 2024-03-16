import { RouletteColor } from "../types/RouletteColor";

type Props = {
  color: RouletteColor;
};

export default function RouletteItem({ color }: Props) {
  const bg =
    color === RouletteColor.GREEN
      ? "bg-roulette-green"
      : color === RouletteColor.RED
        ? "bg-roulette-red"
        : "bg-roulette-black";

  return <div className={`${bg} h-16 min-w-16 rounded-lg`}></div>;
}

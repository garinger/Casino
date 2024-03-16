import { RouletteColor } from "../types/RouletteColor";

type Props = {
  color: RouletteColor;
};

export default function PlaceBetButton({ color }: Props) {
  const bg =
    color === RouletteColor.GREEN
      ? "bg-roulette-green"
      : color === RouletteColor.RED
        ? "bg-roulette-red"
        : "bg-roulette-black";

  return (
    <button className={`${bg} w-full rounded-md p-3 text-neutral-100`}>
      Place Bet
    </button>
  );
}

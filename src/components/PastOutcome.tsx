interface Props {
  outcome: number;
}

export default function PastOutcome({ outcome }: Props) {
  const color =
    outcome === 0
      ? "bg-roulette-green"
      : outcome % 2 === 0
        ? "bg-roulette-red"
        : "bg-roulette-black";

  return (
    <div
      className={`aspect-square h-5 w-5 rounded-full sm:h-7 sm:w-7 ${color}`}
    ></div>
  );
}

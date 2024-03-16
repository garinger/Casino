import BetColumn from "../components/BetColumn";
import PlaceBetButton from "../components/PlaceBetButton";
import { RouletteColor } from "../types/RouletteColor";
import Bet from "./Bet";

export default function BetArea() {
  return (
    <div className="flex w-3/4 flex-col justify-between gap-3 md:w-3/4 md:flex-row xl:w-7/12">
      <BetColumn>
        <PlaceBetButton color={RouletteColor.BLACK} />
        <Bet name="Jackson" amount={4.87} />
        <Bet name="Jackson" amount={4.87} />
        <Bet name="Jackson" amount={4.87} />
        <Bet name="Jackson" amount={4.87} />
        <Bet name="Jackson" amount={4.87} />
      </BetColumn>
      <BetColumn>
        <PlaceBetButton color={RouletteColor.GREEN} />
        <Bet
          picture="https://avatars.cloudflare.steamstatic.com/1eaa704912eccd5d1e6b59c05c740f30f2a55875_full.jpg"
          name="Methamphetamine Miller"
          amount={4.87}
        />
      </BetColumn>
      <BetColumn>
        <PlaceBetButton color={RouletteColor.RED} />
        <Bet name="Jackson" amount={4.87} />
        <Bet name="Jackson" amount={4.87} />
        <Bet name="Jackson" amount={4.87} />
      </BetColumn>
    </div>
  );
}

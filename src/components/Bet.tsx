type Props = {
  picture?: string;
  name: string;
  amount: number;
};

export default function Bet({
  picture = "https://avatars.cloudflare.steamstatic.com/74b335da6b89ebbd28929b8eb0d5d9153c5df592_full.jpg",
  name,
  amount,
}: Props) {
  const n = name.length > 15 ? name.slice(0, 13) + "..." : name;
  return (
    <div className="flex items-center justify-between gap-5 rounded-md px-5 py-1 text-neutral-100">
      <img className="h-8 rounded-full" src={picture} alt={name}></img>
      <p>{n}</p>
      <p className="truncate">{amount}</p>
    </div>
  );
}

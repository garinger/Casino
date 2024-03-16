type Props = {
  children: any;
};

export default function BetColumn({ children }: Props) {
  return <div className="flex w-full flex-col gap-2 md:w-1/3">{children}</div>;
}

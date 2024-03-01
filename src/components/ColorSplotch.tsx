type Props = {
  color: string;
};

export default function ColorSplotch({ color }: Props) {
  return <div className={`h-16 w-16 rounded-lg ${color}`}></div>;
}

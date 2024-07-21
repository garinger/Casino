import { forwardRef } from "react";

type Props = {};

const RouletteBarMiddleLine = forwardRef(({}: Props, ref: any) => {
  return (
    <div
      className="absolute bottom-0 left-1/2 right-0 top-0 z-50 h-full w-1 bg-white"
      ref={ref}
    ></div>
  );
});

export default RouletteBarMiddleLine;

import { ReactComponent as XIcon } from "../assets/X.svg";
import { ReactComponent as OIcon } from "../assets/O.svg";


type SquareProps = {
  value: "X" | "O" | null;
  onClick: () => void;
};

export default function Square({ value, onClick }: SquareProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-20 h-20 
        bg-gray-800 
        rounded-lg 
        flex items-center justify-center 
        text-3xl font-bold 
        hover:bg-gray-700 
        transition
      "
    >
      {value === "X" && <XIcon className="w-14 h-14 text-white" />}
      {value === "O" && <OIcon className="w-14 h-14 text-white" />}
    </button>
  );
}

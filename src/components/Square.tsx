  import { ReactComponent as XIcon } from "../assets/X.svg";
  import { ReactComponent as OIcon } from "../assets/O.svg";
  import { ICON_SIZE, SQUARE_SIZE } from "../config/sizes";
  import type { SquareValue } from "../types/board";

  type SquareProps = {
    value: SquareValue;
    onClick: () => void;
  };

  export default function Square({ value, onClick }: SquareProps) {
    return (
      <button
        onClick={onClick}
        style={{
          width: SQUARE_SIZE,
          height: SQUARE_SIZE,
        }}
        className="
          bg-gray-800 
          rounded-lg 
          flex items-center justify-center 
          hover:bg-gray-700 
          transition
        "
      >
        {value === "X" && (
          <XIcon
            style={{ width: ICON_SIZE, height: ICON_SIZE }}
            className="text-teal-500"
          />
        )}

        {value === "O" && (
          <OIcon
            style={{ width: ICON_SIZE, height: ICON_SIZE }}
            className="text-yellow-500"
          />
        )}
      </button>
    );
  }

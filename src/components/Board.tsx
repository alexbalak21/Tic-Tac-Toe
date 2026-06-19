import { useState } from "react";
import Square from "./Square";

type SquareValue = "X" | "O" | null;
type BoardState = SquareValue[];

export default function Board() {
  const emptyBoard: BoardState = Array(9).fill(null);
  const [squares, setSquares] = useState<BoardState>(emptyBoard);

  const handleClick = (index: number) => {
    if (squares[index]) return; // prevent overwriting

    const newSquares = [...squares];
    newSquares[index] = "X"; // later you can alternate players
    setSquares(newSquares);
  };

  const resetBoard = () => setSquares(emptyBoard);

  return (
    <div className="space-y-4">
      {/* Board */}
      <div className="grid grid-cols-3 gap-2 mx-auto">
        {squares.map((value: SquareValue, index: number) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetBoard}
        className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-black font-semibold transition"
      >
        Reset
      </button>
    </div>
  );
}

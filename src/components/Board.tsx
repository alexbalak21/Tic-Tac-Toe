import { useState } from "react";
import Square from "./Square";
import type { BoardState, SquareValue } from "../types/board";

export default function Board() {
  const emptyBoard: BoardState = Array(9).fill(null);

  const [squares, setSquares] = useState<BoardState>(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  const handleClick = (index: number) => {
    if (squares[index]) return;

    const newSquares = [...squares];
    newSquares[index] = currentPlayer;
    setSquares(newSquares);

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const resetBoard = () => {
    setSquares(emptyBoard);
    setCurrentPlayer("X");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 mx-auto">
        {squares.map((value: SquareValue, index: number) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      <p className="text-xl font-semibold">
        Current Player: {currentPlayer}
      </p>

      <button
        onClick={resetBoard}
        className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-black font-semibold transition"
      >
        Reset
      </button>
    </div>
  );
}

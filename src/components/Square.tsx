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
      {value}
    </button>
  );
}

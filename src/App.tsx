import Board from "./components/Board";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          Tic Tac Toe Game
        </h1>
        <Board />
      </div>
    </div>
  );
}

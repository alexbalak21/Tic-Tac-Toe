# Tic-Tac-Toe

A simple browser-based Tic-Tac-Toe game where you play against a computer opponent with basic AI strategy.

## Features

- **Player vs Computer**: Play against an AI opponent
- **Random Starting Player**: Game randomly assigns X or O to the player
- **Smart AI**: Computer uses basic strategy including:
  - Prioritizing the center cell
  - Playing corners strategically
  - Detecting and completing 2-point lines
- **Win Detection**: Automatically detects wins across rows, columns, and diagonals
- **Responsive Design**: Clean, centered layout that works in the browser

## How to Play

1. Open `index.html` in your web browser
2. Click the **PLAY** button to start a new game
3. Click on any empty cell to place your symbol (X or O)
4. The computer will automatically respond with its move
5. First to get 3 symbols in a row (horizontal, vertical, or diagonal) wins

## Project Structure

```
Tic-Tac-Toe/
├── index.html    # Main HTML structure
├── script.js     # Game logic and AI
├── style.css     # Styling for the game board
├── favicon.ico   # Website icon
└── image.jpg     # Additional image asset
```

## Technical Details

- **HTML**: Uses a table-based 3x3 grid for the game board
- **CSS**: Simple styling with centered layout and bordered cells
- **JavaScript**: 
  - DOM manipulation for cell interactions
  - Event-driven gameplay
  - AI logic with move prioritization
  - Win checking algorithm for all possible winning combinations

## Running the Game

Simply open `index.html` in any modern web browser. No build process or dependencies required.

## Game Logic

The computer AI follows this strategy:
1. **First move**: Takes the center cell if available
2. **Second move**: If player took center, plays a corner; otherwise takes center
3. **Subsequent moves**: Prioritizes completing lines with 2 points, otherwise plays strategically

Win detection checks:
- All 3 rows
- All 3 columns  
- Both diagonals

## License

This project is open source and available for educational purposes.

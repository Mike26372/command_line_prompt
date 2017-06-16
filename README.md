# Minesweeper
For this interview, you'll be implementing a simple, console based version of the classic Windows game Minesweeper. You’ll have 1 hour 30 minutes. At the end of this time, we would like to see a fully functional game with no bugs.
Game Rules
Take a few minutes to play around with this online implementation:
```
    http://minesweeperonline.com/#beginner
```
### The rules are pretty simple:
 
The game is played on a rectangular grid of tiles. Some of these tiles contain bombs. At the start of the game, the contents of each tile are hidden from the player.
The player select a tiles, one at a time, to reveal what is hidden underneath them:
If the tile reveals a bomb, the game is over and the player loses.
If the tile doesn’t reveal a bomb, but is adjacent to a tile which does hide a bomb, the tile displays the number of adjacent tiles which hides bombs (including diagonals).
If the tile doesn’t reveal a bomb, nor is adjacent to any tiles which do contain bombs, the tile will show nothing.
The player wins when they have revealed all tiles which do not contain bombs.
 
If the player selects a tile which neither contains a bomb, nor is adjacent to any bombs, the player's selection should expand outward until it reveals cells which are adjacent to bombs.
Implementation
You should implement a console version of this game - no need to build a graphical UI. It should implement this game loop:
 
Display the board
Read a row/column from the player via the command line. For example:
```
  prompt> Enter a row: _
  prompt> Enter a column: _
```
Update the state of the game board and exit if the player has lost or won.
If the game ends on this iteration, the board should be printed a final time revealing the locations of all bombs.
Repeat.
 
You can use the following ASCII characters to represent the different states of the board:
 
Character | Meaning
--- | ---
H | A tile which has not yet been revealed.
. | A revealed tile which doesn’t contain a bomb, nor is it adjacent to any tiles containing bombs.
1-8 | A revealed tile which is adjacent to 1-8 bombs.
B | A revealed tile which contains a bomb. This is only used when the game board is printed for the final time, after the player wins or loses.
 
To make the game a bit easier to play, you should print out row and column indices at the top and left of the board, and you should pad each column with a few spaces for readability.
 
For example, given an 8x8 game board with 6 randomly placed bombs:
```
     1  2  3  4  5  6  7  8
  1  .  .  .  .  B  .  .  .
  2  .  .  .  .  .  .  .  .
  3  .  .  B  .  .  .  .  .
  4  .  .  .  .  .  .  .  .
  5  .  B  .  .  B  B  .  .
  6  .  .  .  .  .  .  .  .
  7  B  .  .  .  .  .  .  .
  8  .  .  .  .  .  .  .  .
```
 
This board might be rendered at some point in the game like this:

```
     1  2  3  4  5  6  7  8
  1  H  H  H  1  H  1  .  .
  2  H  1  1  2  1  1  .  .
  3  H  1  H  1  .  .  .  .
  4  1  2  2  2  2  2  1  .
  5  1  H  1  1  H  H  1  .
  6  2  2  1  1  2  2  1  .
  7  H  1  .  .  .  .  .  .
  8  1  .  .  .  .  .  .  .
```
 
Revealing Empty Tiles
If the user selects a tile which does not contain a bomb, nor is it adjacent to any bombs, the game should expand the set of tiles revealed outward until it reaches tiles which are adjacent to bombs.
 
For example, given a 5x5 board with the following bomb placement, and a tile at position [2, 4]:
```
     1  2  3  4  5
  1  .  B  .  .  .
  2  .  B  .  X  .
  3  .  .  .  .  .
  4  .  .  .  .  .
  5  .  .  B  .  .
```
 
If no tiles are currently revealed, and the user selects the tile at position X, the new game state visible to the player should be:
```
     1  2  3  4  5
  1  H  H  2  .  .
  2  H  H  2  .  .
  3  H  H  1  .  .
  4  H  H  1  1  .
  5  H  H  H  1  .
```

Note that the outermost ring of revealed tiles are those that are adjacent to bombs. Don’t stop the auto-expansion one level early and reveal only “.” tiles
Implementation Notes
It should be trivial to change the number of rows and columns in the initial game board, as well as the number of bombs placed at game start (either via a cmd line argument or by changing a constant).
 
We will be evaluating your code for both readability and maintainability. Add minimal documentation around tricky algorithms or interesting design decisions where it would help the reader.
 
Try to keep your code quality bar as high as possible. We do understand that you’re time constrained, so please document any areas of the code which you would clean up or refactor if you had additional time.
 
You can make these assumptions:
 
We will always provide valid input. For example, if the your game asks for a column number, we will never respond with a letter or a number outside of [1, numCols].
We will never set up a game board with 20 or more rows or columns (this makes display a bit easier).
 
Don't spend much time parsing text input. We will not attempt to break the program through invalid input.
 
Your final implementation should include:
Drawing the current state of the board using the ASCII characters described in the table above.
The game loop described above.
The ability to easily change the dimensions of the board and number of bombs (preferably via command line arguments).
The auto-expand feature when a user selects a tile that is not adjacent to any bombs.
Here is a short demo of how the game should work (we show both a win and a loss):
 
Extra Credit
If you find yourself with extra time, the original Minesweeper game has a few additional features:
 
The first selected square would never be a bomb, nor would it be adjacent to one.
You can “flag” tiles that you think may have a bomb to help you keep track; these tiles would not be auto-expanded. If you implement this, feel free to modify the input scheme as you see fit.
Numbers are printed in different (but consistent) colors.
 
You'll have 1 hour 30 minutes to complete this exercise. Good luck!
 
 

'use client'
export const sim = (board) => {
    const n = board.length; // Get the size of the board
    // Function to solve N-Queens problem
function solveNQueens(board) {
    const solutions = [];

    function isSafe(row, col) {
        // Check vertical column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 1) return false;
        }

        // Check upper left diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 1) return false;
        }

        // Check upper right diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 1) return false;
        }

        return true;
    }

    function placeQueen(row) {
        if (row === n) {
            // Make a copy of the board to store the solution
            const solution = board.map(r => r.slice());

            solutions.push(solution);
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 1;
                placeQueen(row + 1);
                board[row][col] = 0; // backtrack
            }
        }
    }

    placeQueen(0);
    return solutions;
}

// --- Run the program ---
// const n = 4; // Change this to the desired board size
const result = solveNQueens(board);

console.log(`Found ${result.length} solution(s) for N = ${n}:`);
// result.forEach((solution, index) => {
//     console.log(`Solution ${index + 1}:`);
//     solution.forEach(row => {
//         console.log(row.map(cell => (cell === 1 ? '1' : '0')).join(' '));
//     });
//     console.log();

// }) 
    return result; // Return the first solution for demonstration

}
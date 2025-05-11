'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
export const SimulatorBoard = ({ sol, size }) => {
  const [board, setBoard] = useState([])
  useEffect(() => {
    setBoard(sol)
  }
    , [sol])



  // Try Solving the N-Queens problem using backtracking and each time a solution is found, update the board state with the new solution and use a delay to show the solution on the board.

  const solveNQueens = (n) => {
    // board is the state
    if (n == board.length) {
      return;
    }
    for (let i = 0; i < n; i++) {
      if (isSafe(board, n, i)) {
        board[n] = 1;
        setBoard([...board]);
        // delay for 1 second
        setTimeout(() => {
          solveNQueens(n + 1);
        }, 1000);

        solveNQueens(n + 1);

        board[n] = 0;
        setBoard([...board]);
        // delay for 1 second
        setTimeout(() => {
          solveNQueens(n + 1);
        }, 1000);

      }
    }
  }

  
  return (
    <>

      {
        board.map((row, rindex) => (
          <div className="flex flex-1" key={rindex}>
            {row.map((value, cindex) => (
              <div
                key={cindex}
                className={`flex-1 flex items-center justify-center ${(rindex + cindex) % 2 === 0 ? "black" : "white"
                  }`}
                style={{
                  width: `${400 / size}px`,
                  height: `${400 / size}px`,
                }}
              >
                {value === 1 && (
                  <img
                    src="/queen.webp"
                    alt="Queen"
                    className="queen w-3/4 h-3/4"
                  />
                )}
              </div>
            ))}
          </div>
        ))
      }

    </>


  )
}




/*
    board.map((row, rindex)
              <div className="flex flex-1" key={rindex}>
              {row.map((value, cindex) => (
                  <div
                  key={cindex}
                  className={`flex-1 flex items-center justify-center ${
                      (rindex + cindex) % 2 === 0 ? "black" : "white"
                    }`}
                    style={{
                        width: `${275 / size}px`,
                        height: `${275 / size}px`,
                    }}
                    >
                  {value === 1 && (
                      <img
                      src="/queen.webp"
                      alt="Queen"
                      className="queen w-3/4 h-3/4"
                      />
                    )}
                </div>
              ))}
            </div>
          ))}
*/
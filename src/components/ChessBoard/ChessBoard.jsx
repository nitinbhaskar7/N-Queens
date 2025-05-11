'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
export const ChessBoard = ({ sol, size }) => {
  const [board, setBoard] = useState([])
  useEffect(() => {
    setBoard(sol)
  }
    , [sol])
  return (
    <>

        {
             board.map((row, rindex) => (
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
            ))
            }
        
            </>

  
  )
}

export default ChessBoard



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
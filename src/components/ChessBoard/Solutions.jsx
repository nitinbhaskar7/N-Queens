'use client'
import React, { useState, useEffect } from "react";
import "./Chessboard.css";
import { main } from "@/helper/main";
import ChessBoard from "./ChessBoard";

export default function Solutions({
  size = 4, // Default board size
  done, // Number of completed solutions
}) {
  const [chessboard, setChessboard] = useState([]);

  useEffect(() => {
    const result = main(size);
    setChessboard(result);
  }, [size]);

  return (
    <div className="grid grid-cols-2 gap-4 justify-items-center">
      {chessboard.map((sol, solIndex) => (
        <div
          key={solIndex}
          className={`relative w-[275px] h-[275px] flex flex-col border border-gray-300 ${solIndex <= done ? "block" : "hidden"}`}
        >
          <ChessBoard sol={sol} size={size}/>
        </div>
      ))}
    </div>
  );
}
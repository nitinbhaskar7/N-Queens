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
      <div className="col-span-2 text-center mb-4">
        <h2 className="text-2xl font-bold">Solutions for {size}x{size} Board</h2>
        <p className="text-gray-600">Showing {done + 1} of {chessboard.length} solutions</p>
      </div>
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
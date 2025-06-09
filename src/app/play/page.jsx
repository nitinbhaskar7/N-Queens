'use client'
import React, { useEffect, useRef, useState } from 'react';
import '@/components/ChessBoard/ChessBoard.css'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const Page = () => {
    const [size, setsize] = useState(4); // Default board size
    const [board, setBoard] = useState([]); // Board state
    const [showTick, setShowTick] = useState(false);
    const isSafe = (row, col) => {
        // Check if placing a queen at (row, col) is safe
        // Check the column
        for (let i = 0; i < size; i++) {
            if (board[i][col] === 1) {
                return false; // Column check
            }
        }
        // Check the left diagonal
        for (let i = 0; i < size; i++) {
            const leftDiagonalRow = row - (col - i);
            if (leftDiagonalRow >= 0 && leftDiagonalRow < size && board[leftDiagonalRow][i] === 1) {
                return false; // Left diagonal check
            }
        }
        // Check the right diagonal
        for (let i = 0; i < size; i++) {
            const rightDiagonalRow = row + (col - i);
            if (rightDiagonalRow >= 0 && rightDiagonalRow < size && board[rightDiagonalRow][i] === 1) {
                return false; // Right diagonal check
            }
        }
        // Check the row
        for (let i = 0; i < size; i++) {
            if (board[row][i] === 1) {
                return false; // Row check
            }
        }

        
       
        return true;
    }
    const isComplete = (newboard) => {
        // Check if all queens are placed
        for (let i = 0; i < size; i++) {
            let count = 0;
            for (let j = 0; j < size; j++) {
                if (newboard[i][j] === 1) {
                    count++;
                }
            }
            if (count !== 1) {
                return false; // Each row must have exactly one queen
            }
        }
    
        return true;
    }





    useEffect(() => {
        setBoard(Array.from({ length: size }, () => Array(size).fill(0))); // Initialize the board with zeros
    }, [size]);

    useEffect(() => {
        console.log("Board state updated:", board); // Log the board state whenever it changes
    }, [board]);

    const handleInputChange = (e) => {
        setsize(e); // Update the size state with the selected value
    };

    const handleCellClick = (rindex, cindex, value) => {
        if (value === 0 && isSafe(rindex, cindex)) {
            const newBoard = board.map(row => [...row]);
            newBoard[rindex][cindex] = 1; // Place a queen
            setBoard(newBoard);
            setTimeout(() => {
                if (isComplete(newBoard)) {
                    setShowTick(true);
                    console.log("All queens placed successfully!");
                    setTimeout(() => {
                        setShowTick(false);
                        setBoard(Array.from({ length: size }, () => Array(size).fill(0)));
                    }, 1200);
                }
            }, 0);
        } else if (value === 1) {
            const newBoard = board.map(row => [...row]);
            newBoard[rindex][cindex] = 0; // Remove the queen
            setBoard(newBoard);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="mb-4">
                    <label htmlFor="board-size" className="block text-lg font-medium mb-2">
                        Enter Board Size:
                    </label>
                    <div className="controls flex items-center justify-between gap-4">
                        <Select onValueChange={handleInputChange} defaultValue={4}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Board Size" />
                            </SelectTrigger>
                            <SelectContent>
                                {[4,5,6,7,8,9,10].map(n => (
                                    <SelectItem key={n} value={n}>{n}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="relative w-[400px] flex flex-col border border-gray-700 bg-zinc-900">
                    {showTick && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-green-400 bg-opacity-40 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                    {board.map((row, rindex) => (
                        <div className="flex flex-1" key={rindex}>
                            {row.map((value, cindex) => (
                                <div
                                    key={cindex}
                                    className={`flex-1 cursor-pointer flex items-center justify-center ${(rindex + cindex) % 2 === 0 ? "black" : "white"}`}
                                    style={{
                                        width: `${400 / size}px`,
                                        height: `${400 / size}px`,
                                    }}
                                    onClick={() => handleCellClick(rindex, cindex, value)}
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
                </div>
            </div>
        </div>
    );
};

export default Page;



/*
 1 0 0 0 
 0 0 0 0
 0 0 0 0
 0 0 0 0 



*/
'use client'
import React, { useEffect, useRef, useState } from 'react';
import Chessboard from '@/components/ChessBoard/Solutions';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SimulatorBoard } from '@/components/Simulator/SimulatorBoard';
const Page = () => {
    const [size, setsize] = useState(4); // Default board size
    const [simState, setSimState] = useState(false); // Simulation state
    const [board, setBoard] = useState([]); // Board state
    const [sol, setSol] = useState(-1); // Solution state
    const pause = useRef(false)
    const [pauseState, setPauseState] = useState(false) // Pause state
    const delay = () => new Promise((resolve) => setTimeout(resolve, 800)); // Delay function
    const isSafe = (board, row, col) => {
        // Check if it's safe to place a queen at board[row][col]
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 1) return false; // Check column
            if (col - (row - i) >= 0 && board[i][col - (row - i)] === 1) return false; // Check left diagonal
            if (col + (row - i) < size && board[i][col + (row - i)] === 1) return false; // Check right diagonal
        }
        return true;
    }
    const handleStart = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setBoard(Array.from({ length: size }, () => Array(size).fill(0))); // Initialize the board with zeros
        setSol(-1); // Reset the solution count
        setSimState(true);
        console.log("Starting simulation..."); // Log when the simulation starts
        console.log(simState)
        // Set simulation state to true
        await solveNQueens(0); // Start solving N-Queens from row 0
        setSimState(false); // Set simulation state to false after completion
    }
    const solveNQueens = async (n) => {
        if (n === size) {
            setSol((prev) => {
                return prev + 1; // Increment the solution count
            })
            return true;
        }

        for (let i = 0; i < size; i++) {
            while (pause.current) {
                await delay()
            }
            if (isSafe(board, n, i)) { // Check if it's safe to place a queen
                board[n][i] = 1; // Place a queen
                setBoard([...board]); // Update the board state
              
                await delay(); // Wait for the delay
                if (await solveNQueens(n + 1)) {
                    await delay()
                    await delay()
                }
               

                board[n][i] = 0; // Backtrack
                setBoard([...board]); // Update the board state
                await delay(); // Wait for the delay
            }
        }
    }

    useEffect(() => {
        setBoard(Array.from({ length: size }, () => Array(size).fill(0))); // Initialize the board with zeros
        setSol(-1); // Reset the solution count
    }, [size]);

    useEffect(() => {
        console.log("Board state updated:", board); // Log the board state whenever it changes
    }, [board]);

    const handleInputChange = (e) => {
        setsize(e); // Update the size state with the selected value
    };
    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col items-center justify-start p-4">
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
                                <SelectItem value={4}>4</SelectItem>
                                <SelectItem value={5}>5</SelectItem>
                                <SelectItem value={6}>6</SelectItem>
                                <SelectItem value={7}>7</SelectItem>
                                <SelectItem value={8}>8</SelectItem>
                                <SelectItem value={9}>9</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button onClick={(e) => { handleStart(e) }} variant={"default"} disabled={simState}>
                            Start
                        </Button>
                        <Button variant={"default"} onClick={() => {
                            pause.current = !pause.current
                            setPauseState(!pauseState)
                        }} disabled={!simState}>
                            {pauseState ? "Resume" : "Pause"}
                        </Button>
                    </div>
                </div>
                <div
                    className="w-[400px] h-[400px] flex flex-col border border-gray-300"
                >
                    <SimulatorBoard sol={board} size={size} />
                </div>
            </div>

            {/* Right Half */}
            <div className="flex-1 flex flex-col gap-2 pt-4 overflow-y-auto">
                <div>
                    <Chessboard size={size} done={sol} />
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
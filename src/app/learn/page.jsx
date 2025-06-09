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
import { Slider } from '@/components/ui/slider';
const Page = () => {
    const [size, setsize] = useState(4); // Default board size
    const [simState, setSimState] = useState(false); // Simulation state
    const [board, setBoard] = useState([]); // Board state
    const [sol, setSol] = useState(-1); // Solution state
    const pause = useRef(false)
    const [pauseState, setPauseState] = useState(false) // Pause state
    const [speed, setSpeed] = useState(1000); // Speed of simulation in milliseconds
    const [messages, setmessages] = useState([]); // Messages state for logging
    const delay = () => new Promise((resolve) => setTimeout(resolve, 2000 - speed)); // Delay function
    const isSafe = (board, row, col) => {
        // Check if it's safe to place a queen at board[row][col]
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 1) {
                setmessages((prev) => [...prev, `Cannot insert at (${row}, ${col}) as Queen attacks from (${i}, ${col})`]); // Log conflict
                return false; // Check column
            }
            if (col - (row - i) >= 0 && board[i][col - (row - i)] === 1) {
                setmessages((prev) => [...prev, `Cannot insert at (${row}, ${col}) as Queen attacks from (${i}, ${col - (row - i)}) `]); // Log conflict    
                return false; // Check left diagonal
            }
            if (col + (row - i) < size && board[i][col + (row - i)] === 1) {
                setmessages((prev) => [...prev, `Cannot insert at (${row}, ${col}) as Queen attacks from (${i}, ${col + (row - i)}) `]); // Log conflict
                return false; // Check right diagonal
            }


        }
        return true;
    }
    const handleStart = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setmessages([]); // Clear previous messages
        setBoard(Array.from({ length: size }, () => Array(size).fill(0))); // Initialize the board with zeros
        setSol(-1); // Reset the solution count
        console.log("Starting simulation..."); // Log when the simulation starts
        console.log(simState)
        // Set simulation state to true
        await solveNQueens(0); // Start solving N-Queens from row 0
    }



    const solveNQueens = async (n) => {
        if (n === size) {
            setSol((prev) => {
                return prev + 1; // Increment the solution count
            })
            setmessages((prev) => [...prev, `Solution found!`]); // Log the solution found
            return true;
        }

        for (let i = 0; i < size; i++) {
            while (pause.current) {
                await delay()
            }
            await delay(); // Wait for the specified delay before each placement
            if (isSafe(board, n, i)) { // Check if it's safe to place a queen
                board[n][i] = 1; // Place a queen
                setmessages((prev) => [...prev, `Placing queen at (${n}, ${i})`]); // Log the placement
                setBoard([...board]); // Update the board state

                // await delay(); // Wait for the delay
                await solveNQueens(n + 1); // Recursively solve for the next row

                board[n][i] = 0; // Backtrack
                setmessages((prev) => [...prev, `Removing queen from (${n}, ${i})`]); // Log the removal
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

    // Ref for autoscroll
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

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
                                <SelectItem value={1}>1</SelectItem>
                                <SelectItem value={2}>2</SelectItem>
                                <SelectItem value={3}>3</SelectItem>
                                <SelectItem value={4}>4</SelectItem>
                                <SelectItem value={5}>5</SelectItem>
                                <SelectItem value={6}>6</SelectItem>
                                <SelectItem value={7}>7</SelectItem>
                                <SelectItem value={8}>8</SelectItem>
                                <SelectItem value={9}>9</SelectItem>
                                <SelectItem value={10}>10</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button onClick={async (e) => { setSimState(true); await handleStart(e); setSimState(false) }} variant={"default"} disabled={simState}>
                            Start
                        </Button>
                        <Button variant={"default"} onClick={() => {
                            pause.current = !pause.current
                            setPauseState(!pauseState)
                        }} disabled={!simState}>
                            {pauseState ? "Resume" : "Pause"}
                        </Button>
                        {/* <Button variant={"default"} onClick={() => {
                            setSimState(false);
                        }} disabled={!simState}>
                            Stop
                        </Button> */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">
                                Simulation Speed
                            </label>

                            <Slider
                                min={50}
                                max={2000}
                                step={50}
                                value={[speed]}
                                onValueChange={([val]) => setSpeed(val)}
                                disabled={simState}
                            />
                        </div>

                    </div>
                </div>
                <div
                    className="w-[400px] flex flex-col border border-gray-700 bg-zinc-900"
                >
                    <SimulatorBoard sol={board} size={size} />
                    {messages.length > 0 && (
                        <div className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-800 shadow-sm p-2 space-y-1">
                            <div className="text-xs text-zinc-400 font-semibold px-2 pb-1 border-b border-zinc-700 mb-1">
                                Simulation Log
                            </div>
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`
                        text-sm px-3 py-1 rounded-md flex items-center gap-2
                        ${msg.startsWith("Placing") ? "bg-green-900 text-green-300 border border-green-800" : ""}
                        ${msg.startsWith("Removing") ? "bg-yellow-900 text-yellow-300 border border-yellow-800" : ""}
                        ${(msg.startsWith("C") || msg.startsWith("R")) ? "bg-red-900 text-red-300 border border-red-800" : ""}
                    `}
                                >
                                    {msg.startsWith("Placing") && (
                                        <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
                                    )}
                                    {msg.startsWith("Removing") && (
                                        <span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />
                                    )}
                                    {(msg.startsWith("C") || msg.startsWith("R")) && (
                                        <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
                                    )}
                                    {msg}
                                </div>
                            ))}
                            {/* Autoscroll anchor */}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
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
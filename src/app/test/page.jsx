import React, { useState, useRef } from "react";

const NQueensVisualizer = () => {
  const [size, setSize] = useState(8);
  const [board, setBoard] = useState([]);
  const [running, setRunning] = useState(false);
  const [delay, setDelay] = useState(300);

  const stopRequested = useRef(false); // stays intact across renders

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const isSafe = (board, row, col) => {
    for (let i = 0; i < row; i++) {
      if (
        board[i] === col ||
        board[i] - i === col - row ||
        board[i] + i === col + row
      ) {
        return false;
      }
    }
    return true;
  };

  const solveVisual = async (n) => {
    setRunning(true);
    stopRequested.current = false;
    const tempBoard = new Array(n).fill(-1);

    const backtrack = async (row) => {
      if (stopRequested.current) return false;
      if (row === n) {
        setRunning(false);
        return true;
      }

      for (let col = 0; col < n; col++) {
        if (stopRequested.current) return false;

        if (isSafe(tempBoard, row, col)) {
          tempBoard[row] = col;
          setBoard([...tempBoard]);
          await sleep(delay);

          const success = await backtrack(row + 1);
          if (success) return true;

          tempBoard[row] = -1;
          setBoard([...tempBoard]);
          await sleep(delay);
        }
      }
      return false;
    };

    await backtrack(0);
    setRunning(false);
  };

  const handleStart = () => {
    if (!running) {
      setBoard(new Array(size).fill(-1));
      solveVisual(size);
    }
  };

  const handleStop = () => {
    stopRequested.current = true;
    setRunning(false);
  };

  const renderBoard = () => (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 40px)`,
        marginTop: "20px",
      }}
    >
      {[...Array(size)].map((_, row) =>
        [...Array(size)].map((_, col) => {
          const isQueen = board[row] === col;
          const isBlack = (row + col) % 2 === 1;
          return (
            <div
              key={`${row}-${col}`}
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: isBlack ? "#769656" : "#eeeed2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                transition: "all 0.2s",
              }}
            >
              {isQueen ? "♛" : ""}
            </div>
          );
        })
      )}
    </div>
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>N-Queens Visualizer</h2>

      <label>
        Board Size (N):&nbsp;
        <input
          type="number"
          value={size}
          min="4"
          max="20"
          onChange={(e) => setSize(Number(e.target.value))}
          disabled={running}
        />
      </label>

      <label style={{ marginLeft: "15px" }}>
        Delay (ms):&nbsp;
        <input
          type="number"
          value={delay}
          min="50"
          max="2000"
          onChange={(e) => setDelay(Number(e.target.value))}
          disabled={running}
        />
      </label>

      <button
        onClick={handleStart}
        disabled={running}
        style={{ marginLeft: "10px" }}
      >
        ▶️ Start
      </button>

      <button
        onClick={handleStop}
        disabled={!running}
        style={{ marginLeft: "5px" }}
      >
        ⏹ Stop
      </button>

      {renderBoard()}
    </div>
  );
};

export default NQueensVisualizer;

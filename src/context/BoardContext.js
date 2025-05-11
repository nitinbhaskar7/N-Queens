import { createContext , useContext } from "react";

const BoardContext = createContext();

export const BoardProvider = BoardContext.Provider

export const useBoard = () =>{
    return useContext(BoardContext)
}
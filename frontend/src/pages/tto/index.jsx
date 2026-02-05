import Square from "../../components/tto/Square";
import { useState } from 'react';
import Winner from '../../helpers/tictactoeWinner'

export default function Tto()
{
    const [Squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setxIsNext] = useState(true);
    function handleClick(i)
    {
        if(Squares[i] || Winner(Squares))
            return ;
        const newSquare = Squares.slice();
        newSquare[i] = (xIsNext) ? "X" : "0";   
        setSquares(newSquare);
        setxIsNext(!xIsNext);
        const Win = Winner(newSquare);
        if(Win)
        {
            console.log(Win);
            return;
        }
    }

    return (
        <>
            <div>
                <Square handleClick={() => {handleClick(0)}} value={Squares[0]}></Square>
                <Square handleClick={() => {handleClick(1)}} value={Squares[1]}></Square>
                <Square handleClick={() => {handleClick(2)}} value={Squares[2]}></Square>
            </div>
            <div>
                <Square handleClick={() => {handleClick(3)}} value={Squares[3]}></Square>
                <Square handleClick={() => {handleClick(4)}} value={Squares[4]}></Square>
                <Square handleClick={() => {handleClick(5)}} value={Squares[5]}></Square>
            </div>
            <div>
                <Square handleClick={() => {handleClick(6)}} value={Squares[6]}></Square>
                <Square handleClick={() => {handleClick(7)}} value={Squares[7]}></Square>
                <Square handleClick={() => {handleClick(8)}} value={Squares[8]}></Square>
            </div>
        </>
    );
}
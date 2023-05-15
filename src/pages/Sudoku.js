import { useState } from 'react';
import { useEffect } from 'react';
import { BoardRepresentation, generateFilledSudokuBoard, generatePlayableMoves, isValidMove, isComplete, placeMove } from '../models/SudokuModel.js';
import './css/sudoku.css'
const Sudoku = ({ setLogin, username, password }) => {
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    const EXTRA = 4;
    const SECONDS = 60;

    //States within the game

    const [history, setHistory] = useState([]);

    const [difficulty, setDifficulty] = useState(EASY);

    const [board, setBoard] = useState(generateFilledSudokuBoard());

    const [boardMoves, setBoardMoves] = useState(generatePlayableMoves(difficulty));

    const [selectedValue, setSelectedValue] = useState();

    const [paused, setPaused] = useState(false);

    const [time, setTime] = useState(0);

    const [mistakes, setMistakes] = useState(0)

    // end states
    const setBoardValue = (value) => {
        setSelectedValue(value);
    }

    const numericKeyHandler = (e) => {
        if (/\d/.test(e.key)) setBoardValue(Number.parseInt(e.key));
    }

    const logout = () => {
        document.removeEventListener("keydown", numericKeyHandler);
        setLogin(false);
    }

    const placementHandler = (i, j, k, n) => {
        if (selectedValue && !paused) {
            if (isValidMove(board, boardMoves, [i, j, k, n], selectedValue)) {
                const { newBoard, newMoves } = placeMove(board, boardMoves, [i, j, k, n], selectedValue);
                setBoardMoves(newMoves);
                setBoard(newBoard);
            }
            else setMistakes(mistakes + 1)
        }
    }

    const newGameHandler = () => {
        const newBoard = generateFilledSudokuBoard();
        const newBoardMoves = generatePlayableMoves(difficulty);
        setBoard(newBoard)
        setBoardMoves(newBoardMoves);
        setTime(0);
        setMistakes(0);
    }

    const pauseGameHandler = () => {
        setPaused(!paused);
    }

    const updateDifficulty = (newDiff) => {
        setDifficulty(newDiff);
    }

    // updates
    useEffect(() => { // load the user playing history when the game starts and adds [1-9] key down event handler
        document.addEventListener("keydown", numericKeyHandler);
        // TODO get data from backend server and then update history.
    }, []);

    useEffect(() => {
        let interval = null;
        if (!paused) {
            interval = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        } else if (paused && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [paused, time]);

    return (
        <>
            <header>
                TODO add a banner to the Sudoku game
            </header>
            <nav>
                <input type="button" value="Logout" onClick={logout} />
            </nav>

            <section id="game" >
                <div id="modeSelection">

                    <label htmlFor='easy'>Easy</label>
                    <input name="mode" id="easy" type='radio' value={EASY} checked={difficulty == EASY} onChange={() => { updateDifficulty(EASY) }} />

                    <label htmlFor='medium'>Medium</label>
                    <input name="mode" id="medium" type='radio' value={MEDIUM} checked={difficulty == MEDIUM} onChange={() => { updateDifficulty(MEDIUM) }} />

                    <label htmlFor='hard'>Hard</label>
                    <input name="mode" id="hard" type='radio' value={HARD} checked={difficulty == HARD} onChange={() => { updateDifficulty(HARD) }} />

                    <label htmlFor='extra'>Extra</label>
                    <input name="mode" id="extra" type='radio' value={EXTRA} checked={difficulty == EXTRA} onChange={() => { updateDifficulty(EXTRA) }} />

                    <input type='button' onClick={newGameHandler} value="New Game" />
                    <input type='button' onClick={pauseGameHandler} value={paused ? "Resume" : "Pause"} />
                </div>

                <div id="gameArea">
                    <span id="gameInfo">
                        <label>
                            Time: {Math.floor(time / SECONDS)} :{time % SECONDS}
                        </label>
                        <label>
                            Mistakes #: {mistakes}
                        </label>
                    </span>
                    <div id="game">
                        <BoardRepresentation board={board} removed={boardMoves} onClick={placementHandler} />
                    </div>
                    <span className='btrDisplay'>
                        <button className='setValueBtr' value={1} onClick={() => { setBoardValue(1) }}>1</button>
                        <button className='setValueBtr' value={2} onClick={() => { setBoardValue(2) }}>2</button>
                        <button className='setValueBtr' value={3} onClick={() => { setBoardValue(3) }}>3</button>
                        <button className='setValueBtr' value={4} onClick={() => { setBoardValue(4) }}>4</button>
                        <button className='setValueBtr' value={5} onClick={() => { setBoardValue(5) }}>5</button>
                        <button className='setValueBtr' value={6} onClick={() => { setBoardValue(6) }}>6</button>
                        <button className='setValueBtr' value={7} onClick={() => { setBoardValue(7) }}>7</button>
                        <button className='setValueBtr' value={8} onClick={() => { setBoardValue(8) }}>8</button>
                        <button className='setValueBtr' value={9} onClick={() => { setBoardValue(9) }}>9</button>
                    </span>
                </div>
            </section>

            <aside id="history">
                TODO add game history
            </aside>
        </>
    )
};
export default Sudoku;
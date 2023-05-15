/*
    Args: 4D Array board, number outerRow >= 0 < 4, outerCol, innerRow, innerCol follow same restrictions as outerRow
            number valToPlace
    return: boolean true if the placement of valToPlace within board produces a valid sudoku
                else false
*/
function validatePlacement(board, outerRow, outerCol, innerRow, innerCol, valToPlace) {
    return checkRow(board, outerRow, innerRow, valToPlace) &&
        checkColumn(board, outerCol, innerCol, valToPlace) &&
        checkInnerSquare(board, outerRow, outerCol, valToPlace);
}

/*
    args: 4D Array board, Number outerRow >= 0 && < 4, Number outerCol >= 0 && < 4, Number valToPlace
    return: Boolean True if the selected 3x3 square by outerRow, outerCol doesn't contain valToPlace
                else false
*/
function checkInnerSquare(board, outerRow, outerCol, valToPlace) {
    if (board.at(outerRow).at(outerCol))
        for (let innerRow = 0; innerRow < board.length; innerRow++)
            if (board.at(outerRow).at(outerCol).at(innerRow))
                for (let innerCol = 0; innerCol < board.length; innerCol++)
                    if (board.at(outerRow).at(outerCol).at(innerRow).at(innerCol) == valToPlace) return false;
    return true;
}


/*
    args: 4D Array board, Number outerRow >= 0 && < 4, Number innerRow >= 0 & < 4, Number valToPlace
    return: Boolean True if the selected row in board doesn't contain valToPlace
            else false
*/
function checkRow(board, outerRow, innerRow, valToPlace) {
    for (let outerCol = 0; outerCol < board.length; outerCol++)
        if (board.at(outerRow))
            for (let innerCol = 0; innerCol < board.length; innerCol++)
                if (board.at(outerRow).at(outerCol) && board.at(outerRow).at(outerCol).at(innerRow))
                    if (board.at(outerRow).at(outerCol).at(innerRow).at(innerCol) == valToPlace) return false;
    return true;
}

/*
    args: 4D Array board, Number outerCol >= 0 && < 4, Number innerCol >= 0 && < 4, Number valToPlace
    return: Boolean true if the elected column in board doesn't contain valToPlace
            else false
*/
function checkColumn(board, outerCol, innerCol, valToPlace) {
    for (let outerRow = 0; outerRow < board.length; outerRow++) // for each row of 3D arrays
        if (board.at(outerRow)) // row is defined
            for (let innerRow = 0; innerRow < board.length; innerRow++) // for each 1D row in 2D mini grids
                if (board.at(outerRow).at(outerCol) && board.at(outerRow).at(outerCol).at(innerRow)) // if 2D mini grid exists and row exists in mini grid
                    if (board.at(outerRow).at(outerCol).at(innerRow).at(innerCol) == valToPlace) return false // return false if the location has valToPlace existing
    return true;
}

/*
    args: Number difficulty >= 1 && < 4
    return: Set moves with strings as keys where each string is a index into a 4D array
            meant to be a move for the player.
*/
const generatePlayableMoves = (difficulty) => {

    let difficultyVal; // value used to calculate the number of moves to remove 
    const removed = new Set(); // set of moves to return

    if (difficulty == 1) {
        difficultyVal = 30; // 15 <= numToRemove < 30
    }
    else if (difficulty == 2) {
        difficultyVal = 40; // 20 <= numToRemove < 46
    }
    else if (difficulty == 3) {
        difficultyVal = 50; // 25 <= numToRemove < 62
    }
    else if (difficulty == 4) {
        difficultyVal = 60; //  35 <= numToRemove < 78
    }

    let numToRemove = (Math.floor(Math.random() * (difficultyVal - (difficultyVal / difficulty + 1)) + difficultyVal / 2));

    while (numToRemove > 0) { // while we still have moves to remove

        //generate a move where each index is >= 0 && < 3
        const outerRow = Math.floor(Math.random() * (3));
        const outerCol = Math.floor(Math.random() * (3));
        const innerRow = Math.floor(Math.random() * (3));
        const innerCol = Math.floor(Math.random() * (3));

        //new potential move
        const move = "A,B,C,D".replace('A', outerRow).replace('B', outerCol).replace('C', innerRow).replace('D', innerCol);

        if (!removed.has(move)) { // if we haven't generated this location yet
            removed.add(move); // add it to the generated set
            numToRemove--;
        }
    }

    return removed;
}

/*
    args: None
    return: 4D Array representing a valid Sudoku board. Each index is from 0 -> 2, and each value is from 1 -> 9
*/
function generateFilledSudokuBoard() {
    const RAND_MULT = 9; // multiplier for random for 1 and 9 to be inclusive
    const NUM_ENTIRES = 3; // size of each array in the board
    const MAX_ATTEMPTS = 20; // maximum number of attempts to fill a row, column, mini grid in a 4D array
    const board = new Array(NUM_ENTIRES); // 4D array representation of the board

    // for each row in the 4D array
    for (let outerRow = 0; outerRow < board.length; outerRow++) {

        board[outerRow] = new Array(NUM_ENTIRES); // create a new array
        let rowAttempts = 0; // reset the attempts to generate the row 

        // for each column in the 4D array
        for (let outerCol = 0; outerCol < board.at(outerRow).length; outerCol++) {
            board[outerRow][outerCol] = new Array(NUM_ENTIRES); // create new 2D array
            let miniGridAttempts = 0; // reset number of attempts to generate a valid sudoku mini grid

            if (rowAttempts == MAX_ATTEMPTS) { // if we reach MAX_ATTEMPTS then there's most likely no solution
                outerRow--;
                break;
            }

            for (let innerRow = 0; innerRow < board.at(outerRow).at(outerCol).length; innerRow++) {
                board[outerRow][outerCol][innerRow] = new Array(NUM_ENTIRES); // 1D row in mini grid

                if (miniGridAttempts == MAX_ATTEMPTS) {
                    if (outerCol == 0) { // Previously generated row doesn't have a solution.
                        outerRow--;
                        outerCol = board.length - 2;
                    }
                    else outerCol -= 1;

                    rowAttempts++;
                    break;
                }
                for (let innerCol = 0; innerCol < board.at(outerRow).at(outerCol).at(innerRow).length && miniGridAttempts < MAX_ATTEMPTS; innerCol++) {
                    let done = false;
                    const attemptedValues = new Array();
                    let numAttempts = 0;
                    while (!done) {
                        let valToPlace = Math.floor(Math.random() * RAND_MULT) + 1;
                        if (attemptedValues.at(valToPlace) != valToPlace && validatePlacement(board, outerRow, outerCol, innerRow, innerCol, valToPlace)) {
                            board[outerRow][outerCol][innerRow][innerCol] = valToPlace;
                            done = true;
                        }
                        else if (numAttempts == attemptedValues.length - 1) {
                            innerRow = 0;
                            innerCol = -1;
                            miniGridAttempts++;
                            break;
                        }
                        else if (attemptedValues.at(valToPlace) != valToPlace) {
                            attemptedValues[valToPlace] = valToPlace;
                            numAttempts++;
                        }
                    }
                }
            }
        }
    }
    return board;
}

/*
    args: Set moves containing strings in the from 'A,B,C,D' where A,B,C,D are each Numbers >= 0 && < 3
            Array loc with length == 4 with Number, where each Number >= 0 && < 3
    return: True if moves contains the string representation of loc
*/
const containsMove = (moves, loc) => {
    return moves.has("A,B,C,D".replace('A', loc[0]).replace('B', loc[1]).replace('C', loc[2]).replace('D', loc[3]));
}

/*
    args: 4D Array board, Set boardMoves, Array loc, Number selectedValue
    return:
*/
const isValidMove = (board, boardMoves, loc, selectedValue) => {
    return containsMove(boardMoves, loc) && // check to see if the move is contained
        board.at(loc[0]).at(loc[1]).at(loc[2]).at(loc[3]) == selectedValue; // check to see if the selectedValue is valid
}

/*
    args: Set moves
    return: True if there are no move sudoku moves to be made
                else false
*/
const isComplete = (moves) => {
    return moves.size() == 0;
}

/*
    args: 4D Array board representation of a Sudoku board, 
            Set removed is a set of removed strings representing removed indexes in board,
            Function OnClick with parameters (i,j,k,n) where each parameter is a Number index into board
    return: JSX representation of board using a table, with tables as entries in each row
                all indices contained in removed  removed are not displayed and onClick is called for each.
                Each Number value contained in the board that is not in removed is wrapped in a label tag.
*/
const BoardRepresentation = ({ board, removed, onClick, highlightedValue}) => {
    return (
        <table>
            <tbody>
                {
                    board.map((outerRow, outerRowI) => {
                        return (
                            <tr key={outerRowI}>
                                {
                                    outerRow.map((outerCol, outerColI) => {
                                        return (
                                            <td key={outerColI}>
                                                <table className="miniGrid">
                                                    <tbody>
                                                        {
                                                            outerCol.map((innerRow, innerRowI) => {
                                                                return (
                                                                    <tr key={innerRowI}>
                                                                        {
                                                                            innerRow.map((innerCol, innerColI) => {
                                                                                return containsMove(removed, [outerRowI, outerColI, innerRowI, innerColI]) ?
                                                                                    (<td className="gridVal playAbleGrid" key={innerColI} onClick={() => onClick(outerRowI, outerColI, innerRowI, innerColI)}><label>{" "}</label></td>) :
                                                                                    (<td className={`gridVal ${innerCol == highlightedValue ? `highlighted` : ``}` } key={innerColI}><label>{innerCol}</label></td>)

                                                                            })
                                                                        }
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>

                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

/*
    args: 4D array board representation of a sudoku board, 
        Set boardMoves removed moves from board, 
        Array selectedLoc with length 4 selected location within the sudoku grid to replace, 
        Number selectedValue selected value to use as a replacement in board
    return: new Object {
        newBoard hard copy of board with value at selectedLoc replaced with selectedValue
        newMoves hard copy of boardMoves with selectedLoc removed
    }
*/
const placeMove = (board, boardMoves, selectedLoc, selectedValue) => {
    const newBoard = JSON.parse(JSON.stringify(board)); // create hard copy
    newBoard[selectedLoc[0]][selectedLoc[1]][selectedLoc[2]][selectedLoc[3]] = selectedValue; // set the value in the new board
    const newMoves = new Set(JSON.parse(JSON.stringify([...boardMoves.values()]))); // create a hard copy of the moves
    newMoves.delete('A,B,C,D'.replace('A', selectedLoc[0]).replace('B', selectedLoc[1]).replace('C', selectedLoc[2]).replace('D', selectedLoc[3])); // remove the selected location
    return { newBoard, newMoves };
}

export { BoardRepresentation, generateFilledSudokuBoard, generatePlayableMoves, isValidMove, isComplete, placeMove };
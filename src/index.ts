console.log('Begin game of life');
let boardSize = 5;
let numOfGenerations = 10;
let initialValue = "bee-hive"; // "block", "bee-hive", "loaf"
let board = initBoard(initialValue);
printBoard(board);

for (let i = 1; i <= numOfGenerations; i++) {
    console.log(`Generation ${i}`);
    board = nextGeneration(board);
    printBoard(board);
}

// init a board of size boardSize x boardSize
function initBoard(boardSize: string) {
    let board = [[]];
    // let board = new Array(boardSize);
    // for (let i = 0; i < boardSize; i++) {
    //     board[i] = new Array(boardSize);
    //     for (let j = 0; j < boardSize; j++) {
    //         // random between 0 and 1
    //         board[i][j] = Math.floor(Math.random() * 2);
    //     }
    // }
    if (boardSize === "block") {
        return [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ]
    }
    else if (boardSize === "bee-hive") {
        return [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ]
    }
    else if (boardSize == "loaf"){
        return [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ]
    }
    else {
        // let board = new Array(boardSize);
    // for (let i = 0; i < boardSize; i++) {
    //     board[i] = new Array(boardSize);
    //     for (let j = 0; j < boardSize; j++) {
    //         // random between 0 and 1
    //         board[i][j] = Math.floor(Math.random() * 2);
    //     }
    // }
    }
    return board;
}

function printBoard(board: Array<Array<number>>) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            process.stdout.write("  " + `${board[i][j] == 1? '*' : ' '}`);
        }
        console.log();
    }  
}

function nextGeneration(board: Array<Array<number>>) {
    for (let row = 0; row < board.length - 1; row++) {
        for (let col = 0; col < board[row].length - 1; col++){
            // count alive neighbours
            let aliveCount = countAliveNeighbours(board, row, col);

            // Any live cell with two or three live neighbours survives.
            if (board[row][col] == 1 && (aliveCount === 3 || aliveCount === 2)) { 
                board[row][col] = 1;
            }
            // Any dead cell with three live neighbours becomes a live cell.
            if (board[row][col] == 0 && aliveCount === 3) {
                board[row][col] = 1;
            }
            // Any live cell with more than three live neighbours dies
            if (board[row][col] == 1 && aliveCount > 3) { 
                board[row][col] = 0;
            }
            // Any dead cell with exactly three live neighbours becomes a live cell
            if (board[row][col] == 0 && aliveCount === 3) {
                board[row][col] = 1;
            }
        }
    }
    return board;
}
function countAliveNeighbours(board: number[][], row: number, col: number): number {
    let aliveNeighbours = 0;

    // check top left
    if (board[row-1] != null && board[row-1][col-1] != null && board[row-1][col-1] == 1){
        aliveNeighbours++;
    }

    // check top
    if (board[row-1] != null && board[row-1][col] != null && board[row-1][col] == 1){
        aliveNeighbours++;
    }

    // check top right
    if (board[row-1] != null && board[row-1][col+1] != null && board[row-1][col+1] == 1){
        aliveNeighbours++;
    }

    // check left
    if (board[row] != null && board[row][col-1] != null && board[row][col-1] == 1){
        aliveNeighbours++;
    }

    // check right
    if (board[row] != null && board[row][col+1] != null && board[row][col+1] == 1){
        aliveNeighbours++;
    }

    // check bottom left
    if (board[row+1] != null && board[row+1][col-1] != null && board[row+1][col-1] == 1){
        aliveNeighbours++;
    }

    // check bottom
    if (board[row+1] != null && board[row+1][col] != null && board[row+1][col] == 1){
        aliveNeighbours++;
    }

    // check bottom right
    if (board[row+1] != null && board[row+1][col+1] != null && board[row+1][col+1] == 1){
        aliveNeighbours++;
    }

    //console.log(`(${row},${col}): ${aliveNeighbours}`);
    return aliveNeighbours;        
}


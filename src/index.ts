console.log('Begin game of life');
let boardSize = 5;
let numOfGenerations = 5;
let board = initBoard(boardSize);
printBoard(board);

for (let i = 1; i <= numOfGenerations; i++) {
    console.log(`Generation ${i}`);
    board = nextGeneration(board);
    printBoard(board);
}

// init a board of size boardSize x boardSize
function initBoard(boardSize: number) {
    let board = new Array(boardSize);
    for (let i = 0; i < boardSize; i++) {
        board[i] = new Array(boardSize);
        for (let j = 0; j < boardSize; j++) {
            // random between 0 and 1
            board[i][j] = Math.floor(Math.random() * 2);
        }
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
    for (let row = 1; row < board.length - 1; row++) {
        for (let col = 1; col < board[row].length - 1; col++){
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
    for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
            aliveNeighbours += board[row + i][col + j];
        }
    }
    // don't count self
    aliveNeighbours -= board[row][col];

    //console.log(`(${row},${col}): ${aliveNeighbours}`);
    return aliveNeighbours;        
}


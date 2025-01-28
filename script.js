const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#message");
const restartButton = document.querySelector("#RestartButton");
const xScore = document.querySelector("#XScore");
const oScore = document.querySelector("#OScore");

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [6, 4, 2]
];

let options = ["", "", "",
               "", "", "",
               "", "", "" ];
let currentPlayer = "X";
let running = false;
let X = 0;
let O = 0;

initGame();

function initGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent= `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex]!= "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();

}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA=="" || cellB=="" || cellC==""){
            continue;
        }
        if (cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }   

    if (roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        updateScore(currentPlayer);
        running = false;
    }
    else if (!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else {
        changePlayer();
    }
}

function updateScore(currentPlayer){
    if (currentPlayer == "X"){
        X+=1;
        xScore.textContent = `X : ${X}`
    }
    if (currentPlayer == "O"){
        O+=1;
        oScore.textContent = `O : ${O}`
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", "", ];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

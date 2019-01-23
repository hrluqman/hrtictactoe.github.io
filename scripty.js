var origBoard;
let thePlayer = "X";
const winCombos = [
    [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
]

const round = document.getElementById("rounds");
const cells = document.getElementsByClassName("cell");
startGame();


function startGame(){
    document.querySelector(".endgame").style.display = "none"; 
    origBoard = Array.from(Array(9).keys());
    console.log(origBoard);
    
    console.log("Match Started");

    console.log("Starting Turn:", thePlayer);
    
    for (var i=0; i<cells.length; i++){

            cells[i].innerText = "";
            cells[i].style.removeProperty("background-color");
            cells[i].addEventListener("click", turnClick, false);
         
    }
    
}


function turnClick(square){
    turn(square.target.id, thePlayer);
}

function turn (squareId, player){ 
    
    origBoard[squareId] = player;

    let emptySpace = document.getElementById(squareId);

    if(emptySpace.innerHTML != ""){
        alert("This place has been taken");
        return;
    }

    emptySpace.innerHTML = player;
    thePlayer = thePlayer === "X" ? "O" : "X";
    console.log("Next Turn:", thePlayer);
    round.innerHTML = "Player " + thePlayer + " Turn";
    let gameWon = checkWin(origBoard, player);
    if (gameWon){ gameOver(gameWon); whoWon(gameWon.player) }
}


function checkWin(board, player){
    let plays = board.reduce((a,e,i) =>
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for(let [index, win] of winCombos.entries()){
        if(win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor =
        gameWon.player == "X" ? "blue" : "red";
        
    }
    for(var i = 0; i<cells.length; i++){
        cells[i].removeEventListener("click", turnClick, false);
    }
    return gameWon.player;
}

function whoWon(lastPlayer){
    alert("The Game Has Finished");
    let winner = document.getElementById("winner");
    round.innerHTML ="";
    winner.innerHTML = "The winner is Player " + lastPlayer + ".";
}
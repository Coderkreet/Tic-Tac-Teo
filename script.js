const boxes = document.querySelectorAll(".box")
const game_info = document.querySelector(".game_info")
const GameBtn = document.querySelector(".btn")


let currentPlayer ;
let gameGrid;


const winningPosition = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]

];

// creat a function initialise a game

function initGame() {
    currentPlayer = "X"
    gameGrid = ["","","","","","","","",""];
    // Ui Empty
    boxes.forEach((box , index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"
        box.classList = ` box box${index+1}`;

    });
    GameBtn.classList.remove("active");
    game_info.innerText = `Current Player - ${currentPlayer}`;

}

initGame();


function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
    }
    else{
        currentPlayer = "X"
    }
    // UI Update GameInfo
    game_info.innerText = `Current Player - ${currentPlayer}`;

}


function CheckGameOver() {
    let answer = "";
    winningPosition.forEach(position => {
        // all 3 box is not empty and same value 
        if( (gameGrid[position[0]] !== ""||gameGrid[position[1]] !== ""|| gameGrid[position[2]]!=="")
         && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            // if winner is X
            if (gameGrid[position[0]] === "X") {
                answer = "X"
                
            }
            else{
                answer = "O";
            }
            // desable pointer event

            boxes.forEach(box => {
                box.style.pointerEvents ="none"
            });
            // now we know X or Y/O is a winner
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win") 
            boxes[position[2]].classList.add("win")
        } 
    });
    // it means we have winner
    if (answer !== "") {
        game_info.innerText = `Current Player - ${answer} is winner`
        GameBtn.classList.add("active");
       return;
    }
//    let supose game is drow
let fillcount = 0;
gameGrid.forEach((box) =>{

    if (box !=="") {
        fillcount++;
    }
    if(fillcount===9){

        game_info.innerText = `Match Is drow`
        GameBtn.classList.add("active");

    }

}
)
}

 function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"
        // Swap turn
        swapTurn();
        CheckGameOver();
    }
 } 

boxes.forEach((box , index ) => {
    box.addEventListener("click" , ()=>{
        handleClick(index);
        console.log(index);
        
    })
});

GameBtn.addEventListener("click", initGame)

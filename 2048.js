let nav={
  func: function(){
    let mood_btn = document.getElementById("nav_set_3");
    let td_btn = document.getElementById("nav_set_2");
    let sound_btn = document.getElementById("nav_set_1");
    let body = document.querySelector("body");
    mood_btn.addEventListener("click",()=>{
      body.classList.toggle("light-mood");
      body.classList.toggle("dark-mood");
    });
    td_btn.addEventListener("click",()=>{
      body.classList.toggle("disable-3d-display");
      body.classList.toggle("able-3d-display");
    });
    sound_btn.addEventListener("click",()=>{
      sound_btn.classList.toggle("sound-disable");
    });
  },
  mood:function(){
    return getComputedStyle(document.body).getPropertyValue("--shadow--color")
  },
  angle:function(){
    return getComputedStyle(document.body).getPropertyValue("--hover--angle")
  }
}
nav.func();

let board;
let score = 0;
let rows = 4;
let cols = 4;

let startTile; // Variable to store the starting tile for drag

window.onload = function () {
    newGame();
}

function startNewGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    score = 0;
    document.getElementById("score").innerText = score;

    // 重新初始化畫面
    updateBoard();

    addTwo_Four();
    addTwo_Four();
}

function newGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for(let i = 0;i<rows;i++){
        for(let j = 0;j<cols;j++){
            // id -> r*c (0*0 means 0th row and 0th column)
            let tile = document.createElement("div");
            tile.id = i.toString() + "*" + j.toString();

            // Add event listeners for drag
            tile.draggable = true;

            let num = board[i][j];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    addTwo_Four();
    addTwo_Four();
}

// Game Over Modal
function openGameOverModal() {
    let modal = document.getElementById("gameOverModal");
    let finalScoreElement = document.getElementById("finalScore");
    
    finalScoreElement.innerText = score;
    modal.style.display = "flex";
}

function closeGameOverModal() {
    let modal = document.getElementById("gameOverModal");
    modal.style.display = "none";
}

function isGameOver(board) {
    // 檢查是否有空格
    for (const row of board) {
        for (const cell of row) {
            if (cell === 0) {
                return false; // 還有空格，遊戲未結束
            }
        }
    }
  
    // 檢查相鄰格子是否有相同的數字
    for (let i = 0; i < board.length; i++) {
        const row = board[i]; // 取得當前列
        for (let j = 0; j < row.length; j++) {
            const cell = row[j]; // 取得當前格子
    
            // 檢查右邊和下方的相鄰格子是否相同
            if (
                (i < board.length - 1 && cell === board[i + 1][j]) || // 檢查下方
                (j < row.length - 1 && cell === row[j + 1]) // 檢查右方
            ) {
                return false; // 還能合併，遊戲未結束
            }
        }
    }
  
    // 所有條件都不符合，遊戲結束
    updateBoard();
    return true;
}


// Add event listeners for dragover and drop on the document
document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

function updateBoard() {
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            let tile = document.getElementById(i.toString() + "*" + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}

function addTwo_Four(){
    // .flat() -> flatten the 2d array to 1d array
    // find if there is any 0 in the board
    if(!board.flat().includes(0)){
        return;
    }

    let found = false;
    while(!found){
        // random row and column
        let i = Math.floor(Math.random() * rows); // 0, 1, 2, 3
        let j = Math.floor(Math.random() * cols); // 0, 1, 2, 3
        if(board[i][j] == 0){
            board[i][j] = Math.random() < 0.75 ? 2 : 4; // 2 or 4
            let tile = document.getElementById(i.toString() + "*" + j.toString());
            tile.innerText = board[i][j];
            let id = "x" + board[i][j].toString(); // "x2
            tile.classList.add(id);
            found = true;
        }
    }
    if(isGameOver(board)){
        openGameOverModal();
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    // clear all classlist
    tile.classList.value = "";
    tile.classList.add("tile");

    if(num > 0){
        tile.innerText = num;
        if(num <= 4096){
            tile.classList.add("x" + num.toString());
        }else{
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", function (event) {
    switch (event.code) {
        case "ArrowLeft":
            slide_direction("left");
            addTwo_Four();
            break;
        case "ArrowRight":
            slide_direction("right");
            addTwo_Four();
            break;
        case "ArrowUp":
            slide_direction("up");
            addTwo_Four();
            break;
        case "ArrowDown":
            slide_direction("down");
            addTwo_Four();
            break;
    }
    document.getElementById("score").innerText = score;
})

function slide(row){
    for(let i = 0;i < (row.length - 1);i++){
        // check every 2
        if(row[i] == row[i + 1]){
            row[i] = row[i] * 2;
            row[i + 1] = 0;
            score += row[i];
        }
        // [2 ,2 ,2] -> [4, 0, 2]
    }
    return row;
}

function slide_without_zero(row){
    // row.filter -> filter the zeros (create a new array without zero)
    row = row.filter(num => num != 0); // get rid of zeros [2,2,2]

    row = slide(row);
    
    row = row.filter(num => num != 0); // get rid of zeros [4,2]

    // add zeros to the end
    let missing = 4 - row.length;
    let zeros = Array(missing).fill(0);
    row = row.concat(zeros);
    return row;
}

function slide_direction(direction){
    // direction = "left" or "right" or "up" or "down"
    if(direction == "left" || direction == "right"){
        for(let i = 0;i < rows;i++){
            let row = board[i];
            if(direction == "right"){ row = row.reverse(); }
            row = slide_without_zero(row);
            if(direction == "right"){ row = row.reverse(); }
            board[i] = row;

            for(let j = 0;j<cols;j++){
                let tile = document.getElementById(i.toString() + "*" + j.toString());
                let num = board[i][j];
                updateTile(tile, num);
            }
        }
    }else if(direction == "up" || direction == "down"){
        for(let j = 0;j < cols;j++){
            // transpose the column to row
            let row = [board[0][j], board[1][j], board[2][j], board[3][j]];
            if(direction == "down"){ row = row.reverse(); }
            row = slide_without_zero(row);
            if(direction == "down"){ row = row.reverse(); }
    
            for(let i = 0;i < rows;i++){
                // transpose back and push onto the board(column)
                board[i][j] = row[i];
                let tile = document.getElementById(i.toString() + "*" + j.toString());
                let num = board[i][j];
                updateTile(tile, num);
            }
        }
    }
}
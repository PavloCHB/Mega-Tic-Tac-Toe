function handleClick(element){
    // no entiendo porque board (la variable definida antes)
    // no funciona dentro de esta funcion.
    var mark = element.getAttribute("data-mark");
    var clickedBoard = element.offsetParent
    var active = clickedBoard.classList.contains("active");
    var boardMega = document.querySelector("#mega-board")
    var index = element.getAttribute("data-index");
    var [game,row,column] = [index.charAt(0),index.charAt(1),index.charAt(2)];
    var turn = boardMega.getAttribute("data-turn");
    if(mark != "none" || !active){return};

    element.setAttribute("data-mark", turn);
    if(turn == "cross"){
        boardMega.setAttribute("data-turn", "circle");
    }else{
        boardMega.setAttribute("data-turn", "cross");
    };
    singleBoards.forEach(board =>{
        board.classList.remove("active");
    })

    changeActiveBoard(row, column);
    modifyMegaBoard(game, row, column, turn);
    //check win.
    checkForWin(game, clickedBoard);
}

function modifyMegaBoard(i,j,k, turn){
    megaBoard[i][j][k] = turn;
}

function checkForWin(i, game){
    if(game.getAttribute("data-win") != "none"){return}
    var cross = 0;
    var circle = 0;
    //Check if the is a win for rows
    for(j=0; j<3; j++){
        for(k=0; k<3; k++){
            if(megaBoard[i][j][k] == "cross"){
                cross++
            }else if(megaBoard[i][j][k] == "circle"){
                circle++
            }
            if(cross == 3){
                win(game, "cross", i);
            }
            if(circle == 3){
                win(game, "circle", i);
            }  
        }
        [cross, circle] = [0, 0] 
    }
    //Check if there is a win for column
    for(k=0; k<3; k++){
        for(j=0; j<3; j++){
            if(megaBoard[i][j][k] == "cross"){
                cross++
            }else if(megaBoard[i][j][k] == "circle"){
                circle++
            }
            if(cross == 3){
                win(game, "cross", i)
            }
            if(circle == 3){
                win(game, "circle", i);
            }   
        }
        [cross, circle] = [0, 0] 
    }
    //Check for win on diagonals
    if(megaBoard[i][0][0] == megaBoard[i][1][1] && megaBoard[i][1][1] == megaBoard[i][2][2] && megaBoard[i][1][1] != "none"){
        win(game, megaBoard[i][0][0], i)
    }
    if(megaBoard[i][0][2] == megaBoard[i][1][1] && megaBoard[i][1][1] == megaBoard[i][2][0] && megaBoard[i][1][1] != "none"){
        win(game, megaBoard[i][0][2], i)
    }
}


function win(game, team, i){
    game.setAttribute("data-win", team);
    markGlobal(i,team);
    checkForWinGlobl(team)
    return
};

function markGlobal(i, team){
    switch(i){
        case "0": globalGame[0][0] = team;
        break;
        case "1": globalGame[0][1] = team;
        break;
        case "2": globalGame[0][2] = team;
        break;
        case "3": globalGame[1][0] = team;
        break;
        case "4": globalGame[1][1] = team;
        break;
        case "5": globalGame[1][2] = team;
        break;
        case "6": globalGame[2][0] = team;
        break;
        case "7": globalGame[2][1] = team;
        break;
        case "8": globalGame[2][2] = team;
        break;
        default: break;
    }
}

function checkForWinGlobl(team){
    var cross = 0;
    var circle = 0;
    //Check for row wins
    for(i=0; i<3;i++){
        for(j=0; j<3;j++){
            if(globalGame[i][j] == "cross"){
                cross++
            }else if(globalGame[i][j] == "circle"){
                circle++
            }
            if(cross == 3){
                bigWin(team);
            }else if(circle == 3){
                bigWin(team);
            }
        }
        [cross, circle] = [0, 0] 
    }
    //check for column winsç
    for(j=0; j<3;j++){
        for(i=0; i<3;i++){
            if(globalGame[i][j] == team){
                cross++
            }else if(globalGame[i][j] == team){
                circle++
            }
            if(cross == 3){
                bigWin(team);
            }else if(circle == 3){
                bigWin(team);
            }
        }
        [cross, circle] = [0, 0] 
    }
    //check for diagonal wins
    if(globalGame[0][0] == globalGame[1][1] && globalGame[1][1] == globalGame[2][2] && globalGame[1][1] != "none"){
        bigWin(team)
    }
    if(globalGame[2][2] == globalGame[1][1] && globalGame[1][1] == globalGame[2][0] && globalGame[1][1] != "none"){
        bigWin(team)
    }
}

function bigWin(team){
    var winnerColor = " background-color: var(--" + team + "-color)"
    winSign.setAttribute("style", winnerColor);
    winSign.innerHTML = "The winner is " + team + "!!!"
    winSign.classList.remove("hidden");
    cells.forEach(cell => {
        cell.offsetParent.classList.remove("active");
    })
}


function addHandleClick(){
    singleBoards = document.querySelectorAll(".cell.board")
    cells = document.querySelectorAll("[data-mark]");
    cells.forEach(cell => {
        cell.addEventListener("click", function(){ //no entiendo porque tengo que lanzar el handleClick dentro de una funcion vacia en lugar de hacerlo directamente desde el addEventListener
            handleClick(cell); 
        })
    })
}

function changeActiveBoard(row, column){
    switch("" + row + column){
        case "00":
            singleBoards[0].classList.add("active");
            break;
        case "01":
            singleBoards[1].classList.add("active");
            break;
        case "02":
            singleBoards[2].classList.add("active");
            break;
        case "10":
            singleBoards[3].classList.add("active");
            break;
        case "11":
            singleBoards[4].classList.add("active");
            break;
        case "12":
            singleBoards[5].classList.add("active");
            break;
        case "20":
            singleBoards[6].classList.add("active");
            break;
        case "21":
            singleBoards[7].classList.add("active");
            break;
        case "22":
            singleBoards[8].classList.add("active");
            break;
        default:
            break;
    }
    if(document.querySelectorAll(".active [data-mark='none']").length == 0){
        singleBoards.forEach(board =>{
            board.classList.remove("active");
            board.classList.add("active");
        }) 
    }
}


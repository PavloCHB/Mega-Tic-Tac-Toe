const board = document.querySelector("#mega-board");
var megaBoard = [];
var cells = [];
var globalGame = [["none", "none", "none"], ["none", "none", "none"], ["none", "none", "none"]];
var winSign = document.querySelector("#win-result") 

function createBoardArray(){
    megaBoard = []
    for(i=0; i<9; i++){
        var simpleBoard = [];
        for(j=0; j<3; j++){
            var row = ["none", "none", "none"]
            simpleBoard.push(row);
        };
        megaBoard.push(simpleBoard);
    };
};

function createBoard(){  
    var boardHTML= ""
    for(i=0; i<9; i++){
        var cellsContent = "";
        for(j=0; j<3; j++){
            for(k=0; k<3; k++){
                var cellContent = "<div class='cell' data-mark='none' data-index='" + i + j + k + "'></div>";
            cellsContent += cellContent 
            } 
        };
        var cellBoard = "<div class='cell board active' data-win='none'>" + cellsContent + "</div>";
        boardHTML += cellBoard;
    };
    board.innerHTML = boardHTML;
    board.setAttribute("data-turn", "cross");
};


function startGame(){
    winSign.classList.add("hidden")
    createBoardArray();
    globalGame = [["none", "none", "none"], ["none", "none", "none"], ["none", "none", "none"]];
    createBoard();
    addHandleClick();
};

startGame();

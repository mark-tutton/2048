document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#score");
  const resultDisplay = document.querySelector("#result");
    const width = 4;


  // create grid
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div')
        gridDisplay.appendChild(square)
    }
  }

  createBoard();
});

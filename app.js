document.addEventListener("DOMContentLoaded", () => {
	const gridDisplay = document.querySelector(".grid")
	const scoreDisplay = document.querySelector("#score")
	const resultDisplay = document.querySelector("#result")
	const width = 4
	let squares = []
    let score = 0

	// create grid
	function createBoard() {
		for (let i = 0; i < width * width; i++) {
			const square = document.createElement("div")
			square.innerHTML = 0
			gridDisplay.appendChild(square)
			squares.push(square)
		}
		generate()
		generate()
	}

	createBoard()

	// gen a new number
	function generate() {
		const randomNum = Math.floor(Math.random() * squares.length)
		if (squares[randomNum].innerHTML == 0) {
			squares[randomNum].innerHTML = 2

			// check for game over
            checkForLose()
		} else {
			generate()
		}
	}

	// move tiles
	function moveRight() {
		for (let i = 0; i < 16; i++) {
			if (i % 4 === 0) {
				let totalOne = squares[i].innerHTML
				let totalTwo = squares[i + 1].innerHTML
				let totalThree = squares[i + 2].innerHTML
				let totalFour = squares[i + 3].innerHTML
				let row = [
					parseInt(totalOne),
					parseInt(totalTwo),
					parseInt(totalThree),
					parseInt(totalFour),
				]
				console.log(row)

				let filteredRow = row.filter((num) => num)
				let missing = 4 - filteredRow.length
				let zeros = Array(missing).fill(0)
				let newRow = zeros.concat(filteredRow)

				squares[i].innerHTML = newRow[0]
				squares[i + 1].innerHTML = newRow[1]
				squares[i + 2].innerHTML = newRow[2]
				squares[i + 3].innerHTML = newRow[3]
			}
		}
	}

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 == 0) {
                let totalOne = squares[i].innerHTML
				let totalTwo = squares[i + 1].innerHTML
				let totalThree = squares[i + 2].innerHTML
				let totalFour = squares[i + 3].innerHTML
				let row = [
					parseInt(totalOne),
					parseInt(totalTwo),
					parseInt(totalThree),
					parseInt(totalFour),
				]
				console.log(row)

				let filteredRow = row.filter((num) => num)
				let missing = 4 - filteredRow.length
				let zeros = Array(missing).fill(0)
				let newRow = filteredRow.concat(zeros)

				squares[i].innerHTML = newRow[0]
				squares[i + 1].innerHTML = newRow[1]
				squares[i + 2].innerHTML = newRow[2]
				squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + width * 2].innerHTML
            let totalFour = squares[i + width * 3].innerHTML
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour),
            ]

            let filteredColumn = column.filter((num) => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + width * 2].innerHTML = newColumn[2]
            squares[i + width * 3].innerHTML = newColumn[3]
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + width * 2].innerHTML
            let totalFour = squares[i + width * 3].innerHTML
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour),
            ]

            let filteredColumn = column.filter((num) => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + width * 2].innerHTML = newColumn[2]
            squares[i + width * 3].innerHTML = newColumn[3]
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        // checkForWin()
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i+width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }



	// assign funcs to keys
	function control(e) {
		if (e.key === "ArrowLeft") {
			keyLeft()
		} else if (e.key === "ArrowRight") {
			keyRight()
		} else if (e.key === "ArrowUp") {
            keyUp()
        } else if (e.key === "ArrowDown") {
            keyDown()
        }
	}
	document.addEventListener("keydown", control)

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    // check for win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You win!"
                document.removeEventListener("keydown", control)
                setTimeout(clear, 3000)
            }
        }
    }

    function checkForLose() {
        let zeros = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++
            }
        }

        if (zeros === 0) {
            resultDisplay.innerHTML = "You lose!"
            document.removeEventListener("keydown", control)
            setTimeout(clear, 3000)
        }

    }

    function clear() {
        clearInterval(timer)
    }

    function addColors() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = "#afa192"
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = "#eee4da"
            else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = "#ede0c8"
            else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = "#f2b179"
            else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = "#f59563"
            else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = "#f67c5f"
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = "#f65e3b"
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = "#edcf72"
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = "#edcc61"
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = "#edc850"
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = "#edc53f"
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = "#edc22e"
        }
    }

    addColors()
    let timer = setInterval(addColors, 50)

})

// BOARD MAP 

let boardArray = [
    [0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 0, 0, ],
]

// GLOBAL VARIABLES

let playerOneTurn = true

let board = document.getElementById('board')
let main = document.getElementById('main')

document.getElementById("start").addEventListener("click", start);

const topDiv = document.createElement("div")
topDiv.classList.add("topDiv")

let playerOneName
let playerTwoName

let gameOn = true

// GAME CONTROLS

function start() {
    playerOneName = document.getElementById("fPlayer").value;
    playerTwoName = document.getElementById("sPlayer").value;

    document.getElementById("players").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden")

    generateBoard()
}

// RENDERING BOARD IN HTML

function generateBoard() {
    let columnCounter = 0
    board.innerHTML = ''

    boardArray.forEach(column => {

        let columnDiv = document.createElement('div')
        columnDiv.classList.add('column')
        columnDiv.setAttribute('id', columnCounter)
        columnCounter++


        board.appendChild(columnDiv)

        column.forEach(cell => {
            let cellDiv = document.createElement('div')
            cellDiv.classList.add('cell')
            columnDiv.appendChild(cellDiv)

            if (cell === 1) { cellDiv.classList.add('red') } else if (cell === 2) { cellDiv.classList.add('black') }
        })
    })

    for (let i = 0; i <= 6; i++) {
        document.getElementById(i).addEventListener('click', makePlay)
    }

    if (gameOn) { displayTurn() } else {
        turnGameOff();
        document.getElementById("")
    }
}
// DISPLAY PLAYER TURN
function displayTurn() {
    let turn = playerOneTurn ? playerOneName : playerTwoName
    topDiv.innerText = `Player Turn: ${turn}`
    main.insertBefore(topDiv, board)
}

// MAKING MOVES IN ARRAY

function makePlay(event) {
    let playCurrentDestination = event.currentTarget.id
    let moveIndexDestination = boardArray[playCurrentDestination].lastIndexOf(0)

    if (moveIndexDestination === -1) {
        return
    } else {
        if (playerOneTurn) { //Tirar varável playerTwoTurn ? 
            boardArray[playCurrentDestination][moveIndexDestination] = 1
        } else {
            boardArray[playCurrentDestination][moveIndexDestination] = 2
        }

        winChecker()
        changePlayerTurn()
    }

    generateBoard()
}

// PLAYER INTERACTIONS

function changePlayerTurn() {
    playerOneTurn = !playerOneTurn
}

// WIN CONDITIONS 

function checkDraw() {
    drawCheckArray = []
    boardArray.forEach(column => {
        drawCheckArray.push(column.lastIndexOf(0))
    });

    if (JSON.stringify(drawCheckArray) === '[-1,-1,-1,-1,-1,-1,-1]') { displayDraw() }
}

function checkVerticalWin() {
    boardArray.forEach(column => {
        let columnString = column.join('')

        if (columnString.includes('1111')) { displayWinner(playerOneName) } else if (columnString.includes('2222')) { displayWinner(playerTwoName) }

    });
}


function checkHorizontalWin() {
    transposedArray = []

    function transposeArray(num) {
        let rowArray = []
        let cellCounter = 0

        while (cellCounter < 7) {
            rowArray.push(boardArray[cellCounter][num])
            cellCounter++
        }

        return rowArray
    }

    for (let i = 0; i < 6; i++) {
        transposedArray.push(transposeArray(i))
    }

    transposedArray.forEach(column => {
        let columnString = column.join('')

        if (columnString.includes('1111')) { displayWinner(playerOneName) }
        if (columnString.includes('2222')) { displayWinner(playerTwoName) }
    });
}

function checkDiagonalWin() {
    let arrayDiagonalLeft = []
    arrayDiagonalLeft.push([boardArray[3][0], boardArray[2][1], boardArray[1][2], boardArray[0][3]])
    arrayDiagonalLeft.push([boardArray[4][0], boardArray[3][1], boardArray[2][2], boardArray[1][3], boardArray[0][4]])
    arrayDiagonalLeft.push([boardArray[5][0], boardArray[4][1], boardArray[3][2], boardArray[2][3], boardArray[1][4], boardArray[0][5]])
    arrayDiagonalLeft.push([boardArray[6][0], boardArray[5][1], boardArray[4][2], boardArray[3][3], boardArray[2][4], boardArray[1][5]])
    arrayDiagonalLeft.push([boardArray[6][1], boardArray[5][2], boardArray[4][3], boardArray[3][4], boardArray[2][5]])
    arrayDiagonalLeft.push([boardArray[6][2], boardArray[5][3], boardArray[4][4], boardArray[3][5]])

    let arrayDiagonalRight = []
    arrayDiagonalRight.push([boardArray[6][3], boardArray[5][2], boardArray[4][1], boardArray[3][0]])
    arrayDiagonalRight.push([boardArray[6][4], boardArray[5][3], boardArray[4][2], boardArray[3][1], boardArray[2][0]])
    arrayDiagonalRight.push([boardArray[6][5], boardArray[5][4], boardArray[4][3], boardArray[3][2], boardArray[2][1], boardArray[1][0]])
    arrayDiagonalRight.push([boardArray[5][5], boardArray[4][4], boardArray[3][3], boardArray[2][2], boardArray[1][1], boardArray[0][0]])
    arrayDiagonalRight.push([boardArray[4][5], boardArray[3][4], boardArray[2][3], boardArray[1][2], boardArray[0][1]])
    arrayDiagonalRight.push([boardArray[3][5], boardArray[2][4], boardArray[1][3], boardArray[0][2]])

    arrayDiagonalLeft.forEach(column => {
        let columnString = column.join('')

        if (columnString.includes('1111')) { displayWinner(playerOneName) }
        if (columnString.includes('2222')) { displayWinner(playerTwoName) }
    });

    arrayDiagonalRight.forEach(column => {
        let columnString = column.join('')


        if (columnString.includes('1111')) { displayWinner(playerOneName) }
        if (columnString.includes('2222')) { displayWinner(playerTwoName) }
    });

}

function winChecker() {
    checkDraw()
    checkHorizontalWin()
    checkVerticalWin()
    checkDiagonalWin()
}

// Criar função que apresenta resultado
function displayWinner(winner) {
    gameOn = false
    topDiv.innerHTML = `<p> ${winner}, You Won!</p> <div id="restart">Restart Game</div>`
    main.insertBefore(topDiv, board)
    document.getElementById("restart").addEventListener("click", () => location.reload())
}

function displayDraw() {
    gameOn = false
    topDiv.innerHTML = `<p>That's a draw, try again!</p> <div id="restart">Restart Game</div>`
    main.insertBefore(topDiv, board)
    document.getElementById("restart").addEventListener("click", () => location.reload())
}

function turnGameOff() {
    for (let i = 0; i <= 6; i++) {
        document.getElementById(i).removeEventListener('click', makePlay)
    }
}
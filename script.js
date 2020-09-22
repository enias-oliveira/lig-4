// BOARD MAP 

let boardArray = [
    [0, 0, 0, 0, 0, 1,],
    [0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0,],
]

// GLOBAL VARIABLES

let playerOneName = 'player1'
let playerTwoName = 'player2'

let playerOneTurn = true
let playerTwoTurn = false

let boardReference = [...boardArray]
let board = document.getElementById('board')
let columnCounter = 0

// RENDERING BOARD IN HTML

function generateBoard() {
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

            if (cell === 0) {cellDiv.classList.add('blank')}
            if (cell === 1) {cellDiv.classList.add('red')}
            if (cell === 2) {cellDiv.classList.add('black')}
        })
    })

    for (let i = 0; i <= 6; i++) {
        document.getElementById(i).addEventListener('click', makePlay) 
    }
}

// MAKING MOVES IN ARRAY

function makePlay(event) {
    let playCurrentDestination = event.currentTarget.id
    console.log(playCurrentDestination)
    let moveIndexDestination = boardArray[playCurrentDestination].lastIndexOf(0)
    console.log(moveIndexDestination)

    changePlayerTurn()
    console.log(playerOneTurn, playerTwoTurn)
}

// PLAYER INTERACTIONS

function changePlayerTurn() {
    playerOneTurn === true ? playerOneTurn = false : playerOneTurn = true
    playerTwoTurn === true ? playerTwoTurn = false : playerTwoTurn = true
}

generateBoard()



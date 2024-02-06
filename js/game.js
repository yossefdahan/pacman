'use strict'

const WALL = '⛓'
const FOOD = '⭐'
const EMPTY = ' '
const SUPER_FOOD = '🍄'
const CHERRY = '🍒'
var isVictory
var gCherryInterval
// Model
const gGame = {
    score: 0,
    isOn: false
}
var gBoard

function onInit() {
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    isVictory = false
    var elPopUp = document.querySelector('.end')
    var elVictoryPopUp = document.querySelector('.victory')
    elPopUp.classList.add('pop-up')
    elVictoryPopUp.classList.add('Vpop-up')
    gCherryInterval = setInterval(addCherry, 15000)
    // moveGhosts()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }

    board[1][1] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][8] = SUPER_FOOD

    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML


}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value

}


function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    if (gGame.score === 56) victorious()
    document.querySelector('span.score').innerText = gGame.score

}

function gameOver() {
    console.log(gGame.score);


    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    if (!isVictory) {

        var elPopUp = document.querySelector('.pop-up')
        renderCell(gPacman.location, '☠')
        elPopUp.classList.remove('pop-up')
    }

}


function victorious() {
    var elPopUp = document.querySelector('.Vpop-up')
    elPopUp.classList.remove('Vpop-up')

    isVictory = true

    gameOver()


}




function addCherry() {
    const emptyPos = getEmptyPos()
    if (!emptyPos) return

    gBoard[emptyPos.i][emptyPos.j] = CHERRY
    renderCell(emptyPos, CHERRY)
    // setTimeout(removeGlue, REMOVE_GLUE_FREQ, emptyPos)

}

function getEmptyPos() {
    const emptyPoss = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell !== WALL && currCell !== FOOD && currCell !== GHOST && currCell !== PACMAN && currCell !== SUPER_FOOD) {
                emptyPoss.push({ i, j })
            }
        }
    }

    const randIdx = getRandomInt(0, emptyPoss.length)
    return emptyPoss[randIdx]
}


function playSound() {
    const sound = new Audio('sound/sound.wav')
    sound.play()
}
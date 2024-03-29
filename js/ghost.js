'use strict'
const id = 1
const GHOST = '👻'
var gGhosts = []

var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        id: makeId(length = 6),
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return


    // DONE: hitting a pacman? call gameOver

    if (gPacman.isSuper) {

        if (nextCell === PACMAN) {

            return
        }


    }
    if (nextCell === PACMAN) {
        gameOver()
        return
    }

    // DONE: moving from current location:
    // DONE: update the model 
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)


    // DONE: Move the ghost to new location:
    // DONE: update the model 
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {

    return `<span style="background-color:${ghost.color}">${GHOST}</span>`
}


function superFood() {
    gPacman.isSuper = true
    if (gPacman.isSuper) {
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = "blue"


        }
    }
    setTimeout(function () {
        gPacman.isSuper = false
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = getRandomColor()


        }

    }, 5000)

}



function getGhostByLocation(pacmanLocation) {


    for (var i = 0; i < gGhosts.length; i++) {

        var ghostLocation = gGhosts[i].location

        if (pacmanLocation.i === ghostLocation.i && pacmanLocation.j === ghostLocation.j) {
            console.log('hi');

            var currGhost = gGhosts.splice(i, 1)
            console.log(currGhost);
            console.log(pacmanLocation);
            playSound()
        }
    }
    setTimeout(function () {
        gGhosts.push(currGhost[0])
    }, 5000)
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
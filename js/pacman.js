'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {

    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (gPacman.isSuper) {
        if (nextCell === SUPER_FOOD) return
        // DONE: hitting a ghost? call gameOver
        if (gPacman.isSuper && nextCell === GHOST) {

            getGhostByLocation(nextLocation)
            setTimeout(function () {
                gPacman.isSuper = false
            }, 5000)

        }
    }

    if (!gPacman.isSuper && nextCell === GHOST) {

        gameOver()
        return
    }


    if (nextCell === CHERRY) updateScore(10), playSound()
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === SUPER_FOOD) superFood(), playSound()



    // if (nextLocation.i) {

    //         // Select the elCell and set the value
    //         const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    //         elCell.innerHTML = value

    //     elCell.style.routat
    // }




    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}



document.addEventListener('DOMContentLoaded', () => {
    gameTetrolino();
})

function gameTetrolino() {
    /////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS

    // Tetrolinoes
    function initTetrolinos(width) {
        const j_tetrolino = [
            //[20, 01, 11, 21],
            [2 * width + 0, 0 * width + 1, 1 * width + 1, 2 * width + 1],
            //[10, 20, 21, 22],
            [1 * width + 0, 2 * width + 0, 2 * width + 1, 2 * width + 2],
            //[01, 11, 21, 02],
            [0 * width + 1, 1 * width + 1, 2 * width + 1, 0 * width + 2],
            //[10, 11, 12, 22]
            [1 * width + 0, 1 * width + 1, 1 * width + 2, 2 * width + 2]
        ];

        const l_tetrolino = [
            [0 * width + 0, 1 * width + 0, 2 * width + 0, 2 * width + 1],
            [1 * width + 0, 2 * width + 0, 1 * width + 1, 1 * width + 2],
            [0 * width + 0, 0 * width + 1, 1 * width + 1, 2 * width + 1],
            [2 * width + 0, 2 * width + 1, 1 * width + 2, 2 * width + 2]
        ];

        const s_tetrolino = [
            [2 * width + 0, 1 * width + 1, 2 * width + 1, 1 * width + 2],
            [0 * width + 0, 1 * width + 0, 1 * width + 1, 2 * width + 1],
            [2 * width + 0, 1 * width + 1, 2 * width + 1, 1 * width + 2],
            [0 * width + 0, 1 * width + 0, 1 * width + 1, 2 * width + 1]
        ];

        const z_tetrolino = [
            [1 * width + 0, 1 * width + 1, 2 * width + 1, 2 * width + 2],
            [1 * width + 0, 2 * width + 0, 1 * width + 1, 0 * width + 1],
            [1 * width + 0, 1 * width + 1, 2 * width + 1, 2 * width + 2],
            [1 * width + 0, 2 * width + 0, 1 * width + 1, 0 * width + 1]
        ];

        const t_tetrolino = [
            [1 * width + 0, 1 * width + 1, 2 * width + 1, 1 * width + 2],
            [1 * width + 0, 0 * width + 1, 1 * width + 1, 2 * width + 1],
            [1 * width + 0, 0 * width + 1, 1 * width + 1, 1 * width + 2],
            [0 * width + 1, 1 * width + 1, 2 * width + 1, 1 * width + 2]
        ];

        const o_tetrolino = [
            [0 * width + 0, 1 * width + 0, 0 * width + 1, 1 * width + 1],
            [0 * width + 0, 1 * width + 0, 0 * width + 1, 1 * width + 1],
            [0 * width + 0, 1 * width + 0, 0 * width + 1, 1 * width + 1],
            [0 * width + 0, 1 * width + 0, 0 * width + 1, 1 * width + 1]
        ];

        const i_tetrolino = [
            [0 * width + 1, 1 * width + 1, 2 * width + 1, 3 * width + 1],
            [1 * width + 0, 1 * width + 1, 1 * width + 2, 1 * width + 3],
            [0 * width + 1, 1 * width + 1, 2 * width + 1, 3 * width + 1],
            [1 * width + 0, 1 * width + 1, 1 * width + 2, 1 * width + 3]
        ];

        return [l_tetrolino, j_tetrolino, z_tetrolino, s_tetrolino, t_tetrolino, o_tetrolino, i_tetrolino];
    }

    // set up the grid
    function setUpGrid(n) {
        for (let i = 0; i < n; i++) {
            let element = document.createElement('div');
            grid.appendChild(element);
        }
        
        for (let i = 0; i < 10; i++) {
            let element = document.createElement('div');
            element.classList.add('solid');
            grid.appendChild(element);
        }
    }

    // set up the preview grid (next tetrolino box)
    function setUpPreviewGrid(n) {
        for (let i = 0; i < n; i++) {
            let element = document.createElement('div');
            previewGrid.appendChild(element);
        }
    }

    function isAtRight() {
        return currentTetrolino.some(index => (currentPosition + index + 1) % width_squareGrid === 0)  
    }
    
    function isAtLeft() {
        return currentTetrolino.some(index => (currentPosition + index) % width_squareGrid === 0)
    }
    
    function checkRotatedPosition(P) {
        P = P || currentPosition                    // get current position and check if the piece is near the left side
        if ((P + 1) % width_squareGrid < 4) {       // add 1 because the position index can be 1 less than where the block is (with how they are indexed)
            if (isAtRight()) {                      // use actual position to check if it's flipped over to right side
                currentPosition += 1                // if so, add one to wrap it back around
                checkRotatedPosition(P)             // check again;  pass position from start, since long block might need to move more
            }
        }
        else if (P % width_squareGrid > 5) {
            if (isAtLeft()) {
                currentPosition -= 1
                checkRotatedPosition(P)
            }
        }
    }

    // draw the tetrolino
    function draw() {
        currentTetrolino.forEach(index => {
            squares_grid[currentPosition + index].classList.add('tetrolinoCSS');
        })
    }

    // undraw the tetrolino
    function undraw() {
        currentTetrolino.forEach(index => {
            squares_grid[currentPosition + index].classList.remove('tetrolinoCSS');
        })
    }

    function drawUI() {
        //draw score ...
    }

    function displayNextTetrolino() {
        //remove any trace of a tetromino form the entire grid
        squares_previewGrid.forEach(square => {
            square.classList.remove('tetrolinoCSS')
        })
        let selectedPreviewTetrolino = previewTetrolinos[nextRandomTetrolino];
        let currentPreview = selectedPreviewTetrolino[nextRandomRotation];
        currentPreview.forEach( index => {
            squares_previewGrid[index_previewGrid + index].classList.add('tetrolinoCSS')
        })
    }

    // move tetrolino down
    function advanceTetrolinoDownward() {
        // enabling "last second change"
        if (!currentTetrolino.some(index => squares_grid[currentPosition + index + width_squareGrid].classList.contains('solid'))) {
            undraw();
            currentPosition += width_squareGrid;
            draw();
        } else {
            solidify();
        }
    }

    function selectRandomTetrolino() {
        // randomly select a tetrolino
        randomTetrolino = nextRandomTetrolino;
        nextRandomTetrolino = Math.floor(Math.random() * tetrolinoes.length);
        selectedTetrolino = tetrolinoes[randomTetrolino];

        // randomly apply a rotation
        randomRotation = nextRandomRotation;
        nextRandomRotation = Math.floor(Math.random() * selectedTetrolino.length);
        currentRotation = randomRotation;
        currentTetrolino = selectedTetrolino[currentRotation];
    }

    // solidify the tetrolino into place
    function solidify() {
        if (currentTetrolino.some(index => squares_grid[currentPosition + index + width_squareGrid].classList.contains('solid'))) {
            currentTetrolino.forEach(index => squares_grid[currentPosition + index].classList.add('solid'));
            selectRandomTetrolino();
            currentPosition = startingPosition;     // set the new tetrolino at the top
            draw();
            displayNextTetrolino();
            addScore();
        }
    }

    // add score
    function addScore() {
        for (let i = 0; i < (width_mainWindow - 1); i += width_squareGrid) {
            const row = [i+0, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];
            if (row.every(index => squares_grid[index].classList.contains('solid'))) {
                score += 10;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    squares_grid[index].classList.remove('solid');
                    squares_grid[index].classList.remove('tetrolinoCSS');
                })
                const squaresRemoved = squares_grid.splice(i, width_squareGrid);
                squares_grid = squaresRemoved.concat(squares_grid);
                squares_grid.forEach(block => grid.appendChild(block));
            }
        }
    }

    /////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS - USER INPUT

    // assign functions to key codes
    function getUserInput(e) {
        if (e.keyCode === 37) {         // left arrow
            moveLeft();
        } else if (e.keyCode === 39) {  // right arrow
            moveRight();
        } else if (e.keyCode === 38) {  // up arrow
            rotate();
        } else if (e.keyCode === 40) {  // down arrow
            moveDown();
        }
    }

    // move tetrolino left until edge of screen
    function moveLeft() {
        undraw();
        const isAtLeftEdge = currentTetrolino.some(index => (currentPosition + index) % width_squareGrid === 0);
        if (!isAtLeftEdge) {
            currentPosition -= 1;
        }
        if (currentTetrolino.some(index => squares_grid[currentPosition + index].classList.contains('solid'))) {
            currentPosition += 1;
        }
        draw();
    }

    // move tetrolino right until edge of screen
    function moveRight() {
        undraw();
        const isAtRightEdge = currentTetrolino.some(index => (currentPosition + index) % width_squareGrid === width_squareGrid - 1);
        if (!isAtRightEdge) {
            currentPosition += 1;
        }
        if (currentTetrolino.some(index => squares_grid[currentPosition + index].classList.contains('solid'))) {
            currentPosition -= 1;
        }
        draw();
    }

    // move tetrolino down faster
    function moveDown() {
        advanceTetrolinoDownward();
    }

    // rotate the tetrolino
    function rotate() {
        undraw();
        currentRotation++;              // advance to the next rotation
        if (currentRotation === currentTetrolino.length) {
            currentRotation = 0;        // reset index to zero (first rotation)
        }
        currentTetrolino = selectedTetrolino[currentRotation];
        checkRotatedPosition()
        draw();
    }

    /////////////////////////////////////////////////////////////////////////////////
    // MAIN GAME LOOP
    function mainGameLoop() {
        advanceTetrolinoDownward();
        drawUI();
    }

    function pauseGame(b) {
        console.log("gamePaused: " + b);
        if (!b) timerId = setInterval(mainGameLoop, timer);
        else clearInterval(timerId);
    }

    ///////////////////////////////////////////////////////////////////////////////
    // INITIALIZING VARIABLES AND FUNCTIONS

    let tetrolinoes;
    let previewTetrolinos;
    let startingPosition;
    let currentPosition;
    let randomTetrolino;
    let nextRandomTetrolino;
    let selectedTetrolino;
    let randomRotation;
    let nextRandomRotation;
    let currentRotation;
    let currentTetrolino;
    let timerId;
    let timer = 500;                // set time interval (1000 = 1 second)
    let score = 0;
    let gamePaused = true;
    const width_squareGrid = 10;
    const width_mainWindow = 200;
    const width_squarePreviewGrid = 4;
    const width_previewWindow = 16;

    // init grid
    const grid = document.querySelector('.grid');
    setUpGrid(width_mainWindow);
    let squares_grid = Array.from(document.querySelectorAll('.grid div'));
    tetrolinoes = initTetrolinos(width_squareGrid);
    previewTetrolinos = initTetrolinos(width_squarePreviewGrid);

    // init ui
    const previewGrid = document.querySelector('.preview-grid');
    setUpPreviewGrid(width_previewWindow);
    const squares_previewGrid = document.querySelectorAll('.preview-grid div')
    const index_previewGrid = 0
    const scoreDisplay = document.querySelector('#score');
    const startPauseButton = document.querySelector('#start-pause-button');

    // adding listeners
    document.addEventListener('keydown', getUserInput)
    startPauseButton.addEventListener('click', () => {
        gamePaused = !gamePaused;
        pauseGame(gamePaused);
    });
    
    startingPosition = 4;   // set tetrolino starting position
    currentPosition = startingPosition;
    nextRandomTetrolino = Math.floor(Math.random() * tetrolinoes.length);
    nextRandomRotation = 0;
    selectRandomTetrolino();
    draw();
    displayNextTetrolino();
}
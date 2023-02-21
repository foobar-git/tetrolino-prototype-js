document.addEventListener('DOMContentLoaded', () => {

    /////////////////////////////////////////////////////////////////////////////////
    // VARIABLES
    
    // Tetrolinoes
    const l_tetrolino_inv = [
        //[2 * width + 0, 0 * width + 1, 1 * width + 1, 2 * width + 1]
        [20, 01, 11, 21],
        [10, 20, 21, 22],
        [01, 11, 21, 02],
        [10, 11, 12, 22]
    ];

    const l_tetrolino = [
        [00, 10, 20, 21],
        [10, 20, 11, 12],
        [00, 01, 11, 21],
        [20, 21, 12, 22]
    ];

    const z_tetrolino_inv = [
        [20, 11, 21, 12],
        [00, 10, 11, 21],
        [20, 11, 21, 12],
        [00, 10, 11, 21]
    ];

    const z_tetrolino = [
        [10, 11, 21, 22],
        [10, 20, 11, 01],
        [10, 11, 21, 22],
        [10, 20, 11, 01]
    ];

    const t_tetrolino = [
        [10, 11, 21, 12],
        [10, 01, 11, 21],
        [10, 01, 11, 12],
        [01, 11, 21, 12]
    ];

    const o_tetrolino = [
        [00, 10, 01, 11],
        [00, 10, 01, 11],
        [00, 10, 01, 11],
        [00, 10, 01, 11]
    ];

    const i_tetrolino = [
        [01, 11, 21, 31, 41],
        [10, 11, 12, 13, 14],
        [01, 11, 21, 31, 41],
        [10, 11, 12, 13, 14]
    ];

    const tetrolinoes = [l_tetrolino, l_tetrolino_inv, z_tetrolino, z_tetrolino_inv, t_tetrolino, o_tetrolino, i_tetrolino];
    
    let startingPosition;
    let currentPosition;
    let randomTetrolino;
    let selectedTetrolino;
    let randomRotation;
    let currentRotation;
    let currentTetrolino;

    /////////////////////////////////////////////////////////////////////////////////
    // FUNCTIONS

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

    // draw the first rotation
    function draw() {
        currentTetrolino.forEach(index => {
            squaresFromGrid[currentPosition + index].classList.add('tetrolinoCSS');
        })
    }

    // undraw the tetrolino
    function undraw() {
        currentTetrolino.forEach(index => {
            squaresFromGrid[currentPosition + index].classList.remove('tetrolinoCSS')
        })
    }

    // move tetrolino down function
    function advanceTetrolinoDownward() {
        // enabling "last second change"
        if (!currentTetrolino.some(index => squaresFromGrid[currentPosition + index + width].classList.contains('solid'))) {
            undraw();
            currentPosition += width;
            draw();
        } else {
            solidify();
        }
    }

    function selectRandomTetrolino() {
        // randomly select a tetrolino
        randomTetrolino = Math.floor(Math.random() * tetrolinoes.length);
        selectedTetrolino = tetrolinoes[randomTetrolino];

        // randomly apply a rotation
        randomRotation = Math.floor(Math.random() * selectedTetrolino.length);
        currentRotation = randomRotation;
        currentTetrolino = selectedTetrolino[currentRotation];
    }

    // solidify the tetrolino into place
    function solidify() {
        if (currentTetrolino.some(index => squaresFromGrid[currentPosition + index + width].classList.contains('solid'))) {
            currentTetrolino.forEach(index => squaresFromGrid[currentPosition + index].classList.add('solid'));
            selectRandomTetrolino();
            currentPosition = startingPosition;
            draw();
        }
    }

    // assign functions to key codes
    function getUserInput(e) {
        if (e.keyCode === 37) {         // left arrow
            moveLeft()
        } else if (e.keyCode === 39) {  // right arrow
            moveRight()
        } else if (e.keyCode === 38) {  // up arrow
            rotate()
        } else if (e.keyCode === 40) {  // down arrow
            moveDown()
        }
    }

    // move tetrolino left until edge of screen
    function moveLeft() {
        undraw();
        const isAtLeftEdge = currentTetrolino.some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) currentPosition -= 1;
        if (currentTetrolino.some(index => squaresFromGrid[currentPosition + index].classList.contains('solid'))) {
            currentPosition += 1;
        }
        draw();
    }

    // move tetrolino right until edge of screen
    function moveRight() {
        undraw();
        const isAtRightEdge = currentTetrolino.some(index => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge) currentPosition += 1;
        if (currentTetrolino.some(index => squaresFromGrid[currentPosition + index].classList.contains('solid'))) {
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
        currentRotation++;          // advance to the next rotation
        if (currentRotation === currentTetrolino.length) {
            currentRotation = 0;    // reset index to zero (first rotation)
        }
        currentTetrolino = selectedTetrolino[currentRotation];
        draw();
    }

    // main game loop
    function mainGameLoop() {
        advanceTetrolinoDownward();
    }

    ///////////////////////////////////////////////////////////////////////////////
    // INITIALIZING VARIABLES AND FUNCTIONS

    // init grid
    const grid = document.querySelector('.grid');
    setUpGrid(200);
    let squaresFromGrid = Array.from(document.querySelectorAll('.grid div'));

    // ui
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10

    // adding listeners
    document.addEventListener('keyup', getUserInput)

    // set starting position
    startingPosition = 4;
    currentPosition = startingPosition;
    selectRandomTetrolino();

    // set time interval to one second
    let timer = 500;
    // run game loop
    setInterval(mainGameLoop, timer);

})
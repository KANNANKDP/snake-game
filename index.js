const grid = document.querySelector("#grid");
const scoreBoard = document.querySelector('#score');
const startButton = document.getElementsByClassName('button');
const gameOver = document.querySelector('#game-over');
const width = 10;
let score = 0;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let timeInterval = 1000;
let appleIndex = 0;
let timerId = 0;

function createGrid() {
    for (let i = 0; i < 100; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        squares.push(square);
        grid.appendChild(square);
    }
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    createApple();
}
createGrid();

function move() {
    let currentHead = currentSnake[0];
    if (
        (currentHead + width >= 100 && direction === width) ||
        (currentHead % width === width - 1 && direction === 1) ||
        (currentHead % width === 0 && direction === -1) ||
        (currentHead - width < 0 && direction === -width) ||
        squares[currentHead + direction].classList.contains('snake')
    ){
        gameOver.style.display = 'block';
        return clearInterval(timerId);
    }
    let tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    let newHead = currentHead + direction;
    squares[newHead].classList.add('snake');
    currentSnake.unshift(newHead);
    
    if (squares[newHead].classList.contains('apple')) {
        squares[newHead].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        score++;
        scoreBoard.textContent = score;
        createApple();
        timeInterval *= 0.9;
        setNewSpeed();
    }
}

function setNewSpeed() {
    clearInterval(timerId);
    timerId = setInterval(move, timeInterval);    
}

function changeDirection(e) {
    if (e.keyCode == 38) {
        direction = -width;
    } else if (e.keyCode == 39) {
        direction = +1;
    } else if (e.keyCode == 37) {
        direction = -1;
    } else if (e.keyCode == 40) {
        direction = +width;
    }
}

document.addEventListener('keydown', changeDirection);

function createApple() {
    do {
        appleIndex = Math.floor(Math.random() * 100);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    currentSnake = [2, 1, 0];
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    score = 0;
    scoreBoard.textContent = score;
    direction = 1;
    timeInterval = 1000;
    gameOver.style.display = 'none';
    clearInterval(timerId);
    timerId = setInterval(move, timeInterval);
}

startButton[0].addEventListener('click', startGame);
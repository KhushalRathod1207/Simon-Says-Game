let gameSeq = [];
let userSeq = [];
let colors = ["red", "yellow", "green", "blue"];
let started = false;
let level = 0;
let highScore = 0;

// Selectors
const levelTitle = document.getElementById("level-title");
const highScoreDisplay = document.getElementById("high-score");
const buttons = document.querySelectorAll(".box");

// Start Game
document.addEventListener("keypress", () => {
    if (!started) {
        started = true;
        nextLevel();
    }
});

// Button Flash
function flash(button) {
    button.classList.add("btn-flash");
    setTimeout(() => button.classList.remove("btn-flash"), 600);
}

// User Click Effect
function userClick(button) {
    button.classList.add("user-flash");
    setTimeout(() => button.classList.remove("user-flash"), 300);
}

// Next Level
function nextLevel() {
    userSeq = [];
    level++;
    levelTitle.innerText = `Level ${level}`;
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSeq.push(randomColor);

    setTimeout(() => {
        const button = document.getElementById(randomColor);
        flash(button);
    }, 500);
}

// Check Answer
function checkAnswer(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(nextLevel, 1000);
        }
    } else {
        gameOver();
    }
}

// Game Over
function gameOver() {
    levelTitle.innerHTML = `Game Over! <br> Your score: ${level} <br> Press any key to restart.`;
    document.body.style.backgroundColor = "#e74c3c";
    setTimeout(() => (document.body.style.backgroundColor = ""), 500);
    updateHighScore();
    resetGame();
}

// Update High Score
function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        highScoreDisplay.innerText = `High Score: ${highScore}`;
    }
}

// Reset Game
function resetGame() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}

// Handle Button Click
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.id;
        userSeq.push(color);
        userClick(button);
        checkAnswer(userSeq.length - 1);
    });
});
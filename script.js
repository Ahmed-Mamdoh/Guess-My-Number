'use strict';

// Generate a random number between 1 and 100
let number = Math.trunc(Math.random() * 20) + 1;

// Store initial DOM values
let message = document.querySelector('.message').textContent;
let numberWidth = document.querySelector('.number').style.width;
let backgroundColor = document.querySelector('body').style.backgroundColor;

// Get initial score from DOM
let initScore = Number(document.querySelector('.score').textContent);
let score = Number(document.querySelector('.score').textContent);

// Reset game when 'Again' button is clicked
document.querySelector('.again').addEventListener('click', function () {
  // Generate new random number
  number = Math.trunc(Math.random() * 20) + 1;

  // Reset UI elements to initial state
  document.querySelector('.message').textContent = message;
  document.querySelector('body').style.backgroundColor = backgroundColor;
  document.querySelector('.number').style.width = numberWidth;

  // Reset score
  score = initScore;
  document.querySelector('.score').textContent = initScore;

  // Clear input and number display
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';

  // Re-enable input and check button
  document.querySelector('.check').disabled = false;
  document.querySelector('.guess').disabled = false;
});

// Add click event listener to check button
document.querySelector('.check').addEventListener('click', function () {
  // Get user's guess and convert to number
  let guess = Number(document.querySelector('.guess').value);

  // Check if guess is empty
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No Number provided!';
  }

  // Check if guess is too high
  else if (guess > number) {
    document.querySelector('.message').textContent = '📈 Too High!';
    // Decrease score but don't go below 0
    score = Math.max(score - 1, 0);
  }

  // Check if guess is too low
  else if (guess < number) {
    document.querySelector('.message').textContent = '📉 Too Low!';
    // Decrease score but don't go below 0
    score = Math.max(score - 1, 0);
  }

  // Handle correct guess
  else {
    let highScore = document.querySelector('.highscore').textContent;

    // Update UI for winning state
    document.querySelector('.message').textContent = '🎉 Correct Number!';
    document.querySelector('.number').textContent = number;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // Update high score if current score is higher
    document.querySelector('.highscore').textContent = Math.max(
      highScore,
      score
    );

    // Stop game after winning
    document.querySelector('.check').disabled = true;
    document.querySelector('.guess').disabled = true;
  }

  // Update score display
  document.querySelector('.score').textContent = score;

  // Check for game over
  if (score == 0) {
    document.querySelector('.message').textContent = '😭 you have lost!';
    document.querySelector('.guess').disabled = true;
  }
});

// Add keydown event listener to guess input field
document.querySelector('.guess').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    document.querySelector('.check').click();
  }
});

document.querySelector('.guess').addEventListener('input', function () {
  if (this.value < 1) {
    this.value = 1;
  }
  if (this.value > 20) {
    this.value = 20;
  }
});

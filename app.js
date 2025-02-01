fetch('https://api.quizdata.com/questions')
  .then(response => response.json())
  .then(data => {
    // Store the quiz data in a state or variable
    const quizData = data.questions;
    startQuiz(quizData);
  })
  .catch(error => console.log(error));

  function showQuestion(questionIndex) {
    const currentQuestion = quizData[questionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const answers = currentQuestion.answers;
    answers.forEach((answer, index) => {
      document.getElementById(`answer${index}`).textContent = answer;
    });
  }

  function handleAnswer(selectedAnswer, correctAnswer, currentQuestionIndex) {
    if (selectedAnswer === correctAnswer) {
      updateScore();
      showCorrectFeedback();
    } else {
      showIncorrectFeedback();
    }
    setTimeout(() => {
      showQuestion(currentQuestionIndex + 1);  // Show next question
    }, 1000); // Wait 1 second before going to next question
  }

  let score = 0;
let streak = 0;

function updateScore() {
  score += 10;
  streak++;
  if (streak % 3 === 0) {
    score += 5;  // Bonus points for streaks
  }
  document.getElementById('score').textContent = `Score: ${score}`;
}


function endGame() {
    alert(`Game Over! Your score: ${score}`);
    // Optionally, you could add a leaderboard system
  }

  let timer = 30;  // seconds
setInterval(function() {
  document.getElementById('timer').textContent = `Time Left: ${timer}s`;
  if (timer > 0) {
    timer--;
  }
}, 1000);
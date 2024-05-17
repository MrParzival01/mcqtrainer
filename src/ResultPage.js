import React from 'react';

function ResultPage({ quizResult, handleRestartQuiz }) {
  return (
    <div className="quiz-result-container">
  <h2>Quiz Result</h2>
  <p className="score">{`Score: ${quizResult.score}`}</p>
  <p>{`Total Time: ${quizResult.totalTime}`}</p>
  <div className="questions-container">
    <h3>User Answers:</h3>
    {quizResult.questions.map((question, index) => (
      <div key={index} className="question">
        <p>{`Question ${index + 1}: ${question.question}`}</p>
        <p className="user-answer">{`Your Answer: ${quizResult.userAnswers[index]}`}</p>
        <p className="correct-answer">{`Correct Answer: ${question.correct_answer}`}</p>
      </div>
    ))}
  </div>
  <div className="buttons-container">
    <button onClick={handleRestartQuiz}>Restart Quiz</button>
  </div>
</div>

  );
}

export default ResultPage;

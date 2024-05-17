import { useState, useEffect } from 'react';

function QuizPage({ questions = [], timeLimit = 0, setQuizCompleted, setQuizResult }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [timer, setTimer] = useState(timeLimit);
  const [timerId, setTimerId] = useState(null);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    let id = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime <= 0) {
          clearInterval(id);
          setTimerExpired(true);
          handleQuizSubmit(); // controls the timers
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimerId(id);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (userAnswers.every(answer => answer !== '')) {
      setAllQuestionsAnswered(true);
    } else {
      setAllQuestionsAnswered(false);
    }
  }, [userAnswers]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleAnswerChange = (e) => {
    const index = currentQuestionIndex;
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = e.target.value;
    setUserAnswers(updatedAnswers);
  };

  const handleQuizSubmit = (e) => {
    if (e) e.preventDefault();
    clearInterval(timerId);

    const initialTimeLimit = timeLimit;
    const remainingTime = timer;
    const totalTime = initialTimeLimit - remainingTime;

    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      // If the question is answered correctly
      if (userAnswers[i] === questions[i].correct_answer) {
        score++;
      }
    }

    setQuizCompleted(true);
    setQuizResult({
      score: `${score}/${questions.length}`,
      totalTime: `${totalTime}s`, // Use totalTime instead of timeLimit - timer
      userAnswers,
      questions,
    });
  };
  useEffect(() => {
    if (timerExpired) {
      handleQuizSubmit(); // it auto-submits when the timer expires
    }
  }, [timerExpired]);

  return (
    <div className="quiz-container">
      <h2>Quiz</h2>
      <br />
      <p>{`Category: ${questions[currentQuestionIndex]?.category || ''}`}</p>
      <p>{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
      <p className="timer">{`Time Left: ${timer}s`}</p>
      <p className="question">{questions[currentQuestionIndex]?.question || ''}</p>
      <form onSubmit={handleQuizSubmit}>
        <div className="options-container">
          {questions[currentQuestionIndex]?.options?.map((option, index) => (
            <div className="option" key={index}>
              <input
                type="radio"
                id={option}
                name="answer"
                value={option}
                checked={userAnswers[currentQuestionIndex] === option}
                onChange={handleAnswerChange}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
        <div className="buttons-container">
          <button type="button" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
          {(currentQuestionIndex === questions.length - 1) && (
            <button type="submit">{allQuestionsAnswered ? 'Submit Quiz' : 'Finish'}</button>
          )}
          {(currentQuestionIndex !== questions.length - 1) && (
            <button type="button" onClick={handleNextQuestion}>Next</button>
          )}
        </div>
      </form>
      {timerExpired && (
        <p>Time's up! Your quiz has been automatically submitted.</p>
      )}
    </div>
  );
}

export default QuizPage;

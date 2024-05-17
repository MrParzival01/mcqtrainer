import  { useState, useEffect } from 'react';
import WelcomePage from './WelcomePage';
import CategorySelection from './CategorySelection';
import QuizPage from './QuizPage';
import ResultPage from './ResultPage';
import questionBank from './questionBank.json';
import './App.css';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [selectedCategory, setSelectedCategory] =useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] =useState(false);
  const [quizResult, setQuizResult] = useState({});
  const [questions, setQuestions] = useState([]);
  const [timeLimit, setTimeLimit] = useState(0);

  const flattenQuestions = (jsonData) => {
    const flattenedQuestions = jsonData.categories.flatMap(category => category.questions);
    return flattenedQuestions;
  };

  const shuffleQuestions = (array) => {
    const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
    return shuffledArray;
  };

  const handleStartQuiz = (category, difficulty) => {
    setSelectedCategory(category);
    setTimeLimit(difficulty === 'easy' ? 600 : difficulty === 'medium' ? 300 : 120); // Converted minutes to seconds hard=120s, medium=300s, easy=600s
    setQuizStarted(true);
  };

  const handleRestartQuiz = () => {
    setQuizCompleted(false);
    setQuizResult({});
    setQuizStarted(false);
    setSelectedCategory('');
    setQuestions([]);
  };

  useEffect(() => {
    if (selectedCategory) {
      const filteredQuestions = flattenQuestions(questionBank).filter(question => question.category === selectedCategory);
      const shuffledQuestions = shuffleQuestions(filteredQuestions).slice(0, 5); // Selecting first 5 shuffled questions
      setQuestions(shuffledQuestions);
    }
  }, [selectedCategory]);

  return (
    <div className="App">
      {!userEmail && <WelcomePage setUserEmail={setUserEmail} />}
      {userEmail && !quizStarted && (
        <CategorySelection handleStartQuiz={handleStartQuiz} />
      )}
      {quizStarted && !quizCompleted && (
        <QuizPage
          questions={questions}
          timeLimit={timeLimit}
          setQuizCompleted={setQuizCompleted}
          setQuizResult={setQuizResult}
        />
      )}
      {quizCompleted && (
        <ResultPage
          quizResult={quizResult}
          handleRestartQuiz={handleRestartQuiz}
        />
      )}
    </div>
  );
}

export default App;

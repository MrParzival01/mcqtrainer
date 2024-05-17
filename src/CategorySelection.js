import React from 'react';
import questionBank from './questionBank.json';


function CategorySelection({ handleStartQuiz }) {
  const [category, setCategory] = React.useState('');

  const handleStartQuizClick = (difficulty) => {
    if (category) {
      handleStartQuiz(category, difficulty);
    }
  };

  return (
    <div>
      <h2>Select Category</h2>
      <label>
        Category:
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {questionBank.categories.map(category => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </select>
      </label>
      <div>
        <button onClick={() => handleStartQuizClick('easy')}>Start Easy Quiz</button>
        <button onClick={() => handleStartQuizClick('medium')}>Start Medium Quiz</button>
        <button onClick={() => handleStartQuizClick('hard')}>Start Hard Quiz</button>
      </div>
    </div>
  );
}

export default CategorySelection;

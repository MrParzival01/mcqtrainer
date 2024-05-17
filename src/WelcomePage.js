import React from 'react';

function WelcomePage({ setUserEmail }) {
  const [email, setEmail] = React.useState('');
  const [isValidEmail, setIsValidEmail] = React.useState(false);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    // Validate email using a simple regex pattern
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail));
  };

  const handleStartQuiz = () => {
    if (isValidEmail) {
      setUserEmail(email);
    }
  };

  return (
    <div>
      <h1>Welcome To Your Daily Dose Of Quiz</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      <button class = 'ft' onClick={handleStartQuiz} disabled={!isValidEmail}>Start Quiz</button>
      {!isValidEmail && <p>Please enter a valid email address.</p>}
    </div>
  );
}

export default WelcomePage;

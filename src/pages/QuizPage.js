import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuiz } from '../services/api';

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const getQuiz = async () => {
      const quiz = await fetchQuiz(id);
      setQuiz(quiz);
    };

    getQuiz();
  }, [id]);

  return (
    <div className="p-4">
      {quiz ? (
        <div>
          <h2 className="text-xl font-bold">{quiz.title}</h2>
          {/* Render quiz questions here */}
        </div>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default QuizPage;
import { createContext, useContext, useState } from "react";

// Create context
const QuizContext = createContext();

// Custom hook for consuming the context
export const useQuiz = () => {
  return useContext(QuizContext);
};

// Provider component
export const QuizProvider = ({ children }) => {
  const [quizState, setQuizState] = useState({});

  // Function to update quiz state
  const updateQuiz = (newData) => {
    setQuizState((prev) => ({ ...prev, ...newData }));
  };

  return (
    <QuizContext.Provider value={{ quizState, updateQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

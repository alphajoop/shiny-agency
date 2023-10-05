import React, { useState, createContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Sauvegarde dans le localStorage
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});
  const saveAnswers = (newAnswers) => {
    setAnswers({ ...answers, ...newAnswers });
  };

  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  );
};

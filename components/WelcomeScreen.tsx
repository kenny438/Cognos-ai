
import React from 'react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <h1 className="text-5xl font-bold text-gray-800 tracking-tight">Introducing Cognos AI</h1>
      <p className="mt-4 max-w-lg text-lg text-gray-600">
        Our smartest, fastest, most useful model yet, with thinking built in — so you get the best answer, every time.
      </p>
    </div>
  );
};

export default WelcomeScreen;

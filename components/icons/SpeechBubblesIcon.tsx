import React from 'react';

const SpeechBubblesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22a10 10 0 0 0 8.49-4.51" />
    <path d="M12 2a10 10 0 0 0-8.49 4.51" />
    <path d="M2.51 12a10 10 0 0 1 4.49-8.49" />
    <path d="M17 19.51a10 10 0 0 1-14.5 0" />
  </svg>
);

export default SpeechBubblesIcon;
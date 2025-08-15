import React from 'react';

const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 1 1 1 1 0 0 1 1 1.5 1 1 0 0 0 1 1h.5a2.5 2.5 0 0 1 2.5 2.5 1 1 0 0 0 1 1 1 1 0 0 1 .5 1.5 1 1 0 0 0 0 1 2.5 2.5 0 0 1-2.5 2.5h-1a1 1 0 0 0-1 1 1 1 0 0 1-1.5 1 1 1 0 0 0-1 1v1.2A2.5 2.5 0 0 1 9.5 22a1 1 0 0 1-1.5-.5 1 1 0 0 0-1-1h-1a2.5 2.5 0 0 1-2.5-2.5 1 1 0 0 0-1-1 1 1 0 0 1-.5-1.5 1 1 0 0 0 0-1A2.5 2.5 0 0 1 4.5 12h.5a1 1 0 0 0 1-1 1 1 0 0 1 1.5-1 1 1 0 0 0 1-1V4.5A2.5 2.5 0 0 1 9.5 2z" />
  </svg>
);

export default BrainIcon;
import React from 'react';

const EighteenPlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14h2v-4H8v4zm4-4h2a2 2 0 1 1 0 4h-2v-4z" />
    <path d="M15 12h1" />
  </svg>
);

export default EighteenPlusIcon;
import React from 'react';

const ComedianIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 2a10 10 0 0 0-10 10c0 3.3 1.7 6.2 4.2 8" />
    <path d="M12 22a10 10 0 0 0 10-10c0-3.3-1.7-6.2-4.2-8" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <path d="M9 9h.01" />
    <path d="M15 9h.01" />
  </svg>
);

export default ComedianIcon;

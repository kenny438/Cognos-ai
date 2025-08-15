
import React from 'react';

const CarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M14 16.5V18a1.5 1.5 0 0 1-3 0v-1.5m3 0h-3m-3.5-3H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2h-1.5m-3 0h3m-3 0H9m-2 0H5"></path>
    <path d="M7 9h10"></path>
    <circle cx="8" cy="16" r="1"></circle>
    <circle cx="16" cy="16" r="1"></circle>
  </svg>
);

export default CarIcon;

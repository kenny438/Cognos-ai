
import React from 'react';

const CardsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M6 5.5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1.5" />
    <path d="M10 3.5V2" />
  </svg>
);

export default CardsIcon;

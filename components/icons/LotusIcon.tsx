import React from 'react';

const LotusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 2c-3 0-5 2.5-5 5s2 5 5 5 5-2.5 5-5-2-5-5-5z" />
    <path d="M20 16c-4 0-6-4-6-4s-2 4-6 4" />
    <path d="M4 16c4 0 6-4 6-4s2 4 6 4" />
    <path d="M12 12v10" />
  </svg>
);

export default LotusIcon;
import React from 'react';

const FireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 2c-4.5 5-2.5 12.5 0 15 2.5-2.5 4.5-10 0-15zm0 15c-3.5 3.5-7.5 4-10 2s2-6.5 2-10c0-3.5-1-7.5-3-9.5 2.5 2.5 5 9 5 12.5 0 3.5 1.5 6.5 4 8 .5-2 0-4-2-6-2.5-2.5-4-6.5-4-9.5 2.5 2.5 5 8 5 11.5 0 3.5 1.5 6.5 4 8z" />
    <path d="M18 12c0 5-5 10-10 10" />
  </svg>
);

export default FireIcon;
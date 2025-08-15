import React from 'react';

const HotelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M2 22s5.27-2 10-2 10 2 10 2H2z"></path>
    <path d="M14 9V5a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v4"></path>
    <path d="M3 11h18v11H3z"></path>
    <path d="M12 16h.01"></path>
  </svg>
);

export default HotelIcon;
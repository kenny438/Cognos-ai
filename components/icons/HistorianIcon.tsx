import React from 'react';

const HistorianIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6" />
    <path d="M4 11.5a2.5 2.5 0 0 1 0-5" />
    <path d="M20 11.5a2.5 2.5 0 0 0 0-5" />
    <path d="M4 6V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
  </svg>
);

export default HistorianIcon;

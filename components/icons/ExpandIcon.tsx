import React from 'react';

const ExpandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M3 7V3h4M21 7V3h-4M3 17v4h4M21 17v4h-4" />
  </svg>
);

export default ExpandIcon;

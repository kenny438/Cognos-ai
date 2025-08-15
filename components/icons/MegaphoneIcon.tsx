import React from 'react';

const MegaphoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="m3 11 18-5v12L3 13V11z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.2-3.2" />
  </svg>
);

export default MegaphoneIcon;
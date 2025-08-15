
import React from 'react';

const BinaryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M6 10h2v10H6zm6-4h2v14h-2z" />
    <path d="M14 6h2v6h-2zm-8 2h2v6H6z" />
    <path d="M10 14h2v2h-2zm4-10h2v2h-2z" />
  </svg>
);

export default BinaryIcon;

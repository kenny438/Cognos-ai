import React from 'react';

const QuillIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M4 20h4L18.5 9.5a2.828 2.828 0 0 0-4-4L4 16v4z" />
    <path d="m13.5 6.5 4 4" />
    <path d="m5 15-1 4" />
  </svg>
);

export default QuillIcon;

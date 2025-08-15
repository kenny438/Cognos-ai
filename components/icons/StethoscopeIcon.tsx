import React from 'react';

const StethoscopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M4.5 10.5c-3.3 0-6-2.7-6-6v-3h3v3c0 1.7 1.3 3 3 3h3c1.7 0 3-1.3 3-3v-3h3v3c0 3.3-2.7 6-6 6h-3zM21 10.5c0-3.3-2.7-6-6-6v-3h3v3c0 1.7 1.3 3 3 3h3c1.7 0 3-1.3 3-3v-3h3v3c0 3.3-2.7 6-6 6h-3z" />
    <path d="M7.5 13.5v6c0 1.7-1.3 3-3 3h-1.5c-.8 0-1.5-.7-1.5-1.5v-3c0-.8.7-1.5 1.5-1.5H6c1.7 0 1.5-1.5 1.5-1.5z" />
    <path d="M16.5 13.5v6c0 1.7 1.3 3 3 3h1.5c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5H18c-1.7 0-1.5-1.5-1.5-1.5z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default StethoscopeIcon;
import React from 'react';

const ScreenShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"/>
    <path d="M8 21h8"/>
    <path d="M12 17v4"/>
    <path d="M17 8l5-5"/>
    <path d="M22 8h-5V3"/>
  </svg>
);

export default ScreenShareIcon;

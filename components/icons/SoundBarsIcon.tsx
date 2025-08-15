import React from 'react';

const SoundBarsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M3 10v4" />
    <path d="M8 7v10" />
    <path d="M13 4v16" />
    <path d="M18 7v10" />
    <path d="M21 10v4" />
  </svg>
);

export default SoundBarsIcon;

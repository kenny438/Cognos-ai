
import React from 'react';

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.09 16.05A6.49 6.49 0 0 1 12 18a6.5 6.5 0 0 1-3.09-1.95" />
    <path d="M9 12a6.49 6.49 0 0 1 1.95-3.09A6.5 6.5 0 0 1 12 6a6.5 6.5 0 0 1 3.09 1.95" />
    <path d="M12 2v4" />
    <path d="m4.93 4.93 2.83 2.83" />
    <path d="M16.24 7.76l2.83-2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="m4.93 19.07 2.83-2.83" />
    <path d="m16.24 16.24 2.83 2.83" />
  </svg>
);

export default LightbulbIcon;


import React from 'react';

const TelescopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 21 6-6" />
    <path d="m8 13-1.5 1.5" />
    <path d="M12.5 9.5 11 11" />
    <path d="M17 5 3 19" />
    <path d="m14 9-2 2" />
    <path d="M20 8 16 4" />
    <path d="M21 3 17 7" />
  </svg>
);

export default TelescopeIcon;

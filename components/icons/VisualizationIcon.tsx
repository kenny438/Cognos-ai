
import React from 'react';

const VisualizationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M4 20V10" />
    <path d="M10 20V4" />
    <path d="M16 20V14" />
    <path d="M22 20V2" />
  </svg>
);

export default VisualizationIcon;
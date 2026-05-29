import React from 'react';

export default function SectionSeparator({ color = 'fill-[#030014] dark:fill-[#030014]', flip = false }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px]"
      >
        <path
          d="M0,96 C150,112 280,72 400,80 C520,88 620,104 750,96 C880,88 1010,72 1200,96 L1200,120 L0,120 Z"
          className={color}
          style={{ opacity: 0.8 }}
        ></path>
        <path
          d="M0,64 C180,80 320,48 480,64 C640,80 800,48 960,64 C1080,72 1140,56 1200,64 L1200,120 L0,120 Z"
          className={color}
          style={{ opacity: 0.4 }}
        ></path>
        <path
          d="M0,32 C200,48 400,16 600,32 C800,48 1000,16 1200,32 L1200,120 L0,120 Z"
          className={color}
          style={{ opacity: 0.15 }}
        ></path>
      </svg>
    </div>
  );
}

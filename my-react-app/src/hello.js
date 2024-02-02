// This is hello.js
import React, { useEffect, useRef } from 'react';
import gsap, { SteppedEase } from 'gsap';
import "./hello.css";

const HelloAnimation = () => {
  const characterRef = useRef(null);
  const fps = 8;
  const totalFrames = 12;
  const dur = (1 / fps) * (totalFrames - 1);
  const spriteWidth = 6780;

  useEffect(() => {
    const animation = gsap.to(characterRef.current, {
      duration: dur,
      repeat: -1,
      backgroundPosition: `-${spriteWidth}px`,
      ease: SteppedEase.config(totalFrames),
    });

    
    return () => animation.kill();
  }, [dur, spriteWidth]);

  return (
    <div ref={characterRef} className="character">
      {/* Your sprite content goes here */}
    </div>
  );
};

export default HelloAnimation;
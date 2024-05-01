import React, { useEffect, useRef } from 'react';
import gsap, { SteppedEase } from 'gsap';
import "./nodding.css";

const NoddingAnimation = () => {
  const characterRef = useRef(null);
  const fps = 6;
  const totalFrames = 7;
  const dur = (1 / fps) * (totalFrames - 1);
  const spriteWidth = 4000;
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
    <div ref={characterRef} className="noddingcharacter">
      {/* Your sprite content goes here */}
    </div>
  );
};

export default NoddingAnimation;
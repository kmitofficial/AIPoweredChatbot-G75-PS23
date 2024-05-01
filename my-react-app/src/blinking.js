import React, { useEffect, useRef } from 'react';
import gsap, { SteppedEase } from 'gsap';
import "./blinking.css";

const BlinkingAnimation = () => {
  const characterRef = useRef(null);
  const fps = 10;
  const totalFrames = 11;
  const dur = (1 / fps) * (totalFrames - 1);
  const spriteWidth = 7207;
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
    <div ref={characterRef} className="blinkingcharacter">
      {/* Your sprite content goes here */}
    </div>
  );
};

export default BlinkingAnimation;
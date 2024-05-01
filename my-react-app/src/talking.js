import React, { useEffect, useRef } from 'react';
import gsap, { SteppedEase } from 'gsap';
import "./talking.css";

const TalkingAnimation = () => {
  const characterRef = useRef(null);
  const fps = 9;
  const totalFrames = 21;
  const dur = (1 / fps) * (totalFrames - 1);
  const spriteWidth = 13788;
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
    <div ref={characterRef} className="talkingcharacter">
      {/* Your sprite content goes here */}
    </div>
  );
};

export default TalkingAnimation;
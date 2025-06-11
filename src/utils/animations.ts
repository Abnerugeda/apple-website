import * as THREE from "three";
import React from "react";

export const animateWithGsapTimeline = (
  timeline: GSAPTimeline,
  rotationRef: React.RefObject<THREE.Group>,
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  options: { transform: string; duration: number }
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...options,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    secondTarget,
    {
      ...options,
      ease: "power2.inOut",
    },
    "<"
  );
};

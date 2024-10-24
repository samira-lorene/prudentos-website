"use client";
import { Staatliches } from "next/font/google";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
const staatliches = Staatliches({
  weight: "400",
  subsets: ["latin"],
});
gsap.registerPlugin(useGSAP, Flip);

export default function PreLoad() {
  // TODO: maybe disable scrolling when this is active

  const backgroundRef = useRef(null);
  const textRef = useRef(null);

  const setInitialStates = () => {
    gsap.set(textRef.current, {
      yPercent: 100,
    });
  };

  useGSAP(() => {
    // TODO: fix fouc
    const master = gsap.timeline();
    master.add(setInitialStates);
  });

  return (
    <div className="preloader">
      <p className="preloader__text">
        <span
          ref={textRef}
          className={`${staatliches.className} 
            font-bold text-[15vw] 
          sm:text-[8vw] md:text-[5vw]
          tracking-wide
           uppercase
            `}
        >
          PRUDENTOS
        </span>
      </p>
      <div ref={backgroundRef} className="preloader__background"></div>
    </div>
  );
}

"use client";
import { Staatliches } from "next/font/google";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
const staatliches = Staatliches({
  weight: "400",
  subsets: ["latin"],
});
gsap.registerPlugin(useGSAP, Flip);

export default function PreLoad() {
  const backgroundRef = useRef(null);
  const textRef = useRef(null);

  const setInitialStates = () => {
    gsap.set(textRef.current, {
      yPercent: 100,
    });
  };

  const preloaderAnimation = () => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });
    tl.to(textRef.current, {
      opacity: 1,
      duration: 0,
    })
      .to(
        textRef.current,
        {
          yPercent: 0,
          delay: 0.2,
        },
        "<"
      )
      .to(textRef.current, {
        yPercent: -105,
        delay: 1,
      })
      .to(
        backgroundRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
        },
        // "-=0.3"
        "<"
      );

    return tl;
  };
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  useGSAP(() => {
    if (!sessionStorage.getItem("preloaderPlayed")) {
      const master = gsap.timeline();
      master.add(setInitialStates).add(preloaderAnimation());
      sessionStorage.setItem("preloaderPlayed", "true");
    } else {
      setAlreadyPlayed(true);
    }
  }, []);

  return (
    <>
      {/* {alreadyPlayed && ( */}
      <div style={{ opacity: alreadyPlayed ? 0 : 1 }} className="preloader">
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
      {/* )} */}
    </>
  );
}

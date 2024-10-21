import Link from "next/link";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

export default function FlipLink({
  children,
  href,
}: {
  children: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <motion.div
        initial="initial"
        whileHover="hovered"
        style={{ lineHeight: "0.8" }}
        // inline-flex allows the container to only take up the width of the content, not the full width of the parent.
        className="relative overflow-hidden whitespace-nowrap text-xs font-light opacity-50 hover:opacity-100"
      >
        <div className="">
          {children.split("").map((l, i) => {
            return (
              <motion.span
                variants={{
                  initial: { y: 0 },
                  hovered: { y: "-100%" }, // this will fully transform the element off of the bottom of the element
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
                className="inline-block"
                key={i}
              >
                {l === " " ? <span>&nbsp;</span> : l}
              </motion.span>
            );
          })}
        </div>
        <div className="absolute inset-0">
          {children.split("").map((l, i) => {
            return (
              <motion.span
                variants={{
                  initial: { y: "100%" },
                  hovered: { y: 0 }, // this will fully transform the element off of the bottom of the element
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
                className="inline-block"
                key={i}
              >
                {l === " " ? <span>&nbsp;</span> : l}
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </Link>
  );
}

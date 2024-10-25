"use client";
import { motion } from "framer-motion";
import { ChatBubbleIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
type menuProps = {
  open: boolean;
  headerHeight?: number;
  setOpenMenu: any;
};
export default function Menu({ setOpenMenu, open, headerHeight }: menuProps) {
  const fadeInVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 * (index + 1),
        duration: 0.35,
      },
    }),
  };
  const links = {
    Home: "/",
    // Collection: "/",
    About: "/about",
    Contact: "/contact",
    Privacy: "/privacy",
  };

  const footerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: () => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: (Object.keys(links).length - 1) * 0.15,
        duration: 0.35,
      },
    }),
  };

  const router = useRouter();

  const handleLinkClick = (link: any) => {
    // console.log("link", link);
    setOpenMenu(false);
    router.push(link);
  };

  return (
    <div
      style={{ top: `${headerHeight}px` }}
      className={` ${open ? "block" : "hidden"}
flex flex-col z-50 fixed w-full bottom-0 bg-white justify-between`}
    >
      <div className={`h-[1px] fixed bg-[#a4a4a4] w-full`} />
      <div className="flex flex-col">
        {Object.keys(links).map((link, index) => (
          <motion.div
            key={link}
            whileInView="animate"
            variants={fadeInVariants}
            initial="initial"
            className="menuLink cursor-pointer"
            custom={index}
            onClick={() => handleLinkClick(links[link as keyof typeof links])}
          >
            {link}
          </motion.div>
        ))}
      </div>
      {/* Menu Footer */}
      <motion.div
        initial="initial"
        variants={footerVariants}
        whileInView={"animate"}
        className="text-xs gap-8 p-4 pb-6 flex flex-col"
      >
        {/* <div className="flex cursor-pointer gap-6 items-center">
          <div className="mr-2 aspect-square  h-2 grid place-items-center bg-black rounded-full text-white"></div>
          <span>Cart</span>
        </div> */}
        <a
          href="https://www.instagram.com/samira_prudentos/"
          target="_blank"
          className="flex gap-6 items-center cursor-pointer"
          onClick={() => setOpenMenu(false)}
        >
          <div className="">
            <InstagramLogoIcon />
          </div>
          <span>Instagram</span>
        </a>
        <a
          href="mailto:samira.prudentos@web.de"
          className="flex cursor-pointer gap-6 items-center"
        >
          <div className="">
            <ChatBubbleIcon />
          </div>
          <span>Contact</span>
        </a>
        <div className="flex gap-6 items-center">
          <span className="tracking-tighter">© PRUDENTOS 2024</span>
          {/* <a href="/privacy" className="cursor-pointer">
            Privacy Declaration
          </a> */}
        </div>
      </motion.div>
    </div>
  );
}

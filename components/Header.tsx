"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FlipLink from "./FlipLink";
import { PiHeartThin, PiHeartFill } from "react-icons/pi";
import FavoritesModal from "./FavoritesModal";
import CartModal from "./CartModal";
import useStore from "@/app/(store)/store";
import { useMediaQuery } from 'react-responsive'
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Menu from "./Menu";
import { Cross1Icon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { Staatliches } from "next/font/google";

const staatliches = Staatliches({
  weight: "400",
  subsets: ["latin"],
});
export default function Header() {
  const pathname = usePathname();
  const onAboutOrContactPage =
    pathname.includes("/about") || pathname.includes("/contact");

  const [isHovered, setIsHovered] = useState(false);

  const numberOfCartItems = useStore((state: any) => state.numberOfCartItems);
  const favorites = useStore((state: any) => state.favorites);

  const openCartModalStatus = useStore(
    (state: any) => state.openCartModalStatus
  );

  const isLargeDevice = useMediaQuery({ query: '(min-width: 768px)' })


  // menu for mobile screens
  const [openMenu, setOpenMenu] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  const openFavoritesModalStatus = useStore(
    (state: any) => state.openFavoritesModalStatus
  );

  const setOpenCartModal = useStore((state: any) => state.setOpenCartModal);
  const setOpenFavoritesModal = useStore(
    (state: any) => state.setOpenFavoritesModal
  );

  // to prevent body from scrolling when modal is open
  useEffect(() => {
    if (openCartModalStatus || openFavoritesModalStatus || openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    if (headerRef.current) {
      // Get the height of the header and store it in state
      const height = headerRef?.current?.offsetHeight;
      setHeaderHeight(height);
    }
  }, [openCartModalStatus, openFavoritesModalStatus, openMenu]);

  // Hide Navigation on Page Scroll Functionality
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      style={{ zIndex: 1000 }}
      variants={{
        visible: { y: 0 }, // y is yTranslate in css
        hidden: { y: "-100%" },
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      animate={!isLargeDevice && (hidden ? "hidden" : "visible")}
      onMouseLeave={() => setIsHovered(false)}
      className={`top-0 fixed w-screen ${
        !pathname.includes("/products") ? "sm:sticky" : ""
      } z-50 
       ${
         isHovered && !onAboutOrContactPage
           ? "md:bg-white"
           : "md:bg-transparent"
       } 
       ${
         pathname.includes("/products") || onAboutOrContactPage
           ? "bg-transparent"
           : "bg-white"
       }
       `}
    >
      <FavoritesModal
        openModal={openFavoritesModalStatus}
        closeModal={setOpenFavoritesModal}
      />
      <CartModal
        openModal={openCartModalStatus}
        closeModal={setOpenCartModal}
      />
      {/* Backdrop */}
      {(openFavoritesModalStatus || openCartModalStatus) && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-white opacity-65 z-20"
          onClick={
            openFavoritesModalStatus === true
              ? setOpenFavoritesModal
              : setOpenCartModal
          }
        />
      )}
      <div
        ref={headerRef}
        style={{
          color: onAboutOrContactPage ? "white" : "",
          backgroundColor: openMenu ? "white" : "",
        }}
        className="flex items-center w-full p-3 px-5 pr-8 sm:p-4 sm:px-5 sm:pr-8 justify-between"
      >
        <Link
          href={"/"}
          style={{ color: openMenu ? "black" : "" }}
          className={`${staatliches.className} cursor-pointer font-bold text-[8vw] sm:text-[6vw] md:text-[3vw] tracking-wide uppercase`}
        >
          Prudentos
        </Link>
        {/* Mobile Screens: */}
        <button
          className={`${
            openMenu ? "block" : "hidden"
            //  hover:rotate-90 for a animation
          } fixed right-6 text-black transform transition-transform duration-200 cursor-pointer`}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <Cross1Icon />
        </button>
        <div
          className={`${
            openMenu ? "hidden" : "block"
          } md:hidden flex items-center gap-6`}
        >
          <button className="relative" onClick={setOpenFavoritesModal}>
            <div className="inset-0">
              {favorites.length > 0 ? <PiHeartFill /> : <PiHeartThin />}
            </div>
          </button>
          <button
            onClick={setOpenCartModal}
            className="relative grid place-items-center cursor-pointer"
          >
            <div
              style={{
                color: onAboutOrContactPage ? "black" : "white",
                backgroundColor: onAboutOrContactPage ? "white" : "black",
              }}
              className="aspect-square h-4 grid place-items-center top-0 right-0 rounded-full 
         "
            >
              <p className="text-xs justify-center flex">
                <span
                  style={{ fontSize: "0.6rem" }}
                  className="text-xs font-thin"
                >
                  {numberOfCartItems > 0 ? numberOfCartItems : ""}
                </span>
              </p>
            </div>
          </button>
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="w-4 h-5 cursor-pointer flex gap-1 flex-col justify-center"
          >
            <span
              style={{
                backgroundColor: onAboutOrContactPage ? "white" : "black",
              }}
              className="w-full h-px"
            ></span>
            <span
              style={{
                backgroundColor: onAboutOrContactPage ? "white" : "black",
              }}
              className="w-full h-px"
            ></span>
            <span
              style={{
                backgroundColor: onAboutOrContactPage ? "white" : "black",
              }}
              className="w-full h-px"
            ></span>
          </div>
        </div>
        {/* Normal Screens: */}
        <div className="hidden md:flex items-center justify-around gap-16">
          <Link
            href={"/"}
            className={`headerLink ${
              onAboutOrContactPage && "aboutHeaderLink"
            }`}
            onMouseEnter={() => setIsHovered(true)}
          >
            Home
          </Link>
          <Link
            href={"/about"}
            className={`headerLink ${
              onAboutOrContactPage && "aboutHeaderLink"
            }`}
            onMouseEnter={() => setIsHovered(true)}
          >
            About
          </Link>
          <Link
            href={"/contact"}
            className={`headerLink ${
              onAboutOrContactPage && "aboutHeaderLink"
            }`}
            onMouseEnter={() => setIsHovered(true)}
          >
            Contact
          </Link>
          <div
            className="flex items-center gap-4"
            onMouseEnter={() => setIsHovered(true)}
          >
            <button
              className="relative"
              onClick={() => {
                setIsHovered(false);
                setOpenFavoritesModal();
              }}
            >
              <div className="inset-0">
                {favorites.length > 0 ? <PiHeartFill /> : <PiHeartThin />}
              </div>
            </button>
            <button
              onClick={() => {
                setIsHovered(false);
                setOpenCartModal();
              }}
              className={`headerLink cursor-pointer ${
                onAboutOrContactPage && "aboutHeaderLink"
              }`}
            >
              Cart
            </button>
            <button
              onClick={setOpenCartModal}
              className="relative grid place-items-center cursor-pointer"
            >
              {numberOfCartItems > 0 ? (
                <div
                  style={{
                    backgroundColor: onAboutOrContactPage ? "white" : "black",
                    color: onAboutOrContactPage ? "black" : "white",
                  }}
                  className="aspect-square h-4 grid place-items-center rounded-full"
                >
                  <p className="text-xs justify-center flex">
                    <span
                      style={{ fontSize: "0.6rem" }}
                      className="text-xs font-thin"
                    >
                      {numberOfCartItems > 0 ? numberOfCartItems : ""}
                    </span>
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: onAboutOrContactPage ? "white" : "black",
                    color: onAboutOrContactPage ? "black" : "white",
                  }}
                  className="aspect-square h-2 grid place-items-center rounded-full text-white"
                ></div>
              )}
            </button>
          </div>
        </div>
      </div>
      <Menu
        setOpenMenu={setOpenMenu}
        open={openMenu}
        headerHeight={headerHeight}
      />
      <div
        style={{ zIndex: 100 }}
        className={`h-[1px] fixed ${
          isHovered && !onAboutOrContactPage ? "block" : "hidden"
        } bg-black w-full opacity-10`}
      />
      {/* <div
        className={` ${
          isHovered ? "block" : "hidden"
        } flex z-50 fixed w-full bg-white justify-between p-6`}
      >
        <div className="flex flex-col gap-4">
          <FlipLink href={"/"}>New Arrivals</FlipLink>
          <FlipLink href={"/"}>Best Sellers</FlipLink>
          <FlipLink href={"/"}>Sale</FlipLink>
        </div>

        <div className="flex flex-col gap-4">
          <FlipLink href={"/"}>New Arrivals</FlipLink>
          <FlipLink href={"/"}>Best Sellers</FlipLink>
          <FlipLink href={"/"}>Sale</FlipLink>
        </div>
      </div> */}
    </motion.div>
  );
}

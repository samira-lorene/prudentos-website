"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageDiv from "@/components/ImageDiv";
import AddToCart from "@/components/AddToCart";
import Product from "@/components/Product";
import { PiHeartThin, PiHeartFill } from "react-icons/pi";
import useStore from "../../(store)/store";
import { addToCart, updateCart } from "@/utils/shopify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DOMPurify from "isomorphic-dompurify";
import SizeGuide from "@/components/SizeGuide";
import colornames from "colornames";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

gsap.registerPlugin(useGSAP);

export default function ProductPageContent(product: any, id: string) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const rightContent = useRef(null);
  const pageRef = useRef(null);

  const [selectedSize, setSelectedSize] = useState(false);
  const [addCartPressedSmallScreens, setAddCartPressedSmallScreens] =
    useState(false);
  const setOpenCartModal = useStore((state: any) => state.setOpenCartModal);
  const [loading, setLoading] = useState(false);

  const addFavorite = useStore((state: any) => state.addFavorite);
  const removeFavorite = useStore((state: any) => state.removeFavorite);
  const favorites = useStore((state: any) => state.favorites);

  const numberOfCartItems = useStore((state: any) => state.numberOfCartItems)
  const setNumberOfCartItems = useStore((state: any) => state.setNumberOfCartItems)

  const [openSizeGuide, setOpenSizeGuide] = useState(false);

  // to prevent body from scrolling when a modal is open
  useEffect(() => {
    if (openSizeGuide) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openSizeGuide]);

  const sanitizedDescription = DOMPurify.sanitize(
    product.product.descriptionHtml
  );

  // TODO: fix the spacing of text when the screen is vertically restricted, but still technicall
  // a large screen
  // TODO: fix aspect ratio of images on small to medium size screens

  const handleAddToCart = async () => {
    setLoading(true);
    if (selectedSize || addCartPressedSmallScreens) {
      console.log("add to cart");

      // then open cart modal and show the item
      let cartId = sessionStorage.getItem("cartId") || "";
      console.log("cartId", cartId);
      console.log(product.product.variants.edges[0].node.id);
      if (cartId) {
        console.log("updating cart");
        await updateCart(cartId, product.product.variants.edges[0].node.id, 1);
        setNumberOfCartItems(numberOfCartItems + 1)
        setSelectedSize(false);
      } else {
        let data = await addToCart(
          product.product.variants.edges[0].node.id,
          1
        );
        cartId = data.cartCreate.cart.id;
        sessionStorage.setItem("cartId", cartId);
        setNumberOfCartItems(numberOfCartItems + 1)
        setSelectedSize(false);
      }
      if (!addCartPressedSmallScreens) {
        setOpenCartModal();
      }
      setLoading(false);
      setAddCartPressedSmallScreens(false);
    }
  };

  let str = product.product.description;
  let match = str.match(/Color:\s*([a-zA-Z0-9-]+)/);
  let color = match ? match[1].trim() : null;
  let colorForHexCode = color.replace(/-/g, "").toLowerCase();
  // console.log(colorForHexCode); // Output: deep-navy
  color = color.replace(/-/g, " ");
  // console.log(color);

  let hexCode = colornames(colorForHexCode);
  if (colorForHexCode === "darknavy") {
    hexCode = "#0f0330";
  }

  function handleFavoriteClick(productId: string) {
    if (!favorites.some((favorite: any) => favorite.id === productId)) {
      addFavorite({
        newItem: {
          id: product.product.id,
          title: product.product.title,
          description: product.product.description,
          variantId: product.product.variants.edges[0].node.id,
          color: color,
          priceRange: {
            minVariantPrice: {
              amount: product.product.priceRange.minVariantPrice.amount,
            },
          },
          featuredImage: { url: product.product.featuredImage.url },
        },
      });
    } else {
      removeFavorite(productId);
    }
  }

  useEffect(() => {
    if (addCartPressedSmallScreens) {
      handleAddToCart();
    }
  }, [addCartPressedSmallScreens]);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    gsap.registerPlugin(ScrollTrigger);
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: `top top`,
        end: "bottom bottom",
        // markers: true,
        pin: rightContent.current,
        // scrub: true,
      });
    });
  });

  return (
    <>
      <div ref={pageRef} className="flex top-0 flex-col md:flex-row">
        <SizeGuide
          openModal={openSizeGuide}
          closeModal={setOpenSizeGuide}
        />
        {/* Backdrop */}
        {openSizeGuide && (
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-white opacity-65 z-20"
            onClick={() => setOpenSizeGuide(!openSizeGuide)}
          />
        )}
        <section
          ref={galleryRef}
          className="w-full relative hidden md:block md:w-[55%]"
        >
          {product.product.media.edges.map((media: any, index: number) => {
            return <ImageDiv key={index} imgSrc={media.node.image.url} />;
          })}
        </section>
        <section className="block md:hidden relative">
          <Product key={product.product.id} {...product.product} />
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick(product.product.id);
            }}
            title="Toggle Favorite"
            className="absolute bottom-8 right-6 z-20 cursor-pointer"
          >
            {favorites.find((item: any) => item.id === product.product.id) ? (
              <PiHeartFill />
            ) : (
              <PiHeartThin />
            )}
          </div>
        </section>
        <section
          ref={rightContent}
          id="product-details"
          className="w-full md:w-[45%] flex flex-col justify-center items-center md:h-screen"
        >
          <div className="w-[60%] md:block hidden py-56">
            <div className={styles.productDetail_title}>
              {product.product.title}
            </div>
            <div className={styles.productDetail_collection}>
              {product.product.collections.edges[0].node.title}
            </div>
            <div className="flex flex-col gap-2 pb-1 mb-4">
              <span className={styles.color}>{color}</span>
              <div
                style={{ backgroundColor: hexCode }}
                className={`h-5 w-5`}
              ></div>
              <div className="h-[1px] w-5 bg-black"></div>
            </div>
            <div className={styles.sizeHeader}>
              <span
                className={`${
                  selectedSize ? "selectedSize" : "headerLink"
                } cursor-pointer tracking-wide selectedSize`}
                onClick={() => setSelectedSize(!selectedSize)}
              >
                One Size
              </span>
              <div
                onClick={() => setOpenSizeGuide(true)}
                className={styles.headerLink}
              >
                Size Guide
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(product.product.id);
              }}
              title="Toggle Favorite"
              className="z-20 pt-4 cursor-pointer"
            >
              {favorites.find((item: any) => item.id === product.product.id) ? (
                <PiHeartFill />
              ) : (
                <PiHeartThin />
              )}
            </div>
            <button
              className={`${styles.parentButton} ${
                selectedSize && styles.addToCartStyles
              }`}
              onClick={() => handleAddToCart()}
            >
              <div
                className={`${!selectedSize && styles.blackElement}`}
                style={{
                  letterSpacing: "0.1em",
                  display: "flex",
                  left: "0",
                  right: "0",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <div className="flex text-xs items-center uppercase">
                  <AddToCart color={selectedSize ? "#fff" : "#000"} />
                  <span className="ml-2">Add</span>
                </div>
                <div>
                  {parseInt(product.product.priceRange.minVariantPrice.amount)}{" "}
                  EUR
                </div>
              </div>
              {!selectedSize && (
                <div
                  style={{
                    letterSpacing: "0.1em",
                    position: "absolute",
                    textTransform: "uppercase",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  className={`${styles.whiteElement}`}
                >
                  Choose a size
                </div>
              )}
            </button>
            <div className="pt-8">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent>
                    <div className={styles.productDetail_description}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: sanitizedDescription,
                        }}
                      ></div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Delivery</AccordionTrigger>
                  <AccordionContent>
                    We offer worldwide shipping and delivery to ensure your
                    order reaches you wherever you are.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Product Details smaller screens */}
          <div className="md:hidden pt-8 pb-12 px-12 flex text-xs flex-col justify-center text-center">
            <span className="uppercase tracking-widest my-4">
              {product.product.collections.edges[0].node.title}
            </span>
            <div className={styles.productDetail_description}>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizedDescription,
                }}
              ></div>
            </div>
            <div className="flex flex-col items-center gap-2 pb-1 mb-4">
              <span className={styles.color}>{color}</span>
              <div
                style={{ backgroundColor: hexCode }}
                className={`h-5 w-5`}
              ></div>
              <div className="h-[1px] w-5 bg-black"></div>
            </div>
            <div onClick={() => setOpenSizeGuide(true)}>Size Guide</div>
          </div>
        </section>
        {/* Add to Cart- Button section for smaller screens */}
        <section className="h-[17vh] bg-white border-t px-5 sm:px-10 flex flex-col items-center justify-center md:hidden sticky bottom-0 left-0 right-0">
          {/* button add to cart, name, price */}
          <div className="flex justify-between items-center w-full mb-2">
            <span className="font-light tracking-wide">
              {product.product.title}
            </span>
            <span className="text-xs tracking-widest">
              {parseInt(product.product.priceRange.minVariantPrice.amount)} EUR
            </span>
          </div>
          <button
            onClick={() => {
              setAddCartPressedSmallScreens(true);
            }}
            className={`mb-3 cursor-pointer border-black border w-full
             h-fit flex justify-center bg-black text-xs px-3 py-4 text-white relative`}
          >
            <span className="text-xs tracking-widest items-center uppercase">
              {loading ? (
                <div>
                  <LoadingSpinner />
                </div>
              ) : (
                <span>Add</span>
              )}
            </span>
          </button>
        </section>
      </div>
    </>
  );
}

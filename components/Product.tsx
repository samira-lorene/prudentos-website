"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";

import { usePathname, useRouter } from "next/navigation";
import DynamicBlur from "./DynamicBlur";
import useStore from "@/app/(store)/store";

interface ProductProps {
  variantId: string;
  media: {
    edges: {
      node: {
        image: {
          url: string;
          altText?: string;
        };
      };
    }[];
  };
  handle: string;
  id: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  title: string;
  description: string;
}

export default function Product({ variantId, ...props }: ProductProps) {
  // You can now access `variantId` directly
  const router = useRouter();
  const pathname = usePathname();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const addFavorite = useStore((state: any) => state.addFavorite);
  const removeFavorite = useStore((state: any) => state.removeFavorite);
  const favorites = useStore((state: any) => state.favorites);

  const carouselRef = useRef(null);

  const [carouselWidth, setCarouselWidth] = useState<number | undefined>(0);

  useEffect(() => {

    // Assuming you have a way to get the carousel width
    const updateCarouselWidth = () => {
      const carouselWidth = (carouselRef.current as HTMLElement | null)
        ?.offsetWidth;
      setCarouselWidth(carouselWidth);
    };

    window.addEventListener("resize", updateCarouselWidth);
    updateCarouselWidth();

    return () => window.removeEventListener("resize", updateCarouselWidth);
  }, []);

  const itemWidth = carouselWidth
    ? carouselWidth / props.media.edges.length
    : 0;
  const leftPosition = current * itemWidth;

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleClickOnProduct = () => {
    if (pathname.includes("/products")) {
      // we are already on the product page, no need to navigate there
      return;
    }
    // navigate to the product page of the individual product
    router.push(`/products/${props.handle}/?id=${props.id}`);
  };

  const price = parseInt(props.priceRange.minVariantPrice.amount);

  function addToFavorites(id: string) {
    if (!favorites.some((favorite: any) => favorite.id === id)) {
      let str = props.description;
      let match = str.match(/Color:\s*([a-zA-Z0-9-]+)/);
      let color = match ? match[1].trim() : null;
      color = (color ?? "").replace(/-/g, " ");
      addFavorite({ newItem: { ...props, color: color, variantId } });
    } else {
      removeFavorite(id);
    }
  }

  return (
    <div
      onClick={() => handleClickOnProduct()}
      className={`group ${
        pathname.includes("/products") ? "cursor-default" : "cursor-pointer"
      }`}
    >
      <Carousel setApi={setApi} ref={carouselRef} className="w-full">
        <CarouselContent>
          {props.media.edges.map((media: any, index: number) => (
            <CarouselItem key={index}>
              <div
                style={{ aspectRatio: "9/12" }}
                className={`relative w-full flex ${
                  pathname.includes("/products") ? "h-[83vh]" : ""
                } flex-col transition-opacity duration-200`}
              >
                <Image
                  className="object-cover object-top"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  src={media.node.image.url}
                  alt={media.node.image.altText ?? "alt text"}
                />
                {/* <DynamicBlur
                src={media.node.image.url}
                alt={media.node.image.altText ?? "alt text"}
              /> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div
          id="product-body"
          className="absolute hidden lg:flex text-xs productBodyText p-2 gap-2 flex-col w-full bottom-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
        >
          <div className="flex justify-between">
            <span>{props.title}</span>
            <span>
              {price >= 1000
                ? `${price.toString().slice(0, 1)} ${price.toString().slice(1)}`
                : price}{" "}
              EUR
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>One Size</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents the event from bubbling up to the Link
                addToFavorites(props.id);
              }}
            >
              {favorites.some((favorite: any) => favorite.id === props.id) ? (
                <HeartFilledIcon />
              ) : (
                <HeartIcon />
              )}
            </button>
          </div>
        </div>
        <div className="hidden lg:flex opacity-0 group-hover:opacity-100 transition-all duration-500">
          <CarouselPrevious />
        </div>
        <div className="hidden lg:flex opacity-0 group-hover:opacity-100 transition-all duration-500">
          <CarouselNext />
        </div>
        <div
          style={{
            height: "2px",
            width: `${itemWidth}px`,
            left: `${leftPosition - itemWidth}px`,
          }}
          className="absolute block lg:hidden bottom-0 bg-black z-20 transition-all duration-500"
        ></div>
      </Carousel>
    </div>
  );
}

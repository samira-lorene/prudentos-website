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
import { HeartIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Product({ ...props }) {
  function addToFavorites(id: string) {
    console.log("add to favorites, id: ", id);
  }

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  const itemWidth = carouselWidth ? carouselWidth / props.images.length : 0;
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

  return (
    <a href="/product" className="group cursor-pointer">
      <Carousel setApi={setApi} ref={carouselRef} className="w-full">
        <CarouselContent>
          {props.images.map((img: string, index: number) => (
            <CarouselItem key={index}>
              <div
                style={{ aspectRatio: "9/12" }}
                className="relative w-full flex flex-col transition-opacity duration-200"
              >
                <Image
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  src={img}
                  alt="Product Image"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div
          id="product-body"
          className="absolute hidden lg:flex text-xs productBodyText p-2 gap-2 flex-col w-full bottom-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
        >
          <div className="flex justify-between">
            <span>{props.name}</span>
            <span>
              {props.price >= 1000
                ? `${props.price.toString().slice(0, 1)} ${props.price
                    .toString()
                    .slice(1)}`
                : props.price}{" "}
              EUR
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>{props.sizes.join(" ")}</span>
            <button onClick={() => addToFavorites(props.id)}>
              <HeartIcon />
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
    </a>
  );
}

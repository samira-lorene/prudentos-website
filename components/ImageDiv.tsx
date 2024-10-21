import Image from "next/image";
import React from "react";

export default function ImageDiv({ imgSrc }: { imgSrc: string }) {
  return (
    <div
      style={{ aspectRatio: "9/12" }}
      className="relative w-full flex flex-col"
    >
      <Image
        className="object-cover"
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        src={imgSrc}
        alt="Product Image"
      />
    </div>
  );
}

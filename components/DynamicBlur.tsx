import React from "react";
import Image from "next/image";
type DynamicBlurProps = {
  src: string;
  alt: string;
};

export default async function DynamicBlur({ src, alt }: DynamicBlurProps) {
  //   const pathname = usePathname();

  // const buffer = await fetch(src).then(async (res) =>
  //   Buffer.from(await res.arrayBuffer())
  // );

  // const { base64 } = await getPlaiceholder(buffer);

  const imageBlur = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer()).toString("base64");
  });

  return (
    <div
      // make sure pathname.includes() works for all product pages
      style={{ aspectRatio: "9/12" }}
      // add this:
      // ${pathname.includes("/product") ? "h-[83vh]" : ""}

      className={`relative w-full flex 
         flex-col transition-opacity duration-200`}
    >
      <Image
        className="object-cover"
        fill
        placeholder="blur"
        blurDataURL={`data:image/png;base64,${imageBlur}`}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        src={src}
        alt={alt}
      />
    </div>
  );
}

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
    <>
      <Image
        className="object-cover object-top"
        fill
        placeholder="blur"
        blurDataURL={`data:image/png;base64,${imageBlur}`}
        src={src}
        alt={alt}
      />
    </>
  );
}

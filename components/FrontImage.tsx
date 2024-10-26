import Image from "next/image";
export default function GalleryCell({
  src,
  title,
  posterSrc,
  gifSrc,
}: {
  src: string;
  title: string;
  posterSrc: string;
  gifSrc: string;
}) {
  return (
    <div>
      <div
        style={{ aspectRatio: "9/12" }}
        className="relative video-container
        cursor-not-allowed pointer-events-none w-full flex flex-col transition-opacity duration-200"
      >
        <div className="hidden md:block">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={posterSrc}
          >
            <source src={src} type="video/webm" />
            Your browser does not support HTML5 video.
          </video>
        </div>

        <Image
          className="object-cover block md:hidden"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src={gifSrc}
          alt="Picture of the model"
        />
        <p className="frontImageText">{title}</p>
      </div>
    </div>
  );
}

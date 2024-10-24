export default function GalleryCell({
  src,
  title,
  posterSrc,
}: {
  src: string;
  title: string;
  posterSrc: string;
}) {
  // TODO: convert all static images to webp format
  // TODO: add plaiceholder for lazy loading images

  return (
    <div>
      <div
        style={{ aspectRatio: "9/12" }}
        className="relative vide-container w-full flex max-h-[95vh] flex-col transition-opacity duration-200"
      >
        <video autoPlay loop muted preload="none" poster={posterSrc}>
          <source src={src} type="video/webm" />
          Your browser does not support HTML5 video.
        </video>
        {/* <Image
          className="object-cover"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src={src}
          alt="Picture of the model"
        /> */}
        <p className="frontImageText">{title}</p>
      </div>
    </div>
  );
}

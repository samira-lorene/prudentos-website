export default function GalleryCell({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <div>
      <div
        style={{ aspectRatio: "9/12" }}
        className="relative vide-container w-full flex max-h-[95vh] flex-col transition-opacity duration-200"
      >
        <video autoPlay loop muted preload="auto">
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

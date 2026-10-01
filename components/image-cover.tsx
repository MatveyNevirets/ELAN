import Image from "next/image";

type ImageCoverProps = {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
  objectPosition?: string;
  sizes?: string;
};

export default function ImageCover({
  src,
  alt,
  className,
  priority = false,
  objectPosition,
  sizes = "100vw",
}: ImageCoverProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      unoptimized
      sizes={sizes}
      className={className}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}

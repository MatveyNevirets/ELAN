import Image from "next/image";
import type { StaticImageData } from "next/image";

type ImageCoverProps = {
  src: string | StaticImageData;
  alt: string;
  className: string;
  priority?: boolean;
  objectPosition?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export default function ImageCover({
  src,
  alt,
  className,
  priority = false,
  objectPosition,
  sizes = "100vw",
  loading,
  fetchPriority,
}: ImageCoverProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      loading={priority ? undefined : loading}
      fetchPriority={fetchPriority}
      placeholder={typeof src !== "string" && src.blurDataURL ? "blur" : "empty"}
      unoptimized
      sizes={sizes}
      className={className}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}

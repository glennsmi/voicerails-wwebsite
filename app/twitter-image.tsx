import {
  buildSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const runtime = "nodejs";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function TwitterImage() {
  return buildSocialImage();
}

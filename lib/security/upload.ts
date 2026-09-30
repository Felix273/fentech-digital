import { randomUUID } from "node:crypto";

export const MAX_MEDIA_SIZE = 8 * 1024 * 1024;

const ALLOWED_MEDIA = {
  "image/jpeg": { extension: "jpg", signature: "jpeg" },
  "image/png": { extension: "png", signature: "png" },
  "image/webp": { extension: "webp", signature: "webp" },
  "application/pdf": { extension: "pdf", signature: "pdf" },
} as const;

type AllowedMime = keyof typeof ALLOWED_MEDIA;

export class UploadValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadValidationError";
  }
}

function hasSignature(bytes: Uint8Array, signature: string): boolean {
  if (signature === "jpeg") {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (signature === "png") {
    return [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value);
  }
  if (signature === "webp") {
    return String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  }
  return String.fromCharCode(...bytes.slice(0, 4)) === "%PDF";
}

export async function validateMediaFile(file: File): Promise<{ mime: AllowedMime; extension: string }> {
  if (!file || file.size === 0) throw new UploadValidationError("Choose a non-empty file.");
  if (file.size > MAX_MEDIA_SIZE) throw new UploadValidationError("File is too large. Maximum size is 8MB.");

  const metadata = ALLOWED_MEDIA[file.type as AllowedMime];
  if (!metadata) throw new UploadValidationError("Only JPEG, PNG, WebP, and PDF files are allowed.");

  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (!hasSignature(bytes, metadata.signature)) {
    throw new UploadValidationError("The file contents do not match its declared type.");
  }

  return { mime: file.type as AllowedMime, extension: metadata.extension };
}

export function buildMediaObjectKey(extension: string, folder = "uploads"): string {
  const safeFolder = folder.replace(/[^a-zA-Z0-9/_-]/g, "").replace(/^\/+|\/+$/g, "");
  if (!safeFolder || safeFolder.includes("..")) throw new UploadValidationError("Invalid upload folder.");
  return `${safeFolder}/${randomUUID()}.${extension}`;
}

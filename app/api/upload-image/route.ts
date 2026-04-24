// app/api/upload-image/route.ts
import { put } from "@vercel/blob";
import sharp from "sharp";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_SIZE = 500 * 1024; // 500 KB

async function compressImage(buffer: Buffer) {
  let quality = 85;

  while (quality >= 40) {
    const compressed = await sharp(buffer)
      .rotate()
      .resize({
        width: 1200,
        height: 1200,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality,
        effort: 6,
      })
      .toBuffer();

    if (compressed.length <= MAX_SIZE || quality <= 40) {
      return compressed;
    }

    quality -= 10;
  }

  throw new Error("Could not compress image");
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const compressedBuffer = await compressImage(buffer);

  const filename = file.name.replace(/\.[^/.]+$/, "") + ".webp";

  const blob = await put(`recipes/${crypto.randomUUID()}-${filename}`, compressedBuffer, {
    access: "public",
    contentType: "image/webp",
  });

  return NextResponse.json({
    url: blob.url,
    size: compressedBuffer.length,
  });
}
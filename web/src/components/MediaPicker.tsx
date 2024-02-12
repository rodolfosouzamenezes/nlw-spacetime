"use client";

import { ChangeEvent, useState } from "react";

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);

  const onMediaSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  };

  return (
    <>
      <input
        id="media"
        name="coverUrl"
        type="file"
        accept="image/*"
        onChange={onMediaSelected}
        className="sr-only"
      />
      {preview && (
        <img
          src={preview}
          alt=""
          className="h-[280px] aspect-video rounded-lg object-cover"
        />
      )}
    </>
  );
}

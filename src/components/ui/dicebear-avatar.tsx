"use client";

import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useEffect, useState } from "react";
import Image from "next/image";

interface DicebearAvatarProps {
  seed: string;
  size?: number;
  className?: string;
}

export function DicebearAvatar({
  seed,
  size = 80,
  className = "",
}: DicebearAvatarProps) {
  const [avatarSvg, setAvatarSvg] = useState<string>("");

  useEffect(() => {
    const avatar = createAvatar(lorelei, {
      seed,
      size,
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
    });

    setAvatarSvg(avatar.toDataUri());
  }, [seed, size]);

  return (
    <div
      className={`rounded-full overflow-hidden bg-gray-100 ${className}`}
      style={{ width: size, height: size }}
    >
      {avatarSvg && (
        <Image
          src={avatarSvg}
          alt="Avatar"
          width={size}
          height={size}
          className="w-full h-full"
        />
      )}
    </div>
  );
}

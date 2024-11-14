"use client"
import Image from 'next/image';
import React from 'react';

interface AvatarProps {
    src: string;
    alt?: string;
    size?: number;
  }

const Avatar: React.FC<AvatarProps> = ({ src, alt = 'User avatar', size = 50 }) => {
  return (
    <div className="avatar">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="avatar-image"
      />
      <style jsx>{`
        .avatar {
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%; /* Makes the image circular */
          overflow: hidden;
        }
        .avatar-image {
          object-fit: cover; /* Ensures the image fills the circle */
        }
      `}</style>
    </div>
  );
}

export default Avatar;
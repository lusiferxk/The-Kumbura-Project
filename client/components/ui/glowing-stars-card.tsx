"use client";
import React, { ReactNode } from "react";
import Link from "next/link"
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "../ui/glowing-stars";

interface contentProps {
  heading: ReactNode,
  content: ReactNode,
  hrefLink: string
}

interface iconProps {
  link: string,
}

export function GlowingStarsBackgroundCardPreview( {heading, content, hrefLink}: contentProps ) {
  return (
    <div className="flex items-center antialiased ml-5 mr-5">
      <GlowingStarsBackgroundCard>
        <GlowingStarsTitle>{ heading }</GlowingStarsTitle>
        <div className="flex justify-between items-end">
          <GlowingStarsDescription>
            { content }
          </GlowingStarsDescription>
          <div className="rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
            <Icon link={ hrefLink }/>
          </div>
        </div>
      </GlowingStarsBackgroundCard>
    </div>
  );
}

const Icon = ({ link }: iconProps) => {
  return (
    <Link href={link}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-4 w-4 text-white stroke-2 transform transition-transform duration-300 hover:scale-150"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
      </svg>
    </Link>
  );
};

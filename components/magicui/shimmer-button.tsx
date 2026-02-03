"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ShimmerButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  children: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        style={
          {
            "--shimmer-color": shimmerColor,
            "--shimmer-size": shimmerSize,
            "--shimmer-duration": shimmerDuration,
            "--border-radius": borderRadius,
            "--background": background,
          } as React.CSSProperties
        }
        className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-2 text-white transition-all duration-300 hover:scale-105 active:scale-95 [background:var(--background)] [border-radius:var(--border-radius)] ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        <div className="absolute inset-0 overflow-visible [container-type:size]">
          <div className="absolute inset-0 [aspect-ratio:1] [border-radius:var(--border-radius)] [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-shimmer before:bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--shimmer-color)_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
        </div>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translate(-50%, -15%) rotate(0deg);
            }
            100% {
              transform: translate(-50%, -15%) rotate(360deg);
            }
          }
          .before\\:animate-shimmer::before {
            animation: shimmer var(--shimmer-duration) infinite linear;
          }
        `}</style>
      </motion.button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

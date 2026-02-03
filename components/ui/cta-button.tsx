"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const ctaButtonVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden transition-all duration-200 font-medium whitespace-nowrap disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg shadow-primary/20 ring-2 ring-primary/50 ring-offset-2 ring-offset-background text-primary-foreground",
        outline:
          "border border-primary/50 bg-background hover:bg-primary/10 shadow-lg shadow-primary/10",
        ghost: "hover:bg-primary/10",
      },
      size: {
        default: "h-10 px-8 py-2 text-base",
        sm: "h-9 px-6 py-1.5 text-sm",
        lg: "h-12 px-10 py-3 text-base",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "full",
    },
  }
);

interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ctaButtonVariants> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
  asChild?: boolean;
}

function WaveText({ text, isHovered }: { text: string; isHovered: boolean }) {
  const characters = text.split("");

  return (
    <span className="inline-flex">
      {characters.map((char, index) => (
        <span key={index} className="relative inline-flex overflow-hidden">
          <motion.span
            className="inline-block"
            animate={{
              translateY: isHovered ? "-110%" : "0%",
              skewY: isHovered ? 12 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
              delay: index * 0.02,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
          <motion.span
            className="absolute inset-0 inline-block"
            animate={{
              translateY: isHovered ? "0%" : "110%",
              skewY: isHovered ? 0 : 12,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
              delay: index * 0.02,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function AnimatedContent({
  children,
  leftIcon,
  rightIcon,
  isHovered,
}: {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isHovered: boolean;
}) {
  // Extract text content for wave animation
  const textContent =
    typeof children === "string"
      ? children
      : typeof children === "number"
      ? String(children)
      : null;

  return (
    <span className="relative inline-flex items-center justify-center gap-2">
      {leftIcon && (
        <motion.span
          className="inline-flex items-center justify-center"
          animate={
            isHovered
              ? {
                  x: [0, -2, 0],
                  transition: {
                    duration: 0.4,
                    ease: "easeInOut",
                  },
                }
              : { x: 0 }
          }
        >
          {leftIcon}
        </motion.span>
      )}

      {textContent ? (
        <WaveText text={textContent} isHovered={isHovered} />
      ) : (
        children
      )}

      {rightIcon && (
        <motion.span
          className="inline-flex items-center justify-center"
          animate={
            isHovered
              ? {
                  x: 4,
                  transition: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }
              : { x: 0 }
          }
        >
          {rightIcon}
        </motion.span>
      )}
    </span>
  );
}

export function CTAButton({
  children,
  leftIcon,
  rightIcon,
  variant,
  size,
  rounded,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  return (
    <motion.button
      className={cn(ctaButtonVariants({ variant, size, rounded, className }))}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <AnimatedContent
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        isHovered={isHovered}
      >
        {children}
      </AnimatedContent>
    </motion.button>
  );
}

// Link wrapper variant for Next.js Link compatibility
export function CTAButtonLink({
  children,
  leftIcon,
  rightIcon,
  variant,
  size,
  rounded,
  className,
  href,
  ...props
}: CTAButtonProps & { href: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className={cn(ctaButtonVariants({ variant, size, rounded, className }))}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <AnimatedContent
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        isHovered={isHovered}
      >
        {children}
      </AnimatedContent>
    </motion.a>
  );
}

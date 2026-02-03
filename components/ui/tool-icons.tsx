import Image from "next/image";

export const ToolIcons = {
  // Images PNG
  stripe: () => (
    <Image
      src="/images/stripe.png"
      alt="Stripe"
      width={40}
      height={40}
      className="object-contain dark:invert"
    />
  ),
  posthog: () => (
    <Image
      src="/images/posthog.png"
      alt="PostHog"
      width={40}
      height={40}
      className="object-contain"
    />
  ),
  resend: () => (
    <Image
      src="/images/resend.png"
      alt="Resend"
      width={40}
      height={40}
      className="object-contain dark:invert"
    />
  ),

  // SVG Icons
  vercel: () => (
    <svg
      viewBox="0 0 76 65"
      fill="currentColor"
      className="w-10 h-10 text-foreground"
    >
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  ),

  supabase: () => (
    <svg
      viewBox="0 0 109 113"
      fill="none"
      className="w-10 h-10"
    >
      <path
        d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627H99.1935C104.384 40.0627 107.952 45.9445 105.242 50.5835L63.7076 110.284Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627H99.1935C104.384 40.0627 107.952 45.9445 105.242 50.5835L63.7076 110.284Z"
        fill="url(#paint1_linear)"
        fillOpacity="0.2"
      />
      <path
        d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C4.64038 72.2922 1.07252 66.4104 3.78294 61.7714L45.317 2.07103Z"
        fill="#3ECF8E"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="53.9738"
          y1="54.974"
          x2="94.1635"
          y2="71.8295"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="36.1558"
          y1="30.578"
          x2="54.4844"
          y2="65.0806"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),

  figma: () => (
    <svg
      viewBox="0 0 38 57"
      fill="none"
      className="w-10 h-10"
    >
      <path
        d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
        fill="#0ACF83"
      />
      <path
        d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
        fill="#FF7262"
      />
      <path
        d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
        fill="#F24E1E"
      />
      <path
        d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
        fill="#A259FF"
      />
    </svg>
  ),

  notion: () => (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className="w-10 h-10"
    >
      <path
        d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
        fill="#ffffff"
      />
      <path
        d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
        fill="#000000"
        fillRule="evenodd"
        clipRule="evenodd"
        className="dark:fill-white"
      />
    </svg>
  ),

  github: () => (
    <svg
      viewBox="0 0 98 96"
      className="w-10 h-10 fill-foreground"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      />
    </svg>
  ),

  nextjs: () => (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      className="w-10 h-10"
    >
      <mask
        id="mask0_408_134"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="180"
        height="180"
      >
        <circle cx="90" cy="90" r="90" fill="currentColor" />
      </mask>
      <g mask="url(#mask0_408_134)">
        <circle cx="90" cy="90" r="90" fill="currentColor" className="fill-foreground" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#paint0_linear_408_134)"
        />
        <rect
          x="115"
          y="54"
          width="12"
          height="72"
          fill="url(#paint1_linear_408_134)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_408_134"
          x1="109"
          y1="116.5"
          x2="144.5"
          y2="160.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_408_134"
          x1="121"
          y1="54"
          x2="120.799"
          y2="106.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // Centre - Logo SaaS générique
  rocket: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-10 h-10 text-primary"
    >
      <path
        d="M12 2L4.5 20.5L5.5 21.5L9 19L11 21L12 22L13 21L15 19L18.5 21.5L19.5 20.5L12 2Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M12 2C12 2 7 8 7 13C7 16.31 9.69 19 13 19C16.31 19 19 16.31 19 13C19 8 14 2 14 2H12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="13" cy="11" r="2" fill="currentColor" />
      <path
        d="M5 21L7 19L9 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 19L17 21L19 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  tailwind: () => (
    <svg
      viewBox="0 0 54 33"
      className="w-10 h-10"
    >
      <g fill="#06B6D4">
        <path d="M13.5 6.75c2.25-6 6-9 11.25-9 7.875 0 8.813 5.625 12.656 6.562 2.531.75 4.781-.375 6.75-3.187-2.25 6-6 9-11.25 9-7.875 0-8.813-5.625-12.656-6.562C17.719 2.813 15.469 3.938 13.5 6.75zM1.875 18.375c2.25-6 6-9 11.25-9 7.875 0 8.813 5.625 12.656 6.562 2.531.75 4.781-.375 6.75-3.187-2.25 6-6 9-11.25 9-7.875 0-8.813-5.625-12.656-6.562C6.094 14.438 3.844 15.563 1.875 18.375z" />
      </g>
    </svg>
  ),

  vscode: () => (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className="w-10 h-10"
    >
      <path
        d="M95.3 13.3L73.9 0.4c-1.4-0.8-3.1-0.8-4.5 0L27.9 29.5 11.8 16.7c-1-0.7-2.4-0.7-3.3 0L2.3 21C0.8 22.1 0 23.9 0 25.7v48.7c0 1.8 0.8 3.5 2.3 4.6l6.2 4.3c0.9 0.7 2.3 0.7 3.3 0l16.1-12.9 41.5 29.1c0.7 0.5 1.5 0.7 2.3 0.7 0.8 0 1.6-0.2 2.3-0.7l21.4-12.9c1.4-0.8 2.3-2.4 2.3-4.1V17.4c0-1.7-0.9-3.3-2.4-4.1zM73.2 79.4L39.7 50l33.5-29.4v58.8z"
        fill="#007ACC"
      />
    </svg>
  ),
};

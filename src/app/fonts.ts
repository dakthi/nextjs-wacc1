// app/font.ts or lib/font.ts

import { Great_Vibes } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import { Allura } from "next/font/google";
import { Pacifico } from "next/font/google";
import { Satisfy } from "next/font/google";
import { Parisienne } from "next/font/google";
import { Kalam } from "next/font/google";

// You can now use these in your components
export const kalam = Kalam({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

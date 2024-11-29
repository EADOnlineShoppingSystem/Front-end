/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [tailwindScrollbar({ nocompatible: true })],
  variants: {
    scrollbar: ["rounded"],
  },
};

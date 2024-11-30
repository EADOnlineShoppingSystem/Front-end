/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjusted to include common frontend file types
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindScrollbar, // Directly pass the plugin without additional options unless required
  ],
  variants: {
    extend: {
      scrollbar: ["rounded"], // Added under `extend` to ensure compatibility
    },
  },
};

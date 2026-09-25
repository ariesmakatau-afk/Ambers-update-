import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // "Blue, White & Fire" — the shop's own blue and white (the walls,
      // the sign, the centaur wallpaper) set against the one thing that
      // isn't blue in there: the charcoal.
      colors: {
        ink: "#141c2b", // body text — blue-black, not literal black
        // The shop blue: headings, links, prices, the arch and the key trim.
        cobalt: {
          DEFAULT: "#1d4f91",
          light: "#4f7fc0",
          dark: "#0e2a52",
        },
        // Pale glaze — alternating sections, chips, soft fills.
        porcelain: {
          DEFAULT: "#eaf1fa",
          deep: "#d6e3f3",
        },
        // The whitewashed wall — the base page.
        chalk: {
          DEFAULT: "#fbfdff",
        },
        // Red-hot charcoal — the accent: eyebrows, stars, sparks, glow.
        ember: {
          DEFAULT: "#e0521b",
          light: "#ff9a4a",
          deep: "#a8360c",
        },
        // Spent charcoal and the grill's steel — dark bands, footer.
        char: {
          DEFAULT: "#0f1115",
          light: "#1c1f26",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"], // Fraunces — quirky premium-food display serif, headings
        script: ["var(--font-script)"], // Fraunces italic — accent taglines
        body: ["var(--font-body)"], // Sora — geometric sans, body/UI
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(14,42,82,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;

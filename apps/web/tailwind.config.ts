import type { Config } from "tailwindcss"
import sharedConfig from "@machines/tailwind-config";

const config = {
  content: ["../../packages/ui/src/**/*.tsx", "./app/**/*.tsx", "./domains/**/*.tsx"],
  darkMode: ["class"],
  presets: [sharedConfig],
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

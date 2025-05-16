import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",      // inclui pastas e arquivos do app
    "./components/**/*.{ts,tsx,js,jsx}" // inclui componentes
  ],
  theme: {
    extend: {}, // caso queira personalizar depois
  },
  plugins: [],
};

export default config;

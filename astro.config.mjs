import { defineConfig } from "astro/config";
import node from "@astrojs/node";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: node({ mode: "middleware" }),
	integrations: [react()],
	server: { port: 4000, host: true }
});
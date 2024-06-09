/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { CreateInstance, InstanceList, UpdateInstanceStatus } from "./handlers/instances";

import { ExchangeToken } from "./handlers/exchange";
import { InstanceInsights } from "./handlers/insights";
import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";

const router = OpenAPIRouter({
	schema: {
		info: {
			title: "Machine Apis",
			description: "Develop a front-end application that manages virtual machine (VM) instances and integrates with serverless functions for infrastructure management. The application should offer a robust user interface for VM lifecycle management, data visualization, and file management, with secure user authentication.",
			version: "1.0",
		},
	},
});

router.get("/apis/instances/", InstanceList);
router.post("/apis/instances/", CreateInstance);
router.patch("/apis/instances/{id}/", UpdateInstanceStatus);
router.post('/apis/exchange/', ExchangeToken);
router.get("/apis/insights/", InstanceInsights);

router.original.get("/", (request) =>
	Response.redirect(`${request.url}docs`, 302)
);

router.all("*", () => new Response("Not Found.", { status: 404 }));

export default {
	fetch: router.handle
}

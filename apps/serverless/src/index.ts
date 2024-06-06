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

import apiRouter from './router';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const corsHeaders = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,HEAD,POST,PATCH,OPTIONS",
			"Access-Control-Max-Age": "86400",
		};
		return apiRouter.handle(request, env, ctx).then((response) => {
			return new Response(response.body, {
				headers: {
					...response.headers,
					...corsHeaders,
				}
			});
		});
	},
} satisfies ExportedHandler<Env>

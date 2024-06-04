import { IRequest } from "itty-router";

export const listVms = async (request: IRequest): Promise<Response> => {
	return new Response(JSON.stringify({
		message: 'Hello, World!',
	}), {
		headers: {
			'content-type': 'application/json',
		},
	});
}

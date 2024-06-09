import { IRequest } from 'itty-router';
import jwt from '@tsndr/cloudflare-worker-jwt';

export async function authMiddleware(request: IRequest, env: any): Promise<Response | void> {
	try {
		const authorization = request.headers.get('Authorization');
		if (!authorization) {
			return new Response(
				JSON.stringify({ message: 'Authorization header is missing.' }),
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const tokenParts = authorization.split(' ');

		if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
			return new Response(
				JSON.stringify({ message: 'Bearer token is malformed.' }),
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const token = tokenParts[1];
		if (!token) {
			return new Response(
				JSON.stringify({ message: 'Token is missing.' }),
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const isValid = await jwt.verify(token.trim(), env.JWT_SECRET);

		if (!isValid) {
			return new Response(
				JSON.stringify({ message: 'Invalid token.' }),
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const { payload } = jwt.decode(token.trim());

		if (!payload) {
			return new Response(
				JSON.stringify({ message: 'Failed to decode token.' }),
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		env.user = payload.sub;
	} catch (error) {
		console.error('Error:', error);
		return new Response(
			JSON.stringify({ message: 'Failed to verify token.' }),
			{ status: 401, headers: { 'Content-Type': 'application/json' } }
		);
	}
}

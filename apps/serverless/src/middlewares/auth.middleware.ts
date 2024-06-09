import { IRequest } from 'itty-router';
import jwt from '@tsndr/cloudflare-worker-jwt';

export async function authMiddleware(request: IRequest, env: any): Promise<Response | void> {
	try {
		const authorization = request.headers.get('Authorization');
		if (!authorization) {
			throw new Error('Authorization header is missing.');
		}

		const tokenParts = authorization.split(' ');

		if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
			throw new Error('Bearer token is malformed.');
		}

		const token = tokenParts[1];
		if (!token) {
			throw new Error('Token is missing.');
		}

		const isValid = await jwt.verify(token.trim(), env.JWT_SECRET);

		if (!isValid) {
			throw new Error('Invalid token.');
		}

		const { payload } = jwt.decode(token.trim());

		if (!payload) {
			throw new Error('Failed to decode token.');
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

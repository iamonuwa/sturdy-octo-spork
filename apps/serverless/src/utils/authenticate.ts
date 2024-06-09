import { IRequest } from 'itty-router';
import jwt from '@tsndr/cloudflare-worker-jwt';

export async function authenticate(request: IRequest, env: any): Promise<string | undefined> {
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

		request.user = payload.sub;
		env.user = payload.sub;
		return payload.sub;
	} catch (error) {
		throw new Error('Failed to verify token.');
	}
}

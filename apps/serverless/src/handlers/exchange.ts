import {
	OpenAPIRoute,
	Str
} from '@cloudflare/itty-router-openapi'

import { IRequest } from 'itty-router';
import { PrivyClient } from '@privy-io/server-auth';
import { connectDB } from '../utils/supabase';
import jwt from "@tsndr/cloudflare-worker-jwt";

const Auth = {
	authToken: new Str({ required: true }),
}

export class ExchangeToken extends OpenAPIRoute {
	static schema = {
		tags: ['Auth'],
		summary: 'Exchange user token from privy for auth token',
		responses: {
			'200': {
				description: 'Token exchanged successfully',
				schema: {
					metadata: {},
					data: Auth,
					message: new Str(),
				},
			},
		},
	}

	async handle(request: IRequest, env: any, context: any, data: Record<string, any>) {
		try {
			const payload = await request.json() as { token: string };

			const client = new PrivyClient(env.PRIVY_CLIENT_ID, env.PRIVY_SECRET_KEY);

			const { userId } = await client.verifyAuthToken(payload["token"]);

			const user = await client.getUser(userId);

			const { data, error } = await connectDB(env).from('accounts').select('id').eq('user_id', user.id).single();

			if (error) {
				throw new Error(`Failed to authenticate user. Reason - ${error.message}`);
			}

			let accountId = null

			if (!data) {
				const userObject = {
					provider: user.wallet ? 'siwe' : user.google ? 'google' : 'twitter',
					photo_url: user.twitter?.profilePictureUrl || 'N/A',
					display_name: user.google?.name || user.twitter?.name || 'N/A',
					identifier: user.wallet?.address || user.google?.email || user.twitter?.username,
					user_id: user.id,
				};

				const { data, error } = await connectDB(env)
					.from('accounts')
					.insert(userObject)
					.select('id');

				if (error) {
					throw new Error(`Unable to register user. Reason - ${error.message}`);
				}

				accountId = data[0].id;
			} else {
				accountId = data.id;
			}

			const now = Math.floor(Date.now() / 1000)
			const offset = 30 // 30 seconds

			const authToken = await jwt.sign({
				sub: accountId as unknown as string,
				nbf: now - offset,
			}, env.JWT_SECRET);

			return {
				data: authToken,
				message: 'User authenticated successfully'
			}
		} catch (error) {
			return {
				message: error instanceof Error ? error.message : 'An unexpected error occurred.'
			}
		}
	}
}

import {
	OpenAPIRoute,
	Str
} from '@cloudflare/itty-router-openapi'

import { IRequest } from 'itty-router';
import { PrivyClient } from '@privy-io/server-auth';
import { connectDB } from '../utils/supabase';
import { getId } from '../utils/id'
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

	async handle(request: IRequest, env: any) {
		try {
			const payload = await request.json() as { token: string };

			const client = new PrivyClient(env.PRIVY_CLIENT_ID, env.PRIVY_SECRET_KEY);

			const { userId } = await client.verifyAuthToken(payload["token"]);

			const user = await client.getUser(userId);

			console.log(user)

			// using user id here since this is the only unique identifier we have from privy
			const { data, error } = await connectDB(env).from('accounts').select('*', { count: 'exact' }).eq('user_id', getId(user.id));

			if (error) {
				console.log(`Failed to authenticate user. Reason: ${error.message}`)
				throw new Error("Failed to authenticate user.");
			}

			let accountId = null

			if (data.length === 0) {
				const userObject = {
					provider: user.wallet ? 'siwe' : user.google ? 'google' : user.email ? 'email' : 'unknown',
					photo_url: user.twitter?.profilePictureUrl || 'N/A',
					display_name: user.google?.name || user.twitter?.name || 'N/A',
					identifier: user.wallet?.address || user.google?.email || user.email?.address || user.twitter?.username,
					user_id: getId(user.id),
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
				accountId = data[0].id;
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
			console.log('Error from catch ', JSON.stringify(error, null, 2))
			return {
				message: error instanceof Error ? error.message : 'An unexpected error occurred.'
			}
		}
	}
}

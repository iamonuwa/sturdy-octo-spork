import {
	DateOnly,
	Int,
	OpenAPIRoute,
	Str
} from '@cloudflare/itty-router-openapi'

import { IRequest } from 'itty-router';
import { connectDB } from '../utils/supabase';

const User = {
	created_at: new DateOnly(),
	identifier: new Str({ required: true }),
	display_name: new Str({ required: false }),
	user_id: new Int({ required: true }),
	photo_url: new String({ required: false }),
	provider: new Str({ required: true }),
	last_updated_at: new DateOnly(),
}

export class CurrentUser extends OpenAPIRoute {
	static schema = {
		tags: ['VM'],
		summary: 'Retrieve current user data',
		responses: {
			'200': {
				description: 'User data fetched successfully',
				schema: {
					data: User,
					message: new Str(),
				},
			},
		},
	}

	async handle(request: IRequest, env: any, context: any, data: Record<string, any>) {
		try {
			const { data, error, count } = await connectDB(env)
				.from('accounts')
				.select('user_id, identifier, display_name, photo_url, provider, created_at', { count: 'exact' })
				.eq('id', env.user)

			if (error) {
				console.log(`Failed to fetch user data. Reason - ${error.message}`)
				throw new Error("Failed to fetch user data.");
			}

			return {
				data: data[0],
				message: 'User data fetched successfully.',
				count
			}
		} catch (error) {
			return {
				message: error instanceof Error ? error.message : 'An unexpected error occurred.'
			}
		}
	}
}

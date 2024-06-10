import {
	DateOnly,
	Int,
	OpenAPIRoute,
	Query,
	Str
} from '@cloudflare/itty-router-openapi'

import { IRequest } from 'itty-router';
import { connectDB } from '../utils/supabase';

const VmInstance = {
	created_at: new DateOnly(),
	cpu: new Str({ required: true }),
	memory: new Int({ required: true }),
	disk: new Int({ required: true }),
	instance: new Str({ required: false }),
	last_updated_at: new DateOnly(),
}

export class InstanceInsights extends OpenAPIRoute {
	static schema = {
		tags: ['Insights', 'Instances'],
		summary: 'Retrieve insight data for a given instance',
		parameters: {
			instance: Query(String, {
				description: "Instance ID to filter by",
			}),
		},
		responses: {
			'200': {
				description: 'Instance insights fetched successfully',
				schema: {
					metadata: {},
					data: [VmInstance],
					message: new Str(),
					count: new Int(),
				},
			},
		},
	}

	async handle(request: IRequest, env: any, _: any, payload: Record<string, string>) {
		try {
			const instance = payload.query['instance']
			const { data, error, count } = await connectDB(env)
				.from('metrics')
				.select('*', { count: 'exact' })
				.eq('instance', instance)
				.order('created_at', { ascending: false })

			if (error) {
				console.log(`Failed to retrieve insights for instance ${instance}. Reason - ${error.message}`)
				throw new Error("Failed to retrieve insights");
			}

			return {
				data,
				message: 'Instance insights fetched successfully.',
				count
			}
		} catch (error) {
			return {
				message: error instanceof Error ? error.message : 'An unexpected error occurred.'
			}
		}
	}
}


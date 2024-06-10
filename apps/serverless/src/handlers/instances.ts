import {
	DateOnly,
	Int,
	OpenAPIRoute,
	Str
} from '@cloudflare/itty-router-openapi'
import { createVmSchema, updateVmSchema } from '@machines/model/vm';

import { IRequest } from 'itty-router';
import { connectDB } from '../utils/supabase';

const VmInstance = {
	created_at: new DateOnly(),
	name: new Str({ required: true }),
	cpu: new Str({ required: true }),
	memory: new Int({ required: true }),
	disk: new Int({ required: true }),
	ip_ddress: new Str({ required: true }),
	region: new Str({ required: true }),
	status: new Str({ required: false, default: 'RUNNING' }),
	last_updated_at: new DateOnly(),
}

export class FetchInstances extends OpenAPIRoute {
	static schema = {
		tags: ['Instances'],
		summary: 'Fetch VMs list for current user',
		responses: {
			'200': {
				description: 'VM instances list fetched successfully',
				schema: {
					data: [VmInstance],
					message: new Str(),
					count: new Int(),
				},
			},
		},
	}

	async handle(_, env: any) {
		try {
			const { data, error, count } = await connectDB(env)
				.from('instances')
				.select(`*, from:creator(identifier, display_name)`, { count: 'exact' })
				.order('created_at', { ascending: false })

			if (error) {
				console.error('Supabase error:', error.message);
				throw new Error(`Failed to retrieve VMs. Reason - ${error.message}`);
			}

			return {
				data,
				message: 'VM instances retrieved successfully.',
				count
			}
		} catch (error) {
			return {
				message: error instanceof Error ? error.message : 'An unexpected error occurred.'
			}
		}
	}
}


export class FetchInstance extends OpenAPIRoute {
	static schema = {
		tags: ['Instances'],
		summary: 'Fetch VM instance details',
		responses: {
			'200': {
				description: 'VM instance details fetched successfully',
				schema: {
					data: VmInstance,
					message: new Str(),
				},
			},
		},
	}

	async handle(request: IRequest, env: any) {
		try {
			const { data, error } = await connectDB(env)
				.from('instances')
				.select(`*, from:creator(identifier, display_name)`, { count: 'exact' })
				.eq('id', request.params.id)
				.single();

			if (error) {
				throw new Error("Failed to retrieve VM details.");
			}

			return {
				data,
				message: 'VM instance retrieved successfully.',
			}
		} catch (error) {
			return {
				message: error instanceof Error ? error.message : 'An unexpected error occurred.'
			}
		}
	}
}


export class CreateInstance extends OpenAPIRoute {
	static schema = {
		tags: ['Instances'],
		summary: 'Create a new VM instance',
		responses: {
			'201': {
				description: 'New instance created successfully',
				schema: {
					data: [VmInstance],
					message: new Str(),
				},
			},
		},
	}

	async handle(request: IRequest, env: any) {
		try {
			const payload = await request.json();

			const parsedPayload = createVmSchema.safeParse(payload);

			if (!parsedPayload.success) {
				throw new Error(parsedPayload.error.message);
			}

			const { data, error } = await connectDB(env)
				.from('instances')
				.insert({
					...parsedPayload.data,
					creator: env.user,
					last_updated_at: new Date(),
				})
				.select('*')
				.single();

			if (error) {
				throw new Error(`Failed to create new vm instance. Reason - ${error.message}`);
			}

			return {
				data,
				message: 'VM created successfully.'
			}
		} catch (error) {
			return {
				message: error instanceof Error ? error.message : 'An unexpected error occurred.'
			}
		}
	}
}


export class UpdateInstanceStatus extends OpenAPIRoute {
	static schema = {
		tags: ['Instances'],
		summary: 'Update VM instance status',
		responses: {
			'200': {
				description: 'Instance status updated successfully',
				schema: {
					data: VmInstance,
					message: new Str(),
				},
			},
			'400': {
				description: 'Invalid request payload',
				schema: {
					message: new Str(),
				},
			}
		},
	}

	async handle(request: IRequest, env: any) {
		try {

			const payload = await request.json();
			const parsedPayload = updateVmSchema.safeParse(payload);

			if (!parsedPayload.success) {
				return {
					message: 'Invalid request payload.'
				}
			}

			const { data: instance, status } = await connectDB(env).from('instances').select().eq('id', request.params.id).single()

			if (status != 200) {
				throw new Error("Failed to fetch vm instance details.");
			}

			// since we don't have actual metrics data, we'll generate random values for now.
			// random values will be generated for cpu, memory, and disk usage.
			// this is for when status is terminated.
			// this is just for demo purposes.
			if (parsedPayload.data.status === "TERMINATED") {
				await connectDB(env).from('metrics').insert({
					instance: request.params.id,
					memory: Math.random() * Math.min(100, instance.memory),
					disk: Math.random() * Math.min(100, instance.disk),
					created_at: new Date(),
					last_updated_at: new Date(),
				}).eq('instance', request.params.id)
			}

			const { data, error } = await connectDB(env)
				.from('instances')
				.update({
					status: parsedPayload.data.status,
					last_updated_at: new Date(),
				})
				.eq('id', request.params.id)
				.select(`*, from:creator(identifier, display_name)`)
				.single();


			if (error) {
				console.log(error.message)
				throw new Error("Failed to update vm instance status.");
			}

			return {
				data,
				message: parsedPayload.data.status === "TERMINATED" ? "VM stopped successfully." :
					parsedPayload.data.status === "RUNNING" ? "VM started successfully." : "VM paused successfully."
			}
		} catch (error) {
			return {
				message: error instanceof Error ? error.message : 'An unexpected error occurred.'
			}
		}
	}
}

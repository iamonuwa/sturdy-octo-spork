import {
	DateOnly,
	Int,
	OpenAPIRoute,
	Query,
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

export class InstanceList extends OpenAPIRoute {
	static schema = {
		tags: ['Instances'],
		summary: 'Fetch VMs list for current user',
		responses: {
			'200': {
				description: 'VMs list fetched successfully',
				schema: {
					metadata: {},
					data: [VmInstance],
					message: new Str(),
					count: new Int(),
				},
			},
		},
	}

	async handle(request: IRequest, env: any, context: any, data: Record<string, any>) {
		try {
			const { data, error, count } = await connectDB(env)
				.from('vms')
				.select('*', { count: 'exact' })
				// .eq('creator', env.user)
				.order('created_at', { ascending: false })

			if (error) {
				console.error('Supabase error:', error.message);
				throw new Error(`Failed to retrieve VMs. Reason - ${error.message}`);
			}

			return {
				data,
				message: 'VMs retrieved successfully.',
				count
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

	async handle(request: IRequest, env: any, context: any, data: Record<string, any>) {
		try {
			const payload = await request.json();
			const parsedPayload = createVmSchema.safeParse(payload);
			if (!parsedPayload.success) {
				return {
					message: 'Invalid request payload.'
				}
			}

			const { data, error } = await connectDB(env)
				.from('vms')
				.insert({
					...parsedPayload.data,
					last_updated_at: new Date(),
				})

			if (error) {
				console.error('Supabase error:', error.message);
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

	async handle(request: IRequest, env: any, context: any, data: Record<string, any>) {
		try {
			const payload = await request.json();
			const parsedPayload = updateVmSchema.safeParse(payload);

			if (!parsedPayload.success) {
				return {
					message: 'Invalid request payload.'
				}
			}

			const { data, error } = await connectDB(env)
				.from('vms')
				.update({ status: parsedPayload.data.status, last_updated_at: new Date() })
				.eq('id', request.params.id)
				.select('*');

			if (error) {
				throw new Error(`Failed to update vm instance status. Reason - ${error.message}`);
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

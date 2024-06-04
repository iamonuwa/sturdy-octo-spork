import { IRequest } from 'itty-router';
import { connectDB } from '../utils/supabase';

export const listVms = async (request: IRequest, env: Env): Promise<Response> => {
	try {
		const { data, error, count } = await connectDB(env)
			.from('vms')
			.select('*', { count: 'exact' });

		if (error) {
			console.error('Supabase error:', error.message);
			return new Response(
				JSON.stringify({ message: 'Failed to retrieve VMs.' }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		return new Response(
			JSON.stringify({ count, data, message: 'VMs retrieved successfully.' }),
			{ headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		console.error('Unexpected error:', error);
		const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
		return new Response(
			JSON.stringify({ message }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};

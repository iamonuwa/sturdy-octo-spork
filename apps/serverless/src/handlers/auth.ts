import { IRequest } from 'itty-router';
import { connectDB } from '../utils/supabase';

export const authUser = async (request: IRequest, env: Env): Promise<Response> => {
	try {
		const payload = await request.json();

		if (!payload) {
			return new Response(
				JSON.stringify({ message: 'Invalid request payload.' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const { data, error } = await connectDB(env)
			.from('users')
			.select('email')

		if (error) {
			console.error('Supabase error:', error.message);
			return new Response(
				JSON.stringify({ message: 'Failed to create VM.' }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		return new Response(
			JSON.stringify({ data, message: 'VM created successfully.' }),
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

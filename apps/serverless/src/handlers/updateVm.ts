import { IRequest } from 'itty-router';
import { connectDB } from '../utils/supabase';
import { updateVmSchema } from "@machines/model/vm"

export const updateVm = async (request: IRequest, env: Env): Promise<Response> => {
	try {
		const payload = await request.json();
		const parsedPayload = updateVmSchema.safeParse(payload);

		if (!parsedPayload.success) {
			return new Response(
				JSON.stringify({
					message: 'Invalid request payload.'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const { data, error } = await connectDB(env)
			.from('vms')
			.update({ status: parsedPayload.data.status, last_updated_at: new Date() })
			.eq('id', request.params.id)
			.select('*');

		if (error) {
			console.error('Supabase error:', error.message);
			return new Response(
				JSON.stringify({ message: 'Failed to update VM.' }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const message = parsedPayload.data.status === "TERMINATED" ? "VM stopped successfully." :
			parsedPayload.data.status === "RUNNING" ? "VM started successfully." : "VM paused successfully."

		return new Response(
			JSON.stringify({ data: data[0], message }),
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

export const handleCors = (request) => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	};

	if (request.method === 'OPTIONS') {
		return new Response(null, {
			status: 204,
			headers,
		});
	}

	return headers;
}

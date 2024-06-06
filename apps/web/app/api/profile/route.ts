import { handleLogin } from '@auth0/nextjs-auth0';

// @ts-ignore
export default async function POST(req, res) {
    try {
        const response = await handleLogin(req, res);
        console.log('response', response);
        return new Response(JSON.stringify({
            ...response,
            user: await response.json()
        }), { status: 200 });
    } catch (error) {
        console.error(error);
        let message = 'An error occurred';
        let status = 500;
        if (error instanceof Error) {
            message = error.message;
            status = 400;
        }
        return new Response(message, { status });
        // res.status(status).end(message);
    }
}

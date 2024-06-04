import { Router } from 'itty-router';
import { listVms } from './handlers/list';

const router = Router();
const quoteMessage = "APIs are the bridges that connect different software systems, enabling seamless integration and communication in the digital world.";

const handleQuote = () => new Response(JSON.stringify({
	message: quoteMessage,
}), { status: 404 });

router
	.get('/', handleQuote)
	.get('/apis', handleQuote)
	.get('/apis/vms', listVms)
	.all('*', () => new Response(JSON.stringify({
		message: 'Requested resource not found',
	}), { status: 404 }));

export default router;

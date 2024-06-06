import { Router } from 'itty-router';
import { authUser } from './handlers/auth';
import { createVm } from './handlers/createVm';
import { fetchVmMetrics } from './handlers/metrics';
import { listVms } from './handlers/listVms';
import { updateVm } from './handlers/updateVm';

const router = Router();
const quoteMessage = "APIs are the bridges that connect different software systems, enabling seamless integration and communication in the digital world.";

const handleQuote = () => new Response(JSON.stringify({
	message: quoteMessage,
}), { status: 404 });

router
	.get('/', handleQuote)
	.get('/apis', handleQuote)
	.get('/apis/vms', listVms)
	.get(`/apis/vms/:id/metrics`, fetchVmMetrics)
	.patch(`/apis/vms/:id`, updateVm)
	.post('/apis/vms', createVm)
	.post('/apis/auth', authUser)
	.all('*', () => new Response(JSON.stringify({
		message: 'Requested resource not found',
	}), { status: 404 }));

export default router;

import { Request } from 'itty-router';

declare module 'itty-router' {
	export interface Request {
		user?: string;
	}
}

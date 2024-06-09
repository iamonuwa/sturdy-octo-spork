import { JwtPayload, verify } from "jsonwebtoken";

interface DecodedToken extends JwtPayload { }

export function verifyToken(token: string): Promise<DecodedToken> {
	return new Promise((resolve, reject) => {
		verify(token, "1ac4a80432e44b82a050ef85bd63c7f2", {
			algorithms: ['RS256'],
		}, (err, decoded) => {
			if (err) {
				return reject(err);
			}
			resolve(decoded as DecodedToken);
		});
	});
}

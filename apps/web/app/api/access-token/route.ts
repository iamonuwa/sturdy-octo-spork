import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0/edge';

import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const GET = withApiAuthRequired(async () => {
    const session = await getSession();

    return NextResponse.json(session?.idToken || {});
});

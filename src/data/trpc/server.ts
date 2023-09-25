import getAuthSession from '../auth/getAuthSession';
import { trpcRouter } from './routers/main';

export async function createServerTRPCCaller() {
    const session = await getAuthSession();
    return trpcRouter.createCaller({ session });
}

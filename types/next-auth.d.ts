import 'next-auth';
import { User } from '../src/models/User';

declare module 'next-auth' {
    interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        idToken?: string;
        user: User;
    }
}

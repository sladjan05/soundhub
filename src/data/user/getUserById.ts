import { User, schema_user } from '@/models/User';
import { prisma } from '../prisma';

export default async function getUserById({
    id
}: {
    id: User['id'];
}): Promise<User | null> {
    const object = await prisma.user.findUnique({
        where: { id: id }
    });

    return schema_user.parse(object);
}

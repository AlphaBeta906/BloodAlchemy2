import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const get = async ({ params, request }) => {
    if (params.username !== undefined) {
        if (typeof params.username === 'string' || params.username instanceof String) {
            return new Response(null, {
                status: 400,
                statusText: "Invalid username",
            });
        }

        const getUser = await prisma.users.findUnique({
            where: {
                username: params.username
            }
        })

        if (getUser === null) {
            return new Response(null, {
                status: 404,
                statusText: "Not found",
            });
        }

        return new Response(JSON.stringify(getUser), {
            status: 200,
        });
    }

    return new Response(null, {
        status: 500,
        statusText: "TBA",
    });
}
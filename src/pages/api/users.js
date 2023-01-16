import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const get = async ({ request }) => {
    const url = new URL(request.url)
    const params = new URLSearchParams(url.search)

    if (params.get('username') !== undefined) {
        const getUser = await prisma.users.findUnique({
            where: {
                username: params.get('username') 
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

    console.log(params)

    return new Response(null, {
        status: 500,
        statusText: "sar",
    });
}
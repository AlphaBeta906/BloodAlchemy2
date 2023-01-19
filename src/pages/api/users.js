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
                status: 204
            });
        }

        return new Response(JSON.stringify(getUser), {
            status: 200,
        });
    }

    console.log(params)

    return new Response(null, {
        status: 501,
    });
}

export const post = async ({ request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        const body = await request.json();
        const name = body.name;

        console.log(name)
        
        return new Response(JSON.stringify({
            message: "Your name was: " + name
        }), {
            status: 200
        })
    }
    return new Response(null, { status: 400 });
}
import { PrismaClient } from '@prisma/client'
import { scryptSync, randomBytes } from 'crypto'

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
        status: 204,
    });
}

export const post = async ({ request }) => {
    const body = await request.json();

    const keysToCheck = ["username", "password"]

    const hasAllKeys = keysToCheck.every(key => Object.keys(body).includes(key))

    if (!hasAllKeys) {
        return new Response(null, {
            status: 422    
        })
    }

    const salt = randomBytes(16).toString("hex")
    const getHash = (password) => scryptSync(password, salt, 32).toString("hex");

    await prisma.users.create({
        data: {
            username: body.username,
            password: getHash(body.password),
            elements: [],
            watts: 100,
            barrels: [],
            salt: salt,
            date_of_creation: new Date()
        }
    });

    return new Response(null, {
        status: 200    
    })
}
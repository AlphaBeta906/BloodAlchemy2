import { PrismaClient } from '@prisma/client'
import { scryptSync, randomBytes } from 'crypto'
import { DateTime } from "luxon";
import toJSON from '../../scripts/toJSON';

const prisma = new PrismaClient();

/**
 * It gets the username from the URL, then it checks if the user exists, and if it does, it returns the
 * user's data
 * @returns A user object
 */
export const get = async ({ request }) => {
    const url = new URL(request.url)
    const params = new URLSearchParams(url.search)

    if (params.get('username') !== undefined) {
        const getUser = await prisma.user.findUnique({
            where: {
                username: params.get("username")
            }
        });

        if (getUser === null) {
            return new Response(null, {
                status: 204
            });
        }

        return new Response(toJSON(getUser), {
            status: 200,
        });
    }

    return new Response(null, {
        status: 204,
    });
}

/**
 * It takes a request, checks if it has the required keys, and if it does, it creates a new user in the
 * database
 * @returns A new response with a status of 201
 */
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

    await prisma.user.create({
        data: {
            username: body.username,
            password: getHash(body.password),
            elements: [0, 1, 2, 3],
            watts: 100,
            barrels: [],
            salt: salt,
            date_of_creation: DateTime.utc().toJSDate()
        }
    });

    return new Response(null, {
        status: 201    
    })
}
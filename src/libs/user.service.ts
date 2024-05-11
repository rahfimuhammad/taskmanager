import prisma from "./prisma";

export const signIn = async (email: string) => {

    const user = await prisma.users.findUnique({
        where: {
            email
        },
    })

    return user
}
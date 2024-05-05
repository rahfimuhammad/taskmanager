import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

type User = {
    username: string;
    email: string;
    avatar: string;
    password: string;
};

type ErrorResponse = {
    message: string;
};

export  default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User[] | User | ErrorResponse>,
) {
    if (req.method === "POST") {
    const { username, email, avatar, password } = req.body;

        try {
            const newUser = await prisma.users.create({
                data: {
                    username,
                    email,
                    avatar,
                    password,
                    },
            });

            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error creating task:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST", "PATCH"]);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}

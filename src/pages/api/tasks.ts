// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/libs/prisma";

// type Data = {
//     tasks: {
//     id: string
//     createdAt: string;
//     title: string;
//     description: string;
//     completed: boolean;
//     important: boolean;
//     }[]
// };

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }

// const tasks = [
//     {
//         id: '1',
//         createdAt: '2022-01-01',
//         title: 'Write a code',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nisi iusto earum odit repellat ad.',
//         completed: false,
//         important: false
//     },
//     {
//         id: '2',
//         createdAt: '2022-01-02',
//         title: 'Lean nextjs',
//         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nisi iusto earum odit repellat ad.',
//         completed: true,
//         important: false
//     },
//     {
//         id: '3',
//         createdAt: '2022-01-03',
//         title: 'Get data from api',
//         description: 'Lorem ipsum dolor sit',
//         completed: false,
//         important: false
//     }
// ]
        

// export default function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Data>,
// ) {

//     if(req.method === "GET") {
//         res.status(200).json({ tasks });
//     } else if (req.method === "POST") {
//         res.status(200).json({ tasks });
//     }
// }

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

type Task = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    status: boolean;
    important: boolean;
    userId: string;
};

type ErrorResponse = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Task[] | Task | ErrorResponse>
) {
    if (req.method === "GET") {
        const userId = req.query.userId as string;

        try {
            const tasks = await prisma.tasks.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

            res.status(200).json(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    
    } else if (req.method === "POST") {
    const { title, description, createdAt, status, important, userId } = req.body;

        try {
            const formattedcreatedAt = new Date(createdAt);
            const newTask = await prisma.tasks.create({
                data: {
                    title,
                    description,
                    createdAt: formattedcreatedAt,
                    status,
                    important,
                    userId,
                    },
            });

            res.status(201).json(newTask);
        } catch (error) {
            console.error("Error creating task:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else if (req.method === "PATCH") {
        const { id, title, description, createdAt, status, important } = req.body;

        try {
        const updatedTask = await prisma.tasks.update({
            where: {
            id,
        },
            data: {
            title,
            description,
            createdAt,
            status,
            important,
            },
        });

        res.status(200).json(updatedTask);
        } catch (error) {
            console.error("Error updating task:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    
    } else if (req.method === "DELETE") {
        const id = req.query.id as string;

        try {
        const deletedTask = await prisma.tasks.delete({
            where: {
                id,
            },
        });

            res.status(200).json(deletedTask);
        } catch (error) {
            console.error("Error deleting task:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST", "PATCH"]);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}

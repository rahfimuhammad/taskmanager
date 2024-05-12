import { NextApiRequest, NextApiResponse } from "next";
import { createTask, deleteTask, getTasks, updateTask } from "@/libs/taks.service";

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
        const filter = req.query.filter as string;

        try {
            const tasks = await getTasks(userId, filter)
            res.status(200).json(tasks);

        } catch (error) {

            res.status(500).json({ message: "Internal server error" });
        }
    
    } else if (req.method === "POST") {

        const data = req.body

        try {
            const newTask = await createTask(data)
            res.status(201).json(newTask);

        } catch (error) {
            
            res.status(500).json({ message: "Internal server error" });
        }

    } else if (req.method === "PATCH") {
        const data = req.body
        
        try {
            const updatedTask = await updateTask(data);
            res.status(200).json(updatedTask);

        } catch (error) {
            
            res.status(500).json({ message: "Internal server error" });
        }
    
    } else if (req.method === "DELETE") {
        const id = req.query.id as string;

        try {
            const deletedTask = await deleteTask(id);
            res.status(200).json(deletedTask);

        } catch (error) {
            
            res.status(500).json({ message: "Internal server error" });
        }

    } else {
        res.setHeader("Allow", ["GET", "POST", "PATCH"]);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}

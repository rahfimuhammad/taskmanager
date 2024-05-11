import prisma from "./prisma";

export const getTasks = async (userId: string, filter: string) => {
    let where: any = {
        userId,
    } as any;

    if (filter === "important") {
        where.important = true
    } else if(filter === "completed") {
        where.status = true
    } else if(filter === "incomplete") {
        where.status = false
    }

    const tasks = await prisma.tasks.findMany({
        where,
        orderBy: {
            createdAt: 'desc'
        }
    })

    return tasks
}

export const createTask = async (data: any) => {
    const formattedcreatedAt = new Date(data.createdAt);
    
    const newTask = await prisma.tasks.create({
        data: {
            title: data.title,
            description: data.description,
            createdAt: formattedcreatedAt,
            status: data.status,
            important: data.important,
            userId: data.userId,
            },
    });

    return newTask
}

export const updateTask = async (data: any) => {
    
    const updatedTask = await prisma.tasks.update({
        where: {
        id: data.id,
    },
        data: {
        title: data.title,
        description: data.description,
        createdAt: data.createdAt,
        status: data.status,
        important: data.important,
        },
    });

    return updatedTask
}

export const deleteTask = async (taskId: string) => {
    const deletedtask =await prisma.tasks.delete({
        where: {
            id: taskId
        }
    })

    return deletedtask
}
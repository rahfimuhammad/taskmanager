import React, { createContext, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

interface TaskContextType {
    task: any;
    setTask: React.Dispatch<React.SetStateAction<any>>;
    filter: string | ''
    setFilter: React.Dispatch<React.SetStateAction<string>>
    loading: boolean;
    getTasks: () => void
    createTask: (data: any) => void
    updateTask: (data: any) => void
    deleteTask: (taskId: any) => void
    children?: React.ReactNode
}

const TaskContext = createContext<TaskContextType | null>(null);

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
};

const TaskProvider: React.FC<TaskContextType> = ({ children }) => {

    const [task, setTask] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [filter, setFilter] = React.useState('');
    const toast = useToast()
    const { data }: any = useSession()
    const userId = data?.user?.id

    const getTasks = () => {

        try {
            setLoading(true)
            console.log('test', data)
            fetch(`/api/tasks?userId=${userId}&filter=${filter}`)
                .then((res) => res.json())
                .then((data) => 
                    setTask(data),
                )
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const createTask = async (data: any) => {

        try {
            setLoading(true)
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast({
                    position: 'top',
                    title: 'Task created successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    position: 'top',
                    title: 'Failed to create task',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
            getTasks()
        } catch (error) {
            console.log('Error occurred while posting data:', error);
        } finally {
            setLoading(false)
        }
    }

    const updateTask = async (data: any) => {
        try {
            setLoading(true)
            const response = await fetch('/api/tasks', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast({
                    position: 'top',
                    title: 'Task updated successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    position: 'top',
                    title: 'Failed to update task',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
            getTasks()
        } catch (error) {
            console.log('Error occurred while posting data:', error);
        } finally {
            setLoading(false)
        }
    }

    const deleteTask = async (taskId: string) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/tasks?id=${taskId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast({
                    position: 'top',
                    title: 'Task deleted successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    position: 'top',
                    title: 'Failed to delete task',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,})
            }
            getTasks()
        } catch (error) {
            console.log('Error occurred while posting data:', error);
        } finally {
            setLoading(false)
        }        
    }

    const value: TaskContextType = {
        task,
        setTask,
        loading,
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        setFilter,
        filter
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider

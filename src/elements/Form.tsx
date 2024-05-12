'use client'
import { Checkbox, CheckboxGroup, FormControl, Input, Stack, Textarea } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import ModalElement from './ModalElement'
import { useTask } from '@/context/TaskProvider'
import { useSession } from 'next-auth/react'

interface FormProps {
    isOpen: boolean
    onClose: () => void
    task: any
}

const Form: React.FC<FormProps> = ({ task, onClose, isOpen }) => {

    const { createTask, updateTask } = useTask()
    const { data }: any = useSession()
    const userId: string = data?.user?.id || '';
    const [taskData, setTaskData] = useState<any>({
        id: '',
        title: '',
        description: '',
        createdAt: '',
        status: false,
        important: false,
        userId: userId
    });

    useEffect(() => {
        if (task) {
            setTaskData({
                id: task.id || '',
                title: task.title || '',
                description: task.description || '',
                createdAt: task.createdAt || '',
                status: task.status || false,
                important: task.important || false,
                userId: task.userId || userId
            });
        } else {
            setTaskData({
                id: '',
                title: '',
                description: '',
                createdAt: '',
                status: false,
                important: false,
                userId: userId
            });
        }
    }, [task, userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setTaskData((prevData: any) => ({
            ...prevData,
            [name]: newValue
        }));
    };

    const onCreate = async () => {
        createTask(taskData)
        onClose()
    };

    const onEdit = async () => {
        updateTask(taskData)
        onClose()
    };

    const handleSubmit = () => {
        if (task.id) {
            onEdit();
        } else {
            onCreate();
        }
    };

    return (
        <ModalElement 
                isOpen={isOpen} 
                onClose={onClose}
                onAction={handleSubmit}
                title={task.id ? 'Edit Task' : 'Create Task'}
        >
            <FormControl
                display='flex'
                flexDirection='column'
                gap={3}
                color='white'
            >
                <label htmlFor="title">Title</label>
                <Input
                    name='title'
                    onChange={handleChange}
                    defaultValue={task.title} 
                    placeholder='e.g. Write a code'
                    border='none'
                    bg='#000000'
                    _placeholder={{ opacity: 1, color: '#888' }}    
                />
                <label htmlFor="description">Description</label>
                <Textarea
                    name='description'
                    onChange={handleChange}
                    defaultValue={task.description} 
                    placeholder='e.g. Write a code in nextjs'
                    border='none'
                    resize='none'
                    bg='#000000'
                    _placeholder={{ opacity: 1, color: '#888' }} 
                />
                <label htmlFor="date">Date</label>
                <Input
                    name='createdAt'
                    onChange={handleChange}
                    defaultValue={task.createdAt} 
                    w='fit-content' 
                    type='datetime-local'
                    border='none'
                    bg='#000000'
                    placeholder='Date'
                    _placeholder={{ opacity: 1, color: '#888' }}
                    sx={{
                        '&::-webkit-calendar-picker-indicator': {
                            filter: 'invert(1)',
                        }
                    }}
                />
                <CheckboxGroup colorScheme='green' defaultValue={[taskData.important, taskData.status]}>
                    <Stack spacing={[1, 5]} direction='column'>
                    <Checkbox
                        name="important"
                        onChange={handleChange}
                        isChecked={taskData.important}
                    >
                        Important
                    </Checkbox>
                    <Checkbox
                        name="status"
                        onChange={handleChange}
                        isChecked={taskData.status}
                    >
                        Completed
                    </Checkbox>
                    </Stack>
                </CheckboxGroup>
            </FormControl>
        </ModalElement>    
    )
}

export default Form





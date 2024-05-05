'use client'
import { Checkbox, CheckboxGroup, FormControl, Input, Stack, Textarea } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import ModalElement from './ModalElement'
import { useTask } from '@/context/TaskProvider'

interface FormProps {
    isOpen: boolean
    onClose: () => void
    task: any
}

const Form: React.FC<FormProps> = ({ task, onClose, isOpen }) => {

    const { createTask, updateTask } = useTask()
    const [data, setData] = useState<any>({
        id: '',
        title: '',
        description: '',
        createdAt: '',
        status: false,
        important: false,
        userId: 'ee9eee7c-d084-4dda-910c-34cd6661711a'
    });

    useEffect(() => {
        if (task) {
            setData({
                id: task.id || '',
                title: task.title || '',
                description: task.description || '',
                createdAt: task.createdAt || '',
                status: task.status || false,
                important: task.important || false,
                userId: task.userId || 'ee9eee7c-d084-4dda-910c-34cd6661711a'
            });
        } else {
            setData({
                id: '',
                title: '',
                description: '',
                createdAt: '',
                status: false,
                important: false,
                userId: 'ee9eee7c-d084-4dda-910c-34cd6661711a'
            });
        }
    }, [task]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setData((prevData: any) => ({
            ...prevData,
            [name]: newValue
        }));
    };

    const onCreate = async () => {
        createTask(data)
        onClose()
    };

    const onEdit = async () => {
        updateTask(data)
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
                    type='date'
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
                <CheckboxGroup colorScheme='green' defaultValue={[data.important, data.status]}>
                    <Stack spacing={[1, 5]} direction='column'>
                    <Checkbox
                        name="important"
                        onChange={handleChange}
                        isChecked={data.important}
                    >
                        Important
                    </Checkbox>
                    <Checkbox
                        name="status"
                        onChange={handleChange}
                        isChecked={data.status}
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
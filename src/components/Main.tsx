import React, { useEffect, useState } from 'react'
import { Box, useDisclosure } from '@chakra-ui/react'
import Card from '@/elements/Card'
import { IsSmallScreen } from '@/hooks/useDetectScreen'
import Form from '@/elements/Form'
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useTask } from '@/context/TaskProvider'

interface DataItem {
    id: string
    createdAt: string;
    title: string;
    description: string;
    completed: boolean;
    important: boolean;
}

const Main = () => {

    const isSmall = IsSmallScreen()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [taskData, setTaskData] = useState<any>({});
    const { task, getTasks } = useTask()

    useEffect(() => {
        getTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleModalEdit = (task: any) => {
        onOpen()
        setTaskData(task)
    }

    const handleModalCreate = () => {
        onOpen()
    }

    const handleModalClose = () => {
        setTaskData({})
        onClose()
    }
    
    return (
        <Box 
            h='100vh'
            w={isSmall ? '100%' : 'calc(100% - 260px)'}
            display='flex'
            flexDirection='column'
            alignItems='center' 
            bg='#000000'  
            overflowY='auto'
            p='15px 0'
            gap='15px'
        >
            <Box
                position='absolute'
                right='20px'
                top='20px'
                w='40px'
                h='40px'
                borderRadius='50%'
                display='flex'
                justifyContent='center'
                alignItems='center'
                border='1px solid rgb(136, 136, 136)'
                bg='#242424'
                cursor='pointer'
                onClick={handleModalCreate}
            >
                <PlusOutlined onClick={handleModalCreate} style={{fontSize: '20px', color: 'rgb(136, 136, 136)'}}/>
            </Box>
            <Box 
                w='100%' 
                h='fit-content'
                color='white'
                p='10px 15px 10px 0'
                paddingLeft={isSmall ? '45px' : '15px'}    
                fontSize='20px'
                fontWeight='bold'
                display='flex'
                flexDirection='column'
                gap='5px'
            >
                <h1>All Tasks</h1>
                <hr style={{width: "60px", border: "2px solid #eef2f6"}}/>
            </Box>
            <Box
                w='100%'
                display='grid'
                gridTemplateColumns='repeat(auto-fill, minmax(300px, 1fr))'
                gap={3}
                h='fit-content'
                p='0 15px'
            >
                {task?.map((task: any) => (
                    <Card 
                        onOpen={() => handleModalEdit(task)} 
                        key={task.id} 
                        task={task}
                    />
                ))}
                <Box
                    w='100%'
                    border='1px solid #242424'
                    bg='rgba(36, 36, 36, 0.4)'
                    borderRadius='11px'
                    cursor='pointer'
                    color='#b8bcc4'
                    fontWeight='bold'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    h='220px'
                    onClick={() => handleModalCreate()}
                >
                    <Box
                        display='flex'
                        gap='10px'
                        alignItems='center'
                    >
                        <p style={{fontSize: '20px', fontWeight: 'bold'}}>Create Task</p>
                        <PlusCircleOutlined style={{ color: '#b8bcc4', fontSize: '24px' }}/>
                    </Box>
                </Box>
            </Box>
            <Form 
                    task={taskData} 
                    isOpen={isOpen} 
                    onClose={handleModalClose}
            />
        </Box>
    )
}

export default Main
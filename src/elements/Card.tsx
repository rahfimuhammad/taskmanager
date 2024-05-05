import { Box, Button, Text } from '@chakra-ui/react'
import { formatDate } from '../hooks/useFormatdate'
import EditFilled  from '@ant-design/icons/EditFilled';
import DeleteFilled  from '@ant-design/icons/DeleteFilled';
import React from 'react'

interface CardProps {
    onOpen: () => void;
    task: any
}

const Card: React.FC<CardProps> = ({ onOpen, task }) => {
    return (

        <Box
            w='100%'
            h='220px'
            borderRadius='12px'
            p='1px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            bg={task.status?  'conic-gradient(from 180deg at 50% 50%, #333 0deg, #333 176deg, #61dafb 193deg, #333 217deg, #333 1turn);' :
            'conic-gradient(from 0deg at 50% 50%, #333 0deg, #333 3deg, #333 328deg, #df2e6c 349deg, #333 1turn)'}
        >
            <Box 
                w='100%'  
                bg='linear-gradient(180deg, #242424, #121212 65.62%)'
                boxShadow=' 0 1px 0 1px rgba(0, 0, 0, .02), 0 4px 6px rgba(0, 0, 0, .02), inset 0 0 0 6px #111' 
                borderRadius='11px'
                p='15px'
                color='white'
                display='flex'
                flexDirection='column'
                gap='10px'
                justifyContent='space-between'
                h='100%'
        >
            <Box 
                width='100%'
                display='flex'
                flexDirection='column'
                gap={1}
            >
                <h1 style={{fontWeight: 'bold', fontSize: "20px"}}>{task.title}</h1>
                <p style={{color: '#888'}}>{task.description}</p>
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                gap='15px'    
            >
                <Text style={{fontSize: "14px"}}>{formatDate(task.createdAt)}</Text>
                <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                >
                    <Button borderRadius={15} size='sm' colorScheme={task.status? "gray" : "red"}>
                        {task.status? "Complete" : "Incomplete"}
                    </Button>
                    <Box
                        display='flex'
                        gap={4}
                        alignItems='center'
                    >
                        <EditFilled onClick={onOpen} style={{ cursor: 'pointer', color: '#b8bcc4', fontSize: '24px' }}/>
                        <DeleteFilled style={{ cursor: 'pointer', color: '#b8bcc4', fontSize: '24px' }}/>
                    </Box>
                </Box>
            </Box>
        </Box>
        </Box>
        
    )
}

export default Card
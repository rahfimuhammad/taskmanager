import React from 'react'
import Sidebar from '@/components/Sidebar'
import Main from '@/components/Main'
import { Box } from '@chakra-ui/react'

const layout = () => {
    return (
        <Box w='100%' h='100vh' display='flex 'bg='#171717'>
            <Sidebar />
            <Main />
        </Box>
    )
}

export default layout
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import { Box } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
    return (
        <Box
            zIndex='2'
            w='100%'
            h='100%'
            position='absolute'
            top='0'
            right='0'
            display='flex'
            justifyContent='center'
            alignItems='center'
            bg='rgba(0,0,0,0.5)'
        >
            <LoadingOutlined
                style={{color: '#b8bcc4', 
                        fontSize: '24px'}}
            />
        </Box>
    )
}

export default Loading
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Avatar, Box } from '@chakra-ui/react'

const ProfileElement = () => {

    const { data }: any = useSession()

    return (
        <Box
            w='90%'
            display='flex'
            gap='15px'
            alignItems='center'
            color='white'
            cursor='pointer'
            onClick={() => signOut()}
        >
            <Avatar 
                src={data?.user?.avatar}
                size='md' 
            />
            <h1 style={{
                    maxWidth: '150px', 
                    fontSize: '20px', 
                    fontWeight: 'bold'}}
            >
                {data?.user?.username}
            </h1>
        </Box>
    )
}

export default ProfileElement
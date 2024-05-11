import React from 'react'
import Profile from '../assets/profile.png'
import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

const ProfileElement = () => {

    const { data }: any = useSession()

    return (
        <Box
            w='90%'
            display='flex'
            gap='15px'
            alignItems='center'
            color='white'
            onClick={() => signOut()}
        >
            <Image src={Profile} alt='logo' width={60} height={60} style={{borderRadius: '50%'}}/>
            <h1 style={{fontSize: '20px', fontWeight: 'bold'}}>{data?.user?.email}</h1>
        </Box>
    )
}

export default ProfileElement
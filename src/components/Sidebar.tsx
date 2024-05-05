import { IsSmallScreen } from '@/hooks/useDetectScreen'
import MenuOutlined  from '@ant-design/icons/MenuOutlined'
import AlertFilled from '@ant-design/icons/AlertFilled'
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled'
import CopyFilled from '@ant-design/icons/CopyFilled'
import HomeFilled from '@ant-design/icons/HomeFilled'
import { Box, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import Image from 'next/image'
import Profile from '../assets/profile.png'
import CalculatorFilled from '@ant-design/icons/CalculatorFilled'
import CalendarFilled from '@ant-design/icons/CalendarFilled'
import TranslationOutlined from '@ant-design/icons/lib/icons/TranslationOutlined'
import Calculator from '@/elements/Calculator'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Sidebar = () => {

    const isSmall = IsSmallScreen()
    const [active, setIsActive] = useState<boolean | null>(null);
    const [activeTab, setActiveTab] = useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    const handleClick = (link: string, index: number) => {
        router.push(link)
        setActiveTab(index)
    }

    const tabs = [
        {   title: 'All Tasks', 
            icon: HomeFilled,
            link: '/'
        },
        {   title: 'Completed', 
            icon: CheckCircleFilled,
            link: '/completed'
        },
        {   title: 'Important', 
        icon: AlertFilled,
        link: '/important'
        },
        {   title: 'To Complete', 
            icon: CopyFilled,
            link: '/tocomplete'
        }
    ]

    return (
        <Box 
            w='260px' 
            h='100vh'
            p='20px 0' 
            bg='#111111'
            position={isSmall ? 'absolute' : 'relative'}
            left={isSmall && !active ? '-260px' : '0'}
            borderRight={isSmall ? '1px solid #b8bcc4' : 'none'}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            alignItems='center'
            transition='0.2s ease-in-out'
            zIndex='2'
        >
            <Box
            w='90%'
            display='flex'
            gap='15px'
            alignItems='center'
            color='white'
            onClick={() => console.log(activeTab)}
            >
                <Image src={Profile} alt='logo' width={60} height={60} style={{borderRadius: '50%'}}/>
                <h1 style={{fontSize: '20px', fontWeight: 'bold'}}>Pablo Escobar</h1>
            </Box>
            <Box
                position='absolute'
                w='40px'
                h='40px'
                right='-41px'
                zIndex='0'
                borderRadius='0px 5px 5px 0px'
                border='1px solid #b8bcc4'
                borderLeft='none'
                top='20px'
                bg='#111111'
                display={isSmall ? 'flex' : 'none'}
                justifyContent='center'
                alignItems='center'
                onClick={() => setIsActive(!active)}
            >
                <MenuOutlined style={{ color: '#b8bcc4', fontSize: '20px' }}/>
            </Box>
            <Box w='90%' h='fit-content' color='white'>

                {tabs.map((tab, index) => {
                    const Icon = tab.icon
                        return (
                            <Link
                                href={tab.link}
                                key={index} 
                                onClick={() => handleClick(tab.link, index)}
                                style={{
                                    width: '100%',
                                    height:'40px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    overflow: 'hidden',
                                    alignItems: 'center',
                                    backgroundColor: `${activeTab === index ? '#000000' : 'none'}`,
                                    borderRadius: '3px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    gap='10px'
                                    ml='10px'
                                >
                                    <Icon style={{ color: '#b8bcc4', fontSize: '20px' }}/>
                                    <p>{tab.title}</p>
                                </Box>
                                {
                                activeTab === index && <Box
                                    w='5px'
                                    h='100%'
                                    bg='#eef2f6'
                                >
                                </Box>
                                }
                        </Link>
                    )
            })}
            </Box>
            <Box
                w='90%'
                display='flex'
                gap='10px'
            >
                <CalculatorFilled style={{ color: '#b8bcc4', fontSize: '32px' }} onClick={onOpen}/>
                <CalendarFilled style={{ color: '#b8bcc4', fontSize: '32px' }}/>
                <TranslationOutlined style={{ color: '#b8bcc4', fontSize: '32px' }} />
            </Box>
            <Calculator
                isOpen={isOpen}
                onClose={onClose} 
            />
        </Box>
    )
}

export default Sidebar
import { IsSmallScreen } from '@/hooks/useDetectScreen'
import MenuOutlined  from '@ant-design/icons/MenuOutlined'
import { Box, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import CalculatorFilled from '@ant-design/icons/CalculatorFilled'
import TranslationOutlined from '@ant-design/icons/lib/icons/TranslationOutlined'
import Calculator from '@/elements/Calculator'
import Profile from '@/elements/ProfileElement'
import Dictionary from '@/elements/Dictionary'
import Menu from '@/elements/Menu'
const Sidebar = () => {

    const isSmall = IsSmallScreen()
    const [isActive, setIsActive] = useState<boolean | null>(null);
    const [activeTool, setActiveTool] = useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const tools = [
        {title: 'Calculator', icon: CalculatorFilled, component: Calculator},
        {title: 'Dictionary', icon: TranslationOutlined, component: Dictionary}
    ]

    const handleModal = (index: number) => {
        onOpen()
        setActiveTool(index)
    }

    const Modal = tools[activeTool].component

    return (
        <Box 
            w='260px' 
            h='100vh'
            p='20px 0' 
            bg='#111111'
            position={isSmall ? 'absolute' : 'relative'}
            left={isSmall && !isActive ? '-260px' : '0'}
            borderRight={isSmall ? '1px solid #b8bcc4' : 'none'}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            alignItems='center'
            transition='0.2s ease-in-out'
            zIndex='2'
        >
            <Profile/>
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
                onClick={() => setIsActive(!isActive)}
            >
                <MenuOutlined style={{ color: '#b8bcc4', fontSize: '20px' }}/>
            </Box>
            <Menu setIsActive={setIsActive}/>
            <Box
                w='90%'
                display='flex'
                gap='10px'
            >
                {tools.map((tool, index) => {
                    let Icon = tool.icon

                    return (
                        <Icon 
                            key={index}
                            style={{ 
                                color: '#b8bcc4', 
                                fontSize: '32px' }}
                            onClick={() => handleModal(index)}
                        />
                    )
                })
                }
            </Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose} 
            />
        </Box>
    )
}

export default Sidebar
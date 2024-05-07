'use client'
import React from 'react'
import { Modal, ModalBody, ModalOverlay, ModalContent, ModalFooter, ModalHeader, Button, ModalCloseButton } from '@chakra-ui/react'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import { useTask } from '@/context/TaskProvider'

interface ModalProps {
    onAction?: () => void | undefined
    onClose: () => void
    isOpen: boolean
    children: React.ReactNode
    title: string
}

const ModalElement = ({ isOpen, onClose, onAction, children, title }: ModalProps) => {

    const { loading } = useTask()

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent 
                    bg='#242424'
                    w={{base: "95%", sm: "95%", md: "500px"}}
            >
                <ModalHeader
                    color='white'
                >
                    {title}
                </ModalHeader>
                <ModalCloseButton color='white' />
                <ModalBody> 
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button 
                        colorScheme='red' 
                        mr='5px' 
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    {
                    onAction 
                    && 
                    <Button
                        transition='ease-in 0.5s'
                        colorScheme='gray'
                        onClick={onAction}
                    >
                        {loading
                        ? <LoadingOutlined />
                        : "Save"
                        }
                    </Button>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>

    )
}

export default ModalElement
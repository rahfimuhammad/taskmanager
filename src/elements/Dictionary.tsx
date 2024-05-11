import React from 'react'
import ModalElement from './ModalElement'
import { Box, Input } from '@chakra-ui/react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
}

const Dictionary: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    return (
        <ModalElement 
                isOpen={isOpen} 
                onClose={onClose}
                title="English Dictionary" 
        >
            <Box>
                <Input/>
            </Box>
        </ModalElement>
    )
}

export default Dictionary
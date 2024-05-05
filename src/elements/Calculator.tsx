import React from 'react'
import ModalElement from './ModalElement'

interface FormProps {
    isOpen: boolean
    onClose: () => void
}

const Calculator: React.FC<FormProps> = ({isOpen, onClose}) => {
    return (
        <ModalElement 
                isOpen={isOpen} 
                onClose={onClose} 
                onAction={() => {}}
        >
            <h1>Calculator</h1>
        </ModalElement>
    )
}

export default Calculator
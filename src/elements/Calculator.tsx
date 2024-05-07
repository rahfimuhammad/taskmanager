import React, { useEffect } from 'react'
import ModalElement from './ModalElement'
import { Box } from '@chakra-ui/react'

interface FormProps {
    isOpen: boolean
    onClose: () => void
}

const Calculator: React.FC<FormProps> = ({isOpen, onClose}) => {

    const [currentInput, setCurrentInput] = React.useState('');
    const [answer, setAnswer] = React.useState('0');

    useEffect(() => {
        setCurrentInput('');
        setAnswer('0');
    }, [isOpen]);

    const handleClick = (value: string) => {
        if (value === 'C') {
            setCurrentInput('');
            setAnswer('0');
        } else if (value === '<-') {
            setCurrentInput(prevInput => prevInput.slice(0, -1));
        } else if (value === '=') {
            try {
                const result = eval(currentInput);
                setAnswer(result.toString());
                console.log(result)
            } catch (error) {
                setAnswer('Error');
            }
        } else {
            setCurrentInput(prevInput => prevInput + value);
        }
    };

    const buttons = [
        {className: "fun-btn", display: "C", value: "C", id: "erase"},
        {className: "fun-btn", display: "<-", value: "", id: "clear"},
        {className: "fun-btn", display: "/", value: "/", id: ""},
        {className: "fun-btn", display: "%", value: "%", id: ""},
        {className: "num-btn", display: "7", value: "7", id: ""},
        {className: "num-btn", display: "8", value: "8", id: ""},
        {className: "num-btn", display: "9", value: "9", id: ""},
        {className: "fun-btn", display: "*", value: "*", id: ""},
        {className: "num-btn", display: "4", value: "4", id: ""},
        {className: "num-btn", display: "5", value: "5", id: ""},
        {className: "num-btn", display: "6", value: "6", id: ""},
        {className: "fun-btn", display: "-", value: "-", id: ""},
        {className: "num-btn", display: "1", value: "1", id: ""},
        {className: "num-btn", display: "2", value: "2", id: ""},
        {className: "num-btn", display: "3", value: "3", id: ""},
        {className: "fun-btn", display: "+", value: "+", id: ""},
        {className: "num-btn", display: "00", value: "00", id: ""},
        {className: "num-btn", display: "0", value: "0", id: ""},
        {className: "num-btn", display: ".", value: ".", id: ""},
        {className: "fun-btn", display: "=", value: "=", id: "evaluate"},
    ]

    return (
        <ModalElement 
                isOpen={isOpen} 
                onClose={onClose}
                title="Calculator" 
        >
            <div className="container">
                <section className="display-area">
                    <div className="currentInput">{currentInput}</div>
                    <div className="answerScreen">{answer}</div>
                </section>
                <Box
                    display='grid'
                    gridTemplateColumns='repeat(4, 1fr)'
                    gridGap='5px' 
                    className="keypad-buttons">
                    {buttons.map((button, index) => (
                        <button 
                            key={index} 
                            type="button" 
                            className={button.className} 
                            id={button.id} 
                            value={button.value}
                            onClick={() => handleClick(button.value)}
                        >
                            {button.display}
                        </button>
                    ))}
                </Box>
            </div>
        </ModalElement>
    )
}

export default Calculator
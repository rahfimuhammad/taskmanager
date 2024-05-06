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
        >
            <div className="container">
                <section className="display-area">
                    <div className="currentInput"></div>
                    <div className="answerScreen">0</div>
                </section>
                <section className="keypad-buttons">
                    <div>
                        <button type="button" className="fun-btn" id="clear" value="">C</button>
                        <button type="button" className="fun-btn" id="erase" value="">&#11013;</button>
                        <button type="button" className="fun-btn" value="/">/</button>
                        <button type="button" className="fun-btn" value="%">%</button>
                    </div>
                    <div>
                        <button type="button" className="num-btn" value="7">7</button>
                        <button type="button" className="num-btn" value="8">8</button>
                        <button type="button" className="num-btn" value="9">9</button>
                        <button type="button" className="fun-btn" value="*">*</button>
                    </div>
                    <div>
                        <button type="button" className="num-btn" value="4">4</button>
                        <button type="button" className="num-btn" value="5">5</button>
                        <button type="button" className="num-btn" value="6">6</button>
                        <button type="button" className="fun-btn" value="-">-</button>
                    </div>
                    <div>
                        <button type="button" className="num-btn" value="1">1</button>
                        <button type="button" className="num-btn" value="2">2</button>
                        <button type="button" className="num-btn" value="3">3</button>
                        <button type="button" className="fun-btn" value="+">+</button>
                    </div>
                    <div>
                        <button type="button" className="num-btn" value="00">00</button>
                        <button type="button" className="num-btn" value="0">0</button>
                        <button type="button" className="num-btn" value=".">.</button>
                        <button type="button" className="fun-btn" id="evaluate" value="">=</button>
                    </div>
                </section>
            </div>
        </ModalElement>
    )
}

export default Calculator
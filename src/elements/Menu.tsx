import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useTask } from '@/context/TaskProvider';
import AlertFilled from '@ant-design/icons/AlertFilled'
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled'
import CopyFilled from '@ant-design/icons/CopyFilled'
import HomeFilled from '@ant-design/icons/HomeFilled'

interface TabProps {
    setIsActive: React.Dispatch<React.SetStateAction<any>>;
}

const Menu: React.FC<TabProps> = ({ setIsActive }) => {

    const [activeTab, setActiveTab] = useState<number>(0);
    const { setFilter, setTitle } = useTask()

    const tabs = [
        {   title: 'All Tasks', 
            icon: HomeFilled,
            filter: ''
        },
        {   title: 'Completed', 
            icon: CheckCircleFilled,
            filter: 'completed'
        },
        {   title: 'Important', 
            icon: AlertFilled,
            filter: 'important'
        },
        {   title: 'To Complete', 
            icon: CopyFilled,
            filter: 'incomplete'
        }
    ]

    const handleTab = (index: number, filter: string, title: string) => {
        setActiveTab(index)
        setFilter(filter)
        setTitle(title)
        setIsActive(false)
    }
    return (
        <Box w='90%' h='fit-content' color='white'>

                {tabs.map((tab, index) => {
                    const Icon = tab.icon
                        return (
                            <Box
                                key={index} 
                                onClick={() => handleTab(index, tab.filter, tab.title)}
                                style={{
                                    width: '100%',
                                    height:'40px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    overflow: 'hidden',
                                    alignItems: 'center',
                                    backgroundColor: `${activeTab === index ? '#000000' : 'transparent'}`,
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
                        </Box>
                    )
            })}
            </Box>
    )
}

export default Menu
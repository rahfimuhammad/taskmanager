import React, { useEffect, useState } from 'react'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import ModalElement from './ModalElement'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import Image from 'next/image'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
}

const Dictionary: React.FC<ModalProps> = ({ isOpen, onClose }) => {

    const [word, setWord] = useState<string>('');
    const [result, setResult] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getWord = () => {
        setIsLoading(true); // Set isLoading menjadi true sebelum fetch dimulai
        try {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then((res) => res.json())
                .then((data) => {
                    setResult(data[0]);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setIsLoading(false); // Set isLoading menjadi false setelah fetch selesai
                });
        } catch (error) {
            console.log(error);
            setIsLoading(false); // Set isLoading menjadi false jika terjadi error saat fetch
        }
    };
    

    useEffect(() => {
        setResult({})
        setWord('')
    }, [isOpen])

    return (
        <ModalElement 
                isOpen={isOpen} 
                onClose={onClose}
                title="English Dictionary" 
        >
            <Box>
                <Box
                    display='flex'
                    gap='5px'
                >
                    <Input
                        type='text'
                        placeholder='Search for a word'
                        color='white'
                        border='1px solid white'
                        bg='#000000'
                        onChange={(e) => setWord(e.target.value)}
                        _placeholder={{ opacity: 1, color: '#888' }} 
                    />
                    <Button 
                        size='md'
                        onClick={() => getWord()}
                    >
                        {isLoading? (<LoadingOutlined/>) : (<SearchOutlined />)}
                    </Button>
                </Box>
                <Box color='white'>
                    {!result?.meanings || result.meanings.length === 0 ? (
                    <Box 
                        w='100%'
                        p='30px 0 15px 0'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Image src='/assets/nodata.png' alt={'nodata'} width={200} height={200} layout='auto'/>
                    </Box>
                    ) : null
                    }
                    <Box>
                        <Box 
                            p='10px 0'
                        >
                            <Text>{result?.phonetic}</Text>
                        </Box>
                        <Box
                            display='flex'
                            flexDirection='column'
                            gap='5px'
                            w='100%'
                        >
                            {result?.meanings?.map((meaning: any, index: number) => (
                                <Box
                                    key={index}
                                    display='flex'
                                    flexDirection='column'
                                    w='100%'
                                >
                                    <Box
                                        w='fit-content'
                                    >
                                        <Text><b>{meaning?.partOfSpeech}</b></Text>
                                        <hr/>
                                    </Box>
                                    <Box 
                                        w='100%'
                                    >
                                        <Text>{meaning?.definitions[0]?.definition}</Text>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ModalElement>
    )
}

export default Dictionary
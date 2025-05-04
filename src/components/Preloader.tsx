import { Box, Center, Text, keyframes } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const steam = keyframes`
  0% { opacity: 0; transform: translateY(10px) scaleX(1); }
  50% { opacity: 1; transform: translateY(-10px) scaleX(1.1); }
  100% { opacity: 0; transform: translateY(-30px) scaleX(1); }
`

export default function Preloader() {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="white"
      zIndex={9999}
      transition="opacity 0.7s"
      opacity={hide ? 0 : 1}
      pointerEvents={hide ? 'none' : 'auto'}
      display={hide ? 'none' : 'block'}
    >
      <Center h="100vh" flexDir="column">
        <Box fontSize={{ base: '64px', md: '90px' }} mb={2}>
          ☕
        </Box>
        <Box position="relative" h="20px" w="40px">
          <Box
            position="absolute"
            left="50%"
            top={0}
            transform="translateX(-50%)"
            w="20px"
            h="20px"
            borderRadius="full"
            bg="transparent"
            _before={{
              content: '""',
              display: 'block',
              w: '20px',
              h: '20px',
              borderRadius: 'full',
              bg: 'linear-gradient(180deg, #b09769 0%, transparent 100%)',
              animation: `${steam} 1.2s infinite`,
            }}
          />
        </Box>
        <Text mt={6} fontWeight="bold" fontSize={{ base: 'lg', md: '2xl' }} color="brown.500">
          Coffee House
        </Text>
      </Center>
    </Box>
  )
} 
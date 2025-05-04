import { Box, Container, Heading, Text, VStack, Button, FormControl, FormLabel, Input, useToast, Textarea, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const MotionBox = motion(Box)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const toast = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Thank you!',
      description: 'We will contact you soon.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    setFormData({ name: '', phone: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Box bg="gray.50" minH="100vh" pt={{ base: 20, md: 28 }}>
      <Container py={{ base: 12, md: 20 }}>
        <VStack spacing={12} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
          >
            <Flex justify="center" mb={4}>
              <Text fontSize="6xl" role="img" aria-label="coffee">☕</Text>
            </Flex>
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, brown.400, brown.600)"
              bgClip="text"
              mb={4}
            >
              Contact Us
            </Heading>
            <Text fontSize="xl" color="gray.600">
              We'd love to hear from you
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            w="100%"
            maxW="600px"
            mx="auto"
          >
            <Box
              as="form"
              onSubmit={handleSubmit}
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
              bg="white"
            >
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    type="tel"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    type="email"
                    size="lg"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={4}
                    size="lg"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brown"
                  size="lg"
                  w="100%"
                  mt={4}
                >
                  Send Message
                </Button>
              </VStack>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  )
}

export default Contact 
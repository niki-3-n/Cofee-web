import { Box, Container, Heading, Text, VStack, Button, FormControl, FormLabel, Input, useToast, Select, Textarea, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const MotionBox = motion(Box)

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  })
  const toast = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Reservation Confirmed!',
      description: 'We look forward to seeing you.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: '2',
      specialRequests: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Container py={20}>
      <VStack spacing={12} align="stretch">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
        >
          <Flex justify="center" mb={4}>
            <Text fontSize="6xl" role="img" aria-label="calendar">📅</Text>
          </Flex>
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, brown.400, brown.600)"
            bgClip="text"
            mb={4}
          >
            Make a Reservation
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Book your table at our coffee shop
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

              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  type="date"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Time</FormLabel>
                <Input
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  type="time"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Number of Guests</FormLabel>
                <Select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  size="lg"
                >
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                  <option value="5">5 people</option>
                  <option value="6">6 people</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Special Requests</FormLabel>
                <Textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requests?"
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
                Book Table
              </Button>
            </VStack>
          </Box>
        </MotionBox>
      </VStack>
    </Container>
  )
}

export default Reservation 
import { Box, Container, Heading, Text, SimpleGrid, Image, VStack, Icon, Flex, Divider } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaCoffee, FaHeart, FaLeaf } from 'react-icons/fa'

const MotionBox = motion(Box)

// Fallback interior image for coffee shop
const fallbackImage = "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&auto=format&fit=crop&q=60"

const features = [
  {
    icon: FaCoffee,
    title: 'Premium Coffee',
    description: 'We source the finest coffee beans from sustainable farms around the world.'
  },
  {
    icon: FaHeart,
    title: 'Passionate Baristas',
    description: 'Our skilled baristas craft each cup with precision and care.'
  },
  {
    icon: FaLeaf,
    title: 'Eco-Friendly',
    description: 'We\'re committed to sustainable practices and eco-friendly packaging.'
  }
]

const About = () => {
  return (
    <Box bg="gray.50" minH="100vh" pt={{ base: 20, md: 28 }}>
      {/* Header Section */}
      <Container maxW="container.lg" centerContent py={{ base: 12, md: 20 }} px={{ base: 4, md: 8 }}>
        <VStack spacing={8} align="center" textAlign="center" w="full">
          <Heading 
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, brown.400, brown.600)"
            bgClip="text"
          >
            Our Story
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600" maxW="700px" mx="auto">
            Founded in 2024, Coffee House began with a simple mission: to create a space where
            people can enjoy exceptional coffee in a warm, welcoming environment.
          </Text>
        </VStack>
      </Container>
      <Divider my={8} />

      {/* Features Section */}
      <Container maxW="container.lg" py={12} centerContent px={{ base: 4, md: 8 }}>
        <VStack spacing={14} w="full">
          <Heading size="lg" textAlign="center" mb={2}>What Makes Us Special</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="100%" justifyItems="center">
            {features.map((feature, index) => (
              <VStack 
                key={index} 
                spacing={4} 
                align="center" 
                textAlign="center"
                maxW="300px"
                w="full"
                p={6}
                bg="white"
                borderRadius="xl"
                boxShadow="md"
              >
                <Flex 
                  p={4} 
                  borderRadius="full" 
                  bg="brown.100" 
                  color="brown.500"
                  align="center"
                  justify="center"
                >
                  <Icon as={feature.icon} w={8} h={8} />
                </Flex>
                <Heading size="md">{feature.title}</Heading>
                <Text color="gray.600">{feature.description}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
      <Divider my={8} />

      {/* Image Section */}
      <Container maxW="container.lg" py={12} centerContent px={{ base: 4, md: 8 }}>
        <VStack spacing={12} w="full">
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            w="100%"
            maxW="800px"
          >
            <Image
              src="/coffee-shop-interior.jpg"
              fallbackSrc={fallbackImage}
              alt="Coffee shop interior"
              borderRadius="lg"
              w="100%"
              h={{ base: "200px", md: "400px" }}
              objectFit="cover"
              boxShadow="lg"
            />
          </MotionBox>

          <VStack spacing={4} maxW="700px" textAlign="center">
            <Heading size="lg">Our Commitment</Heading>
            <Text fontSize="lg" color="gray.600">
              We believe in creating more than just great coffee. Our commitment extends to
              providing a space where community thrives, where conversations flow as freely
              as our coffee, and where every visit feels like coming home.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default About 
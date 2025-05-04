import {
  Box, Container, Heading, Text, Button, VStack, HStack, Image, SimpleGrid, Icon, Flex, Input, Textarea, useToast, Link, Divider,
  AspectRatio, useBreakpointValue, IconButton
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaCoffee, FaLeaf, FaHeart, FaStar, FaInstagram, FaFacebook, FaPhone, FaMugHot, FaArrowDown, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'

const MotionBox = motion(Box)
// const MotionFlex = motion(Flex)

// Обновленные fallback изображения с высоким качеством
const fallbackImages = {
  espresso: "/images/coffee-4334647_1280.jpg",
  cappuccino: "/images/cappuccino-756490_1280.jpg",
  latte: "/images/coffee-1117933_1280.jpg",
  matcha: "/images/coffee-6600644_1280.jpg",
  gallery1: "/images/black-coffee-1867753_1280.jpg",
  gallery2: "/images/coffee-6984075_1280.jpg",
  gallery3: "/images/coffee-2714970_1280.jpg",
  gallery4: "/images/coffee-4388065_1280.jpg",
  about: "/images/coffee-1576537_1280.jpg",
  barista: "/images/woman-601568_1280.jpg",
  beans: "/images/coffee-beans-2258839_1280.jpg",
  ambience: "/images/coffee-2306471_1280.jpg"
}

// Обновленное превью меню с более детальными описаниями
const menuPreview = [
  { 
    name: 'Espresso', 
    desc: 'Strong and bold', 
    longDesc: 'Intense coffee with a rich crema, revealing the full depth of freshly roasted beans', 
    img: '/espresso.jpg', 
    fallback: fallbackImages.espresso, 
    price: '$3.50' 
  },
  { 
    name: 'Cappuccino', 
    desc: 'Espresso with milk foam', 
    longDesc: 'Perfect balance of espresso, steamed milk and airy milk foam, sprinkled with cocoa', 
    img: '/cappuccino.jpg', 
    fallback: fallbackImages.cappuccino, 
    price: '$4.50' 
  },
  { 
    name: 'Latte', 
    desc: 'Smooth and creamy', 
    longDesc: 'Velvety espresso with silky steamed milk and a thin layer of milk foam', 
    img: '/latte.jpg', 
    fallback: fallbackImages.latte, 
    price: '$4.80' 
  },
  { 
    name: 'Matcha Latte', 
    desc: 'Green tea & milk', 
    longDesc: 'Ceremonial Japanese matcha powder, whisked to perfection with steamed milk and notes of natural sweetness', 
    img: '/matcha.jpg', 
    fallback: fallbackImages.matcha, 
    price: '$5.00' 
  },
]

const gallery = [
  { path: '/gallery1.jpg', fallback: fallbackImages.gallery1 },
  { path: '/gallery2.jpg', fallback: fallbackImages.gallery2 },
  { path: '/gallery3.jpg', fallback: fallbackImages.gallery3 },
  { path: '/gallery4.jpg', fallback: fallbackImages.gallery4 }
]

// Обновленные особенности с дополнительными деталями
const features = [
  { 
    icon: FaCoffee, 
    title: 'Premium Beans', 
    desc: 'Only the finest beans, freshly roasted by professionals', 
    image: fallbackImages.beans 
  },
  { 
    icon: FaHeart, 
    title: 'Passionate Baristas', 
    desc: 'Each cup crafted with love and attention to detail', 
    image: fallbackImages.barista 
  },
  { 
    icon: FaLeaf, 
    title: 'Sustainable Approach', 
    desc: 'Environmentally friendly practices throughout our process', 
    image: fallbackImages.ambience 
  },
]

// Обновленные отзывы с большим количеством деталей
const reviews = [
  { 
    name: 'Anna', 
    text: 'Best coffee in San Francisco! The atmosphere of comfort and tranquility makes this place perfect for meetings and work. ☕️', 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    date: 'May 14, 2024'
  },
  { 
    name: 'John', 
    text: 'Cozy, delicious, and atmospheric! The cappuccino here is simply incredible, and the desserts melt in your mouth. Will definitely return again!', 
    rating: 5, 
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80',
    date: 'June 2, 2024'
  },
  { 
    name: 'Sophie', 
    text: 'I love their matcha latte and desserts! The staff is very friendly and attentive. Always happy to come back here.', 
    rating: 4, 
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    date: 'May 20, 2024'
  },
]

// Ссылка на видео для фона
const videoBackground = {
  local: "/videos/coffee-video.mp4",
  remote: "https://cdn.pixabay.com/video/2024/02/12/200260-912384743_large.mp4" // Запасная ссылка на видео
}

export default function Home() {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState({ name: '', phone: '', guests: '', message: '' })
  const [loading, setLoading] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const videoHeight = useBreakpointValue({ base: '100vh', md: '100vh' })
  
  // Scroll to content below hero section
  const scrollToContent = () => {
    const yOffset = -100; // Adjust based on header height
    if (heroRef.current) {
      const y = heroRef.current.getBoundingClientRect().bottom + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Reservation form handler
  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ title: 'Reservation sent!', status: 'success', duration: 3000, isClosable: true })
      setForm({ name: '', phone: '', guests: '', message: '' })
    }, 1200)
  }

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero Video Section */}
      <Box 
        position="relative" 
        h={videoHeight} 
        w="100%" 
        overflow="hidden"
        ref={heroRef}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          zIndex="1"
          bg="rgba(0,0,0,0.5)"
        />
        <AspectRatio
          ratio={16/9}
          w="100%"
          h="100%"
          position="absolute"
        >
          <video
            autoPlay
            muted
            loop
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: "0",
              left: "0"
            }}
            onError={(e) => {
              // Если локальное видео не загрузилось, используем удаленное
              const video = e.target as HTMLVideoElement;
              if (video.src.includes(videoBackground.local)) {
                video.src = videoBackground.remote;
              }
            }}
          >
            <source src={videoBackground.local} type="video/mp4" />
            <source src={videoBackground.remote} type="video/mp4" />
            Ваш браузер не поддерживает видео тег.
          </video>
        </AspectRatio>
        
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="2"
          align="center"
          justify="center"
          direction="column"
          px={4}
        >
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            mb={6}
          >
            <Icon as={FaMugHot} color="white" w={20} h={20} />
          </MotionBox>
          
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            textAlign="center"
          >
            <Heading 
              size="4xl" 
              color="white" 
              fontWeight="bold"
              textShadow="2px 2px 4px rgba(0,0,0,0.4)"
              mb={6}
            >
              COFFEE HOUSE
            </Heading>
            
            <Text 
              fontSize={{ base: "xl", md: "3xl" }} 
              color="white" 
              maxW="800px"
              textShadow="1px 1px 2px rgba(0,0,0,0.4)"
              mb={12}
            >
              Where every cup tells a story
            </Text>
            
            <HStack spacing={6} justify="center">
              <Button 
                size="lg" 
                colorScheme="brown" 
                px={8}
                onClick={() => navigate('/menu')}
                fontSize="lg"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                Our Menu
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                colorScheme="whiteAlpha"
                px={8}
                fontSize="lg"
                color="white"
                _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
                onClick={scrollToContent}
              >
                Learn More
              </Button>
            </HStack>
          </MotionBox>
          
          <MotionBox
            position="absolute"
            bottom="30px"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            cursor="pointer"
            onClick={scrollToContent}
          >
            <Icon as={FaArrowDown} w={8} h={8} color="white" />
          </MotionBox>
        </Flex>
      </Box>
      
      {/* About Section (first section after hero) */}
      <Container py={16} maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} alignItems="center">
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image 
              src="/about-us.jpg" 
              fallbackSrc={fallbackImages.about}
              alt="About Us" 
              borderRadius="xl" 
              boxShadow="xl"
              objectFit="cover"
              h="400px"
              w="100%"
            />
          </MotionBox>
          
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VStack spacing={6} align="start" textAlign="left">
              <Heading 
                size="lg" 
                bgGradient="linear(to-r, brown.400, brown.600)" 
                bgClip="text"
                position="relative"
                _after={{
                  content: '""',
                  width: '60px',
                  height: '3px',
                  bgGradient: "linear(to-r, brown.400, brown.600)",
                  position: "absolute",
                  bottom: "-10px",
                  left: "0"
                }}
              >
                About Us
              </Heading>
              <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" lineHeight="tall">
                Founded in 2024, Coffee House is your cozy corner in the city.
                We believe in quality, comfort, and community building.
                With us, each cup is a story, and each visit is a memory.
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" lineHeight="tall">
                Our mission is to create a space where quality coffee and a warm atmosphere
                help you enjoy the moment and find your inspiration.
              </Text>
              <Button
                colorScheme="brown"
                size="lg"
                rightIcon={<FaCoffee />}
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                transition="all 0.2s"
              >
                Our Story
              </Button>
            </VStack>
          </MotionBox>
        </SimpleGrid>
      </Container>
      <Divider my={8} />

      {/* 3. Menu Preview Section */}
      <Box py={16} bg="brown.50">
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4}>
              <Heading 
                size="xl" 
                textAlign="center" 
                position="relative"
                _after={{
                  content: '""',
                  width: '80px',
                  height: '3px',
                  bg: "brown.500",
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)"
                }}
              >
                Our Signature Drinks
              </Heading>
              <Text 
                fontSize="lg" 
                color="gray.600" 
                textAlign="center" 
                maxW="700px" 
                mt={8}
              >
                Discover the perfect blend of taste and craftsmanship in our beverages,
                prepared from select ingredients with love for every detail
              </Text>
            </VStack>
            
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={8} w="full">
              {menuPreview.map((item) => (
                <MotionBox
                  key={item.name}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  bg="white"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="lg"
                  h="100%"
                  pb={6}
                >
                  <Box position="relative" h="220px" overflow="hidden">
                    <Image 
                      src={item.img} 
                      fallbackSrc={item.fallback}
                      alt={item.name} 
                      w="full"
                      h="full"
                      objectFit="cover"
                      transition="transform 0.5s"
                      _groupHover={{ transform: 'scale(1.05)' }}
                    />
                    <Box 
                      position="absolute" 
                      top="0" 
                      insetX="0" 
                      bg="blackAlpha.50" 
                      backdropFilter="blur(2px)" 
                      h="full"
                      opacity="0"
                      transition="opacity 0.3s"
                      _groupHover={{ opacity: 1 }}
                    />
                  </Box>
                  
                  <VStack spacing={2} p={5} align="start" h="100%">
                    <Heading size="md">{item.name}</Heading>
                    <Text color="gray.500" fontSize="sm">{item.desc}</Text>
                    <Text fontSize="sm" color="gray.600" noOfLines={3} my={2} flex="1">
                      {item.longDesc}
                    </Text>
                    <Text 
                      fontWeight="bold" 
                      color="brown.600" 
                      fontSize="xl"
                    >
                      {item.price}
                    </Text>
                    <Button 
                      variant="outline" 
                      colorScheme="brown" 
                      size="sm" 
                      mt={2}
                      alignSelf="flex-end"
                    >
                      Order
                    </Button>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
            
            <Button 
              size="lg" 
              colorScheme="brown" 
              leftIcon={<FaCoffee />}
              onClick={() => navigate('/menu')}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Full Menu
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* 4. Gallery Section */}
      <Container py={16} maxW="container.xl">
        <VStack spacing={12}>
          <Heading 
            size="xl" 
            textAlign="center" 
            position="relative"
            _after={{
              content: '""',
              width: '80px',
              height: '3px',
              bg: "brown.500",
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          >
            Gallery
          </Heading>
          
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 4, md: 6 }} w="full">
            {gallery.map((img, i) => (
              <MotionBox
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "xl",
                  zIndex: 1
                }}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                position="relative"
                height={{ base: "200px", md: "240px" }}
              >
                <Image 
                  src={img.path} 
                  fallbackSrc={img.fallback} 
                  alt={`Gallery ${i + 1}`} 
                  w="100%" 
                  h="100%" 
                  objectFit="cover"
                />
                <Box 
                  position="absolute" 
                  inset="0" 
                  bg="blackAlpha.50" 
                  opacity="0"
                  transition="all 0.3s"
                  _hover={{ opacity: 1, bg: "blackAlpha.30" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon 
                    as={FaSearch} 
                    color="white" 
                    w={8} 
                    h={8} 
                    opacity="0"
                    transform="translateY(20px)"
                    transition="all 0.3s"
                    _groupHover={{ opacity: 1, transform: "translateY(0)" }}
                  />
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* 5. Features Section */}
      <Box py={16} bg="brown.50">
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <Heading 
              size="xl" 
              textAlign="center" 
              position="relative"
              _after={{
                content: '""',
                width: '80px',
                height: '3px',
                bg: "brown.500",
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)"
              }}
            >
              Why Us
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
              {features.map((f, idx) => (
                <MotionBox
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  bg="white"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="lg"
                  h="100%"
                >
                  <Box h="200px" overflow="hidden">
                    <Image 
                      src={f.image}
                      alt={f.title}
                      w="full"
                      h="full"
                      objectFit="cover"
                      transition="transform 0.5s"
                      _hover={{ transform: 'scale(1.05)' }}
                    />
                  </Box>
                  
                  <VStack py={8} px={6} spacing={4} align="center" textAlign="center">
                    <Flex 
                      p={4} 
                      borderRadius="full" 
                      bg="brown.100" 
                      color="brown.600" 
                      align="center" 
                      justify="center"
                      boxShadow="md"
                      mt="-40px"
                      position="relative"
                      zIndex="1"
                      border="4px solid white"
                    >
                      <Icon as={f.icon} w={8} h={8} />
                    </Flex>
                    
                    <Heading size="md" color="brown.800">{f.title}</Heading>
                    <Text color="gray.600">{f.desc}</Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* 6. Reviews Section */}
      <Container py={16} maxW="container.xl">
        <VStack spacing={12}>
          <Heading 
            size="xl" 
            textAlign="center" 
            position="relative"
            _after={{
              content: '""',
              width: '80px',
              height: '3px',
              bg: "brown.500",
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          >
            What Our Guests Say
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {reviews.map((r, i) => (
              <MotionBox
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
                p={8}
                position="relative"
                overflow="hidden"
                _before={{
                  content: "open-quote",
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  fontSize: "72px",
                  color: "gray.100",
                  zIndex: "0",
                  fontFamily: "serif",
                  lineHeight: "1"
                }}
              >
                <Flex direction="column" position="relative" zIndex="1">
                  <HStack justify="center" mb={4}>
                    {[...Array(5)].map((_, idx) => (
                      <Icon 
                        key={idx} 
                        as={FaStar} 
                        color={idx < r.rating ? "yellow.400" : "gray.200"} 
                        w={5} 
                        h={5} 
                      />
                    ))}
                  </HStack>
                  
                  <Text 
                    fontSize="md" 
                    fontStyle="italic" 
                    color="gray.600" 
                    mb={6}
                    lineHeight="tall"
                  >
                    "{r.text}"
                  </Text>
                  
                  <Flex mt="auto" align="center" pt={4} borderTop="1px solid" borderColor="gray.100">
                    <Image 
                      src={r.image} 
                      alt={r.name} 
                      boxSize="50px" 
                      borderRadius="full" 
                      mr={4} 
                      objectFit="cover"
                      border="2px solid white"
                      boxShadow="sm"
                    />
                    <Box>
                      <Text fontWeight="bold" color="brown.700">{r.name}</Text>
                      <Text fontSize="xs" color="gray.500">{r.date}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </MotionBox>
            ))}
          </SimpleGrid>
          
          <Button 
            variant="outline"
            colorScheme="brown"
            size="lg"
            rightIcon={<FaStar />}
          >
            All Reviews
          </Button>
        </VStack>
      </Container>

      {/* 7. Reservation Section */}
      <Box 
        py={16} 
        bg="brown.50" 
        backgroundImage="url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=2000&auto=format&fit=crop&q=80')"
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "blackAlpha.700",
          zIndex: 1
        }}
      >
        <Container maxW="container.xl" position="relative" zIndex={2}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} alignItems="center">
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              color="white"
            >
              <VStack spacing={6} align="start" maxW="500px">
                <Heading 
                  size="xl" 
                  color="white"
                  position="relative"
                  _after={{
                    content: '""',
                    width: '60px',
                    height: '3px',
                    bg: "brown.300",
                    position: "absolute",
                    bottom: "-10px",
                    left: "0"
                  }}
                >
                  Book a Table
                </Heading>
                <Text fontSize="lg" lineHeight="tall" mt={6}>
                  Plan the perfect visit to our coffee house in advance. Reserve a table for a business meeting, 
                  a romantic date, or a cozy get-together with friends.
                </Text>
                <Text fontSize="lg" fontWeight="medium" color="brown.100">
                  We look forward to welcoming you!
                </Text>
                
                <HStack spacing={8} mt={4}>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="gray.300">Business Hours</Text>
                    <Text fontWeight="bold">7:00 AM – 10:00 PM</Text>
                  </VStack>
                  
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="gray.300">Contact Phone</Text>
                    <Text fontWeight="bold">+1 (555) 123-4567</Text>
                  </VStack>
                </HStack>
              </VStack>
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box 
                as="form" 
                bg="white" 
                p={8} 
                borderRadius="xl" 
                boxShadow="2xl" 
                onSubmit={handleReserve} 
                maxW="500px"
                mx="auto"
              >
                <VStack spacing={5}>
                  <Heading size="md" color="brown.700" mb={2}>Fill in Reservation Details</Heading>
                  
                  <Input 
                    placeholder="Your Name" 
                    name="name" 
                    value={form.name} 
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} 
                    size="lg" 
                    bg="gray.50"
                    borderColor="gray.300"
                    _focus={{ 
                      borderColor: "brown.400", 
                      boxShadow: "0 0 0 1px var(--chakra-colors-brown-400)" 
                    }}
                    required 
                  />
                  
                  <Input 
                    placeholder="Phone Number" 
                    name="phone" 
                    value={form.phone} 
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} 
                    size="lg"
                    bg="gray.50"
                    borderColor="gray.300"
                    _focus={{ 
                      borderColor: "brown.400", 
                      boxShadow: "0 0 0 1px var(--chakra-colors-brown-400)" 
                    }}
                    required 
                  />
                  
                  <Input 
                    placeholder="Number of Guests" 
                    name="guests" 
                    value={form.guests} 
                    onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} 
                    size="lg"
                    bg="gray.50"
                    borderColor="gray.300"
                    _focus={{ 
                      borderColor: "brown.400", 
                      boxShadow: "0 0 0 1px var(--chakra-colors-brown-400)" 
                    }}
                    required 
                  />
                  
                  <Textarea 
                    placeholder="Special Requests (optional)" 
                    name="message" 
                    value={form.message} 
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))} 
                    size="lg" 
                    rows={3}
                    bg="gray.50"
                    borderColor="gray.300"
                    _focus={{ 
                      borderColor: "brown.400", 
                      boxShadow: "0 0 0 1px var(--chakra-colors-brown-400)" 
                    }}
                  />
                  
                  <Button 
                    type="submit" 
                    colorScheme="brown" 
                    size="lg" 
                    w="100%" 
                    isLoading={loading}
                    loadingText="Sending"
                    _hover={{ 
                      transform: 'translateY(-2px)', 
                      boxShadow: 'lg' 
                    }}
                    transition="all 0.2s"
                  >
                    Reserve
                  </Button>
                </VStack>
              </Box>
            </MotionBox>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 8. Location Section */}
      <Container py={16} maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={6} align="start">
              <Heading 
                size="xl"
                position="relative"
                _after={{
                  content: '""',
                  width: '60px',
                  height: '3px',
                  bg: "brown.500",
                  position: "absolute",
                  bottom: "-10px",
                  left: "0"
                }}
              >
                Visit Us
              </Heading>
              
              <Box mt={6}>
                <Text fontSize="lg" fontWeight="medium" color="brown.700" mb={1}>Address</Text>
                <Text fontSize="lg" color="gray.600">123 Coffee St, San Francisco, CA</Text>
              </Box>
              
              <Box>
                <Text fontSize="lg" fontWeight="medium" color="brown.700" mb={1}>Hours</Text>
                <Text fontSize="lg" color="gray.600">Mon-Sun: 7:00 AM – 10:00 PM</Text>
              </Box>
              
              <Box>
                <Text fontSize="lg" fontWeight="medium" color="brown.700" mb={1}>Contact</Text>
                <Text fontSize="lg" color="gray.600">+1 (555) 123-4567</Text>
                <Text fontSize="lg" color="gray.600">info@coffeehouse.com</Text>
              </Box>
              
              <Button 
                leftIcon={<FaPhone />} 
                colorScheme="brown" 
                size="lg" 
                mt={4}
                _hover={{ 
                  transform: 'translateY(-2px)', 
                  boxShadow: 'lg' 
                }}
                transition="all 0.2s"
              >
                Contact Us
              </Button>
            </VStack>
          </MotionBox>
          
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box 
              w="100%" 
              h="400px" 
              borderRadius="xl" 
              overflow="hidden" 
              boxShadow="xl"
              position="relative"
            >
              <iframe
                title="Coffee House Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.95647970693!2d-122.45769373369929!3d37.76406843656915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1649791096199!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              <Box 
                position="absolute" 
                bottom="0" 
                left="0" 
                right="0" 
                bg="blackAlpha.700" 
                color="white" 
                p={4}
                backdropFilter="blur(8px)"
              >
                <Text fontWeight="medium">Coffee House</Text>
                <Text fontSize="sm">123 Coffee St, San Francisco, CA</Text>
              </Box>
            </Box>
          </MotionBox>
        </SimpleGrid>
      </Container>

      {/* 9. Footer Section */}
      <Box as="footer" bg="brown.800" color="white" py={12}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
            <VStack align="start" spacing={4}>
              <Heading size="md">Coffee House</Heading>
              <Text color="whiteAlpha.800" fontSize="sm" maxW="250px">
                A place where every cup of coffee is filled with history, 
                and every visit leaves pleasant memories.
              </Text>
              <HStack spacing={4} mt={2}>
                <IconButton
                  aria-label="Instagram"
                  icon={<FaInstagram />}
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  rounded="full"
                  size="md"
                />
                <IconButton
                  aria-label="Facebook"
                  icon={<FaFacebook />}
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  rounded="full"
                  size="md"
                />
                <IconButton
                  aria-label="Phone"
                  icon={<FaPhone />}
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  rounded="full"
                  size="md"
                />
              </HStack>
            </VStack>
            
            <VStack align="start" spacing={4}>
              <Heading size="sm">Navigation</Heading>
              <Link color="whiteAlpha.800">Home</Link>
              <Link color="whiteAlpha.800">Menu</Link>
              <Link color="whiteAlpha.800">About Us</Link>
              <Link color="whiteAlpha.800">Contact</Link>
            </VStack>
            
            <VStack align="start" spacing={4}>
              <Heading size="sm">Opening Hours</Heading>
              <Text color="whiteAlpha.800">Mon-Fri: 7:00 AM – 10:00 PM</Text>
              <Text color="whiteAlpha.800">Sat-Sun: 8:00 AM – 10:00 PM</Text>
            </VStack>
            
            <VStack align="start" spacing={4}>
              <Heading size="sm">Contact</Heading>
              <Text color="whiteAlpha.800">123 Coffee St</Text>
              <Text color="whiteAlpha.800">San Francisco, CA</Text>
              <Link href="mailto:info@coffeehouse.com" color="brown.200">
                info@coffeehouse.com
              </Link>
              <Text color="whiteAlpha.800">+1 (555) 123-4567</Text>
            </VStack>
          </SimpleGrid>
          
          <Divider my={8} borderColor="whiteAlpha.300" />
          
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            justify="space-between" 
            align={{ base: 'center', md: 'center' }}
            color="whiteAlpha.600"
            fontSize="sm"
          >
            <Text>© {new Date().getFullYear()} Coffee House. All rights reserved.</Text>
            <HStack spacing={4} mt={{ base: 4, md: 0 }}>
              <Link>Privacy Policy</Link>
              <Link>Terms of Use</Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
} 
import { 
  Box, Container, Heading, Text, Image, VStack, Button, HStack, 
  Badge, Select, Flex, useToast, FormControl, FormLabel, Tabs, TabList, Tab, TabPanels, TabPanel,
  useDisclosure
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import CartDrawer from '../components/CartDrawer'

// Import coffee data from Menu
const coffeeImages = {
  espresso: "https://images.unsplash.com/photo-1510591509098-7574dbd7a539?w=500&auto=format&fit=crop&q=60",
  cappuccino: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&auto=format&fit=crop&q=60",
  latte: "https://images.unsplash.com/photo-1596078841242-54be1e5cf005?w=500&auto=format&fit=crop&q=60",
  americano: "https://images.unsplash.com/photo-1553246969-7dcb8829a8e7?w=500&auto=format&fit=crop&q=60",
  mocha: "https://images.unsplash.com/photo-1546549095-5ba56b5acd7d?w=500&auto=format&fit=crop&q=60",
  flatWhite: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&auto=format&fit=crop&q=60",
  matcha: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=60",
  icedCoffee: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60",
  frappuccino: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=60"
}

const menuItems = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Pure coffee experience with rich crema and intense aroma',
    longDescription: 'Our espresso is meticulously crafted using premium, ethically sourced beans. Each shot is extracted to perfection to create a robust flavor with a silky crema.',
    price: 3.50,
    sizes: ['Single', 'Double', 'Triple'],
    sizePrices: [3.50, 4.50, 5.50],
    options: ['Regular', 'Ristretto', 'Lungo'],
    image: coffeeImages.espresso,
    category: 'Classics',
    ingredients: ['100% Arabica beans'],
    popular: true,
    nutritionalInfo: {
      calories: 3,
      protein: 0.1,
      fat: 0,
      carbs: 0.5
    },
    origin: 'Ethiopia & Colombia blend',
    roastLevel: 'Medium-dark',
    brewingMethods: ['Espresso machine (15-20 bar pressure)', 'Preparation time: 25-30 seconds'],
    tasteProfile: ['Bold', 'Rich', 'Slightly bitter', 'Notes of chocolate and caramel']
  },
  {
    id: 2,
    name: 'Cappuccino',
    description: 'Perfect balance of espresso, steamed milk and velvety foam',
    longDescription: "Our cappuccino combines one-third espresso, one-third steamed milk, and one-third milk foam. The result is a harmonious blend that's both comforting and invigorating.",
    price: 4.50,
    sizes: ['Small', 'Medium', 'Large'],
    sizePrices: [4.50, 5.50, 6.50],
    options: ['Classic', 'Wet', 'Dry', 'Cinnamon', 'Cocoa'],
    image: coffeeImages.cappuccino,
    category: 'Classics',
    ingredients: ['Espresso', 'Steamed milk', 'Milk foam'],
    popular: true,
    nutritionalInfo: {
      calories: 120,
      protein: 6,
      fat: 4,
      carbs: 12
    },
    origin: 'Italian tradition with our signature beans',
    roastLevel: 'Medium',
    brewingMethods: ['Espresso base with steamed milk and foam', 'Preparation time: 2-3 minutes'],
    tasteProfile: ['Creamy', 'Balanced', 'Mild coffee flavor', 'Subtle sweetness']
  },
  // Other coffee items would be imported from Menu.tsx
]

const MotionBox = motion(Box)

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { addToCart } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [product, setProduct] = useState<typeof menuItems[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  
  useEffect(() => {
    // Find the product by ID
    const productId = parseInt(id || '0');
    const foundProduct = menuItems.find(item => item.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [id]);
  
  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedOption) {
      toast({
        title: 'Please select options',
        description: 'Please select both size and preparation option',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    const sizeIndex = product.sizes.indexOf(selectedSize);
    const price = product.sizePrices[sizeIndex];
    
    const cartItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      size: selectedSize,
      option: selectedOption,
      quantity: 1,
      price: price,
      image: product.image
    };
    
    addToCart(cartItem);
    
    toast({
      title: 'Added to cart',
      description: `${product.name} (${selectedSize}, ${selectedOption}) added to your cart`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  if (loading) {
    return (
      <Box pt={28} textAlign="center">
        <Text>Loading...</Text>
      </Box>
    );
  }
  
  if (!product) {
    return (
      <Box pt={28} textAlign="center">
        <Text>Product not found</Text>
        <Button mt={4} onClick={() => navigate('/menu')}>Back to Menu</Button>
      </Box>
    );
  }
  
  const sizePrice = (size: string) => {
    const idx = product.sizes.indexOf(size);
    return product.sizePrices[idx].toFixed(2);
  };
  
  return (
    <>
      <Box bg="gray.50" minH="100vh" pt={{ base: 20, md: 28 }} pb={20}>
        <Container maxW="container.xl">
          <Flex justifyContent="space-between" alignItems="center" mb={8}>
            <Button 
              leftIcon={<FaArrowLeft />} 
              variant="ghost" 
              onClick={() => navigate('/menu')}
            >
              Back to Menu
            </Button>
            <Button
              rightIcon={<FaShoppingCart />}
              colorScheme="brown"
              variant="outline"
              onClick={onOpen}
            >
              View Cart
            </Button>
          </Flex>
          
          <Flex 
            direction={{ base: 'column', lg: 'row' }} 
            align="start" 
            gap={10}
          >
            {/* Product Image */}
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              flex="1"
              maxW={{ base: '100%', lg: '500px' }}
            >
              <Image
                src={product.image}
                alt={product.name}
                w="100%"
                h={{ base: '300px', md: '400px' }}
                objectFit="cover"
                borderRadius="xl"
                boxShadow="lg"
              />
              
              <HStack mt={4} spacing={2} flexWrap="wrap">
                {Array(3).fill(0).map((_, i) => (
                  <Image
                    key={i}
                    src={product.image}
                    alt={`${product.name} variation ${i+1}`}
                    boxSize="80px"
                    objectFit="cover"
                    borderRadius="md"
                    cursor="pointer"
                    opacity={i === 0 ? 1 : 0.7}
                    _hover={{ opacity: 1 }}
                    transition="opacity 0.2s"
                  />
                ))}
              </HStack>
            </MotionBox>
            
            {/* Product Info */}
            <VStack 
              align="start" 
              spacing={6} 
              flex="1"
              as={MotionBox}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box>
                {product.popular && (
                  <Badge colorScheme="red" fontSize="sm" mb={2}>
                    Popular Choice
                  </Badge>
                )}
                <Heading 
                  as="h1" 
                  size="2xl"
                  bgGradient="linear(to-r, brown.400, brown.600)"
                  bgClip="text"
                >
                  {product.name}
                </Heading>
                <Badge colorScheme="brown" fontSize="md" mt={2}>
                  {product.category}
                </Badge>
              </Box>
              
              <Text fontSize="xl" color="gray.700">
                {product.longDescription}
              </Text>
              
              <HStack spacing={3} flexWrap="wrap">
                {product.ingredients.map((ing: string, idx: number) => (
                  <Badge key={idx} colorScheme="green" fontSize="sm">
                    {ing}
                  </Badge>
                ))}
              </HStack>
              
              <Box w="100%">
                <Tabs colorScheme="brown" variant="enclosed">
                  <TabList>
                    <Tab>Details</Tab>
                    <Tab>Nutrition</Tab>
                    <Tab>Origin & Roast</Tab>
                  </TabList>
                  
                  <TabPanels>
                    <TabPanel>
                      <VStack align="start" spacing={3}>
                        <Text fontWeight="bold">Taste Profile:</Text>
                        <HStack spacing={2} flexWrap="wrap">
                          {product.tasteProfile?.map((taste: string, idx: number) => (
                            <Badge key={idx} colorScheme="purple" variant="subtle">
                              {taste}
                            </Badge>
                          ))}
                        </HStack>
                        
                        <Text fontWeight="bold" mt={2}>Brewing Method:</Text>
                        <VStack align="start" spacing={1}>
                          {product.brewingMethods?.map((method: string, idx: number) => (
                            <Text key={idx} fontSize="sm">{method}</Text>
                          ))}
                        </VStack>
                      </VStack>
                    </TabPanel>
                    
                    <TabPanel>
                      <VStack align="start" spacing={3}>
                        <Text fontWeight="bold">Nutritional Information (per serving):</Text>
                        <HStack spacing={6} mt={2}>
                          <VStack align="start">
                            <Text fontSize="sm" color="gray.500">Calories</Text>
                            <Text fontWeight="bold">{product.nutritionalInfo?.calories} kcal</Text>
                          </VStack>
                          <VStack align="start">
                            <Text fontSize="sm" color="gray.500">Protein</Text>
                            <Text fontWeight="bold">{product.nutritionalInfo?.protein}g</Text>
                          </VStack>
                          <VStack align="start">
                            <Text fontSize="sm" color="gray.500">Fat</Text>
                            <Text fontWeight="bold">{product.nutritionalInfo?.fat}g</Text>
                          </VStack>
                          <VStack align="start">
                            <Text fontSize="sm" color="gray.500">Carbs</Text>
                            <Text fontWeight="bold">{product.nutritionalInfo?.carbs}g</Text>
                          </VStack>
                        </HStack>
                      </VStack>
                    </TabPanel>
                    
                    <TabPanel>
                      <VStack align="start" spacing={4}>
                        <Box>
                          <Text fontWeight="bold">Origin:</Text>
                          <Text>{product.origin}</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Roast Level:</Text>
                          <Text>{product.roastLevel}</Text>
                        </Box>
                      </VStack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              
              <Box w="100%" p={6} bg="white" borderRadius="lg" boxShadow="sm">
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Size</FormLabel>
                    <Select
                      placeholder="Select size"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      {product.sizes.map((size: string, idx: number) => (
                        <option key={idx} value={size}>
                          {size} - ${product.sizePrices[idx].toFixed(2)}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Preparation</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    >
                      {product.options.map((opt: string, idx: number) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <Flex justify="space-between" align="center" mt={2}>
                    <Text fontWeight="bold" fontSize="2xl" color="brown.600">
                      ${selectedSize ? sizePrice(selectedSize) : product.price.toFixed(2)}
                    </Text>
                    <Button
                      colorScheme="brown"
                      size="lg"
                      px={8}
                      onClick={handleAddToCart}
                      isDisabled={!selectedSize || !selectedOption}
                    >
                      Add to Cart
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </VStack>
          </Flex>
        </Container>
      </Box>
      
      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ProductDetail; 
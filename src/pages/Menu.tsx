import { 
  Box, Container, SimpleGrid, Heading, Text, Image, VStack, Button, HStack, 
  Badge, Input, Select, Flex, IconButton, useToast,
  Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  useDisclosure, FormControl, FormLabel, Tag, Tooltip, Divider, Icon
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FaShoppingCart, FaTrash, FaPlus, FaMinus, FaCreditCard, FaInfo, 
  FaFilter, FaStar, FaLeaf, FaCoffee, FaGlassWhiskey
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartDrawer from '../components/CartDrawer'

const MotionBox = motion(Box)
const MotionImage = motion(Image)

// High-quality coffee images
const coffeeImages = {
  espresso: "/images/coffee-4334647_1280.jpg",
  cappuccino: "/images/cappuccino-756490_1280.jpg",
  latte: "/images/coffee-1117933_1280.jpg",
  americano: "/images/black-coffee-1867753_1280.jpg",
  mocha: "/images/coffee-206142_1280.jpg",
  flatWhite: "/images/coffee-2306471_1280.jpg",
  matcha: "/images/coffee-6600644_1280.jpg",
  icedCoffee: "/images/coffee-6984075_1280.jpg",
  frappuccino: "/images/coffee-4388065_1280.jpg"
}

// Подробное описание товаров
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
    popular: true
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
    popular: true
  },
  {
    id: 3,
    name: 'Latte',
    description: 'Smooth espresso with steamed milk and light foam',
    longDescription: "Our latte features a shot of espresso gently blended with steamed milk and topped with a thin layer of silky microfoam. It's the perfect canvas for our baristas' latte art.",
    price: 4.80,
    sizes: ['Small', 'Medium', 'Large'],
    sizePrices: [4.80, 5.80, 6.80],
    options: ['Classic', 'Vanilla', 'Caramel', 'Hazelnut'],
    image: coffeeImages.latte,
    category: 'Classics',
    ingredients: ['Espresso', 'Steamed milk', 'Light milk foam'],
    popular: true
  },
  {
    id: 4,
    name: 'Americano',
    description: 'Espresso diluted with hot water for a milder flavor',
    longDescription: "Our Americano starts with a shot of rich espresso that's diluted with hot water. The result is a coffee that's similar in strength to drip coffee but with the distinctive flavor profile of espresso.",
    price: 3.80,
    sizes: ['Small', 'Medium', 'Large'],
    sizePrices: [3.80, 4.80, 5.80],
    options: ['Hot', 'Iced'],
    image: coffeeImages.americano,
    category: 'Classics',
    ingredients: ['Espresso', 'Hot water'],
    popular: false
  },
  {
    id: 5,
    name: 'Mocha',
    description: 'Espresso with chocolate, steamed milk and whipped cream',
    longDescription: "Our mocha combines the intensity of espresso with the richness of chocolate. We add steamed milk for smoothness and top it with a cloud of whipped cream for indulgent decadence.",
    price: 5.20,
    sizes: ['Small', 'Medium', 'Large'],
    sizePrices: [5.20, 6.20, 7.20],
    options: ['Regular', 'White Chocolate', 'Dark Chocolate', 'No Whip'],
    image: coffeeImages.mocha,
    category: 'Specialties',
    ingredients: ['Espresso', 'Chocolate', 'Steamed milk', 'Whipped cream'],
    popular: false
  },
  {
    id: 6,
    name: 'Flat White',
    description: 'Espresso with velvety microfoam steamed milk',
    longDescription: "Our flat white features perfectly extracted espresso combined with silky microfoam steamed milk. The result is a smooth, velvety texture with a stronger coffee flavor than a latte.",
    price: 4.70,
    sizes: ['Small', 'Medium', 'Large'],
    sizePrices: [4.70, 5.70, 6.70],
    options: ['Classic', 'Extra Shot'],
    image: coffeeImages.flatWhite,
    category: 'Classics',
    ingredients: ['Double espresso', 'Velvety steamed milk'],
    popular: false
  },
  {
    id: 7,
    name: 'Matcha Latte',
    description: 'Japanese green tea powder with steamed milk',
    longDescription: "Our matcha latte is prepared with ceremonial grade Japanese matcha powder, whisked to perfection and combined with steamed milk. It offers a unique, earthy flavor with subtle sweetness.",
    price: 5.00,
    sizes: ['Small', 'Medium', 'Large'],
    sizePrices: [5.00, 6.00, 7.00],
    options: ['Regular', 'Vanilla', 'Honey'],
    image: coffeeImages.matcha,
    category: 'Specialties',
    ingredients: ['Matcha powder', 'Steamed milk'],
    popular: true
  },
  {
    id: 8,
    name: 'Iced Coffee',
    description: 'Chilled coffee served over ice, refreshing and smooth',
    longDescription: "Our iced coffee is brewed strong and cooled quickly to preserve flavor, then served over ice. It's the perfect refreshment for warm days or when you need a cool caffeine boost.",
    price: 4.30,
    sizes: ['Small', 'Medium', 'Large'],
    sizePrices: [4.30, 5.30, 6.30],
    options: ['Black', 'With Milk', 'With Cream', 'Sweetened'],
    image: coffeeImages.icedCoffee,
    category: 'Cold',
    ingredients: ['Cold brew coffee', 'Ice'],
    popular: false
  },
  {
    id: 9,
    name: 'Frappuccino',
    description: 'Blended iced coffee with milk, ice and chosen flavors',
    longDescription: "Our frappuccino is a blended beverage combining coffee, milk, ice, and your choice of flavorings. Topped with whipped cream, it's the perfect indulgent treat for coffee lovers.",
    price: 5.50,
    sizes: ['Small', 'Medium', 'Large'],
    sizePrices: [5.50, 6.50, 7.50],
    options: ['Vanilla', 'Caramel', 'Mocha', 'No Whip'],
    image: coffeeImages.frappuccino,
    category: 'Cold',
    ingredients: ['Coffee', 'Milk', 'Ice', 'Whipped cream'],
    popular: false
  }
]

// Типы для заказа и корзины
interface CartItem {
  id: number;
  productId: number;
  name: string;
  size: string;
  option: string;
  quantity: number;
  price: number;
  image: string;
}

const Menu = () => {
  // Состояние для корзины, фильтров и модальных окон
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isOpen, onOpen, onClose } = useDisclosure(); // Для корзины
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productSize, setProductSize] = useState('');
  const [productOption, setProductOption] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('UA'); // UA для Украины по умолчанию
  const toast = useToast();
  const navigate = useNavigate();

  // Получаем уникальные категории для фильтра
  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  // Фильтрованные товары
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  // Обработчик добавления товара в корзину
  const addToCart = (item: any) => {
    if (!productSize || !productOption) {
      toast({
        title: 'Please select options',
        description: 'Please select both size and preparation option',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const sizeIndex = item.sizes.indexOf(productSize);
    const price = item.sizePrices[sizeIndex];

    const cartItem: CartItem = {
      id: Date.now(), // Уникальный ID для элемента корзины
      productId: item.id,
      name: item.name,
      size: productSize,
      option: productOption,
      quantity: 1,
      price: price,
      image: item.image
    };

    setCart([...cart, cartItem]);
    setProductSize('');
    setProductOption('');
    setSelectedProduct(null);

    toast({
      title: 'Added to cart',
      description: `${item.name} (${productSize}, ${productOption}) added to your cart`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    // Автоматически открываем корзину после добавления товара
    onOpen();
  };

  // Удаление товара из корзины
  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Изменение количества товара в корзине
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => item.id === id ? {...item, quantity: newQuantity} : item));
  };

  // Подсчет общей суммы корзины
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Переход к оплате
  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: 'Empty cart',
        description: 'Please add items to your cart before checkout',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsPaymentOpen(true);
    onClose(); // Закрываем корзину
  };

  // Имитация процесса оплаты
  const processPayment = () => {
    // Валидация номера телефона
    if (!phoneNumber) {
      setPhoneError('Номер телефона обязателен');
      toast({
        title: 'Необходим номер телефона',
        description: 'Пожалуйста, введите ваш номер телефона для подтверждения заказа',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Валидация формата номера телефона в зависимости от страны
    let phoneRegex;
    if (phoneCountry === 'US') {
      // Формат для США: +1 (XXX) XXX-XXXX или вариации
      phoneRegex = /^\+?1?\s*\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
    } else {
      // Формат для Украины: +380 XX XXX XX XX или вариации
      phoneRegex = /^\+?380?\s*\(?(\d{2})\)?[-.\s]?(\d{3})[-.\s]?(\d{2})[-.\s]?(\d{2})$/;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError(phoneCountry === 'US' 
        ? 'Неверный формат номера. Пример: +1 (555) 123-4567' 
        : 'Неверный формат номера. Пример: +380 93 123 45 67');
      toast({
        title: 'Неверный формат',
        description: 'Пожалуйста, введите номер телефона в правильном формате',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setPhoneError('');
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      // Сбрасываем корзину после успешной оплаты
      setTimeout(() => {
        setCart([]);
        setIsPaymentOpen(false);
        setPaymentStatus('');
        setPhoneNumber('');
        toast({
          title: 'Order confirmed!',
          description: 'Your coffee will be ready soon',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }, 2000);
    }, 3000);
  };

  // Отображение количества товаров в корзине
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Navigates to product detail page
  const viewProductDetails = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // Форматирование номера телефона при вводе
  const formatPhoneNumber = (value: string): string => {
    // Удаляем все нецифровые символы для обработки
    const digits = value.replace(/\D/g, '');
    
    if (phoneCountry === 'US') {
      // Форматирование для США
      if (digits.length <= 3) {
        return digits;
      } else if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else if (digits.length <= 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      } else {
        // Если есть код страны
        return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
      }
    } else {
      // Форматирование для Украины
      if (digits.length <= 2) {
        return digits;
      } else if (digits.length <= 5) {
        return `${digits.slice(0, 2)} ${digits.slice(2)}`;
      } else if (digits.length <= 7) {
        return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
      } else if (digits.length <= 9) {
        return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
      } else {
        // Если есть код страны
        return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
      }
    }
  };

  // Обработка изменения номера телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Если пользователь удаляет символы, не применяем форматирование
    if (input.length < phoneNumber.length) {
      setPhoneNumber(input);
    } else {
      // Применяем форматирование при добавлении символов
      setPhoneNumber(formatPhoneNumber(input));
    }
    setPhoneError('');
  };

  // Обработка изменения страны
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setPhoneCountry(country);
    
    // Если номер еще не введен или только начат ввод, предлагаем код страны
    if (!phoneNumber || phoneNumber.length < 3) {
      if (country === 'US') {
        setPhoneNumber('+1 ');
      } else {
        setPhoneNumber('+380 ');
      }
    } else {
      // Если номер уже введен, сбрасываем его
      setPhoneNumber('');
    }
    
    setPhoneError('');
  };

  // Отображение информации о необходимом формате телефона
  const getPhoneFormat = () => {
    return phoneCountry === 'US' 
      ? 'Например: +1 (555) 123-4567'
      : 'Например: +380 93 123 45 67';
  };

  return (
    <Box bg="gray.50" minH="100vh" pt={{ base: 20, md: 28 }} pb={20}>
      <Container maxW="container.xl">
        {/* Page Header */}
        <Box mb={12} textAlign="center">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, brown.400, brown.600)"
              bgClip="text"
              mb={4}
              letterSpacing="tight"
            >
              Our Menu
            </Heading>
            <Text 
              fontSize="xl" 
              color="gray.600" 
              maxW="700px" 
              mx="auto"
              lineHeight="tall"
            >
              Discover a world of flavor in our carefully curated collection of coffee beverages, 
              crafted with love and attention to every detail
            </Text>
          </MotionBox>
        </Box>

        {/* Cart button and filters */}
        <Flex 
          w="100%" 
          justifyContent="space-between" 
          alignItems="center" 
          flexWrap="wrap" 
          gap={4} 
          mb={8}
          position="sticky"
          top="70px"
          zIndex="10"
          bg="rgba(247, 250, 252, 0.8)"
          backdropFilter="blur(8px)"
          py={4}
          px={{ base: 2, md: 4 }}
          borderRadius="lg"
          boxShadow="sm"
        >
          <HStack 
            spacing={3} 
            flexWrap="wrap"
            bg="white"
            p={2}
            borderRadius="md"
            boxShadow="sm"
          >
            <Text 
              fontSize="sm" 
              fontWeight="medium" 
              color="gray.600" 
              pl={2} 
              display={{ base: 'none', md: 'block' }}
            >
              <Icon as={FaFilter} mr={2} />
              Filter:
            </Text>
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                colorScheme={selectedCategory === category ? 'brown' : 'gray'}
                variant={selectedCategory === category ? 'solid' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                _hover={{ transform: selectedCategory !== category ? 'translateY(-2px)' : 'none' }}
                transition="all 0.2s"
              >
                {category === 'Classics' && <Icon as={FaCoffee} mr={2} />}
                {category === 'Specialties' && <Icon as={FaStar} mr={2} />}
                {category === 'Cold' && <Icon as={FaGlassWhiskey} mr={2} />}
                {category === 'All' && <Icon as={FaLeaf} mr={2} />}
                {category}
              </Button>
            ))}
          </HStack>
          
          <Tooltip 
            label={`${cartItemsCount} items in cart`} 
            placement="top" 
            hasArrow
          >
            <IconButton
              aria-label="Shopping cart"
              icon={<>
                <FaShoppingCart />
                {cartItemsCount > 0 && (
                  <Badge
                    colorScheme="brown"
                    borderRadius="full"
                    position="absolute"
                    top="-8px"
                    right="-8px"
                    fontSize="0.8em"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </>}
              onClick={onOpen}
              colorScheme="brown"
              size="lg"
              position="relative"
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            />
          </Tooltip>
        </Flex>

        {/* Product Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredItems.map((item) => (
            <MotionBox
              key={item.id}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                bg="white"
                borderRadius="xl"
                overflow="hidden"
                boxShadow="lg"
                h="100%"
                position="relative"
                transition="all 0.3s"
                _hover={{ boxShadow: "xl" }}
              >
                {/* Popular badge */}
                {item.popular && (
                  <Badge
                    colorScheme="red"
                    position="absolute"
                    top={3}
                    right={3}
                    zIndex={1}
                    fontSize="xs"
                    px={2}
                    py={1}
                    borderRadius="md"
                    boxShadow="md"
                  >
                    <Flex align="center">
                      <FaStar style={{ marginRight: '4px' }} />
                      Popular
                    </Flex>
                  </Badge>
                )}
                
                {/* Coffee image with hover effect */}
                <Box position="relative" h="260px" overflow="hidden">
                  <MotionImage
                    src={item.image}
                    alt={item.name}
                    h="100%"
                    w="100%"
                    objectFit="cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => viewProductDetails(item.id)}
                    cursor="pointer"
                  />
                  <Box 
                    position="absolute" 
                    bottom="0" 
                    left="0" 
                    right="0" 
                    bg="blackAlpha.60" 
                    backdropFilter="blur(5px)"
                    color="white"
                    p={3}
                    transform="translateY(100%)"
                    transition="transform 0.3s"
                    _groupHover={{ transform: "translateY(0)" }}
                  >
                    <Text fontWeight="bold" fontSize="sm">Ingredients:</Text>
                    <HStack mt={1} flexWrap="wrap">
                      {item.ingredients.map((ing, idx) => (
                        <Tag key={idx} size="sm" colorScheme="orange" variant="subtle">
                          {ing}
                        </Tag>
                      ))}
                    </HStack>
                  </Box>
                </Box>
                
                <Box p={5}>
                  <Flex justify="space-between" align="center" mb={2}>
                    <Heading 
                      as="h3" 
                      size="md" 
                      cursor="pointer" 
                      onClick={() => viewProductDetails(item.id)}
                      _hover={{ color: "brown.500" }}
                      transition="color 0.2s"
                    >
                      {item.name}
                    </Heading>
                    <Badge colorScheme="brown" px={2} py={1}>
                      {item.category}
                    </Badge>
                  </Flex>
                  
                  <Text color="gray.600" fontSize="sm" mb={4} minH="40px">
                    {item.description}
                  </Text>
                  
                  <Divider mb={4} />
                  
                  <Flex justify="space-between" align="center" mb={4}>
                    <Text fontWeight="bold" fontSize="xl" color="brown.500">
                      ${item.price.toFixed(2)}
                    </Text>
                    <HStack>
                      <Button
                        size="sm"
                        leftIcon={<FaShoppingCart />}
                        colorScheme="brown"
                        variant="ghost"
                        onClick={() => setSelectedProduct(item)}
                        _hover={{ bg: "brown.50" }}
                      >
                        Order
                      </Button>
                      <IconButton
                        aria-label="View details"
                        icon={<FaInfo />}
                        colorScheme="blue"
                        variant="ghost"
                        size="sm"
                        onClick={() => viewProductDetails(item.id)}
                      />
                    </HStack>
                  </Flex>
                </Box>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Shopping Cart */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
          <DrawerOverlay backdropFilter="blur(2px)" />
          <DrawerContent>
            <DrawerHeader 
              borderBottomWidth="1px" 
              bg="brown.500" 
              color="white"
              position="relative"
              py={4}
            >
              <Flex align="center">
                <Icon as={FaShoppingCart} mr={3} />
                <Text fontSize="lg">Your Cart ({cartItemsCount} items)</Text>
              </Flex>
              <DrawerCloseButton color="white" _hover={{ bg: "whiteAlpha.200" }} />
            </DrawerHeader>
            <DrawerBody>
              {cart.length === 0 ? (
                <VStack py={10} spacing={6}>
                  <MotionBox 
                    fontSize="7xl" 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    🛒
                  </MotionBox>
                  <Heading size="md" color="gray.500">Your cart is empty</Heading>
                  <Text color="gray.400" textAlign="center">
                    Add items from our menu to place an order
                  </Text>
                  <Button 
                    variant="outline" 
                    colorScheme="brown" 
                    onClick={onClose}
                    size="lg"
                    leftIcon={<FaCoffee />}
                    _hover={{ transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    Return to Menu
                  </Button>
                </VStack>
              ) : (
                <VStack spacing={5} align="stretch" py={4}>
                  {cart.map((item) => (
                    <MotionBox
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      p={3}
                      borderWidth="1px"
                      borderRadius="lg"
                      boxShadow="sm"
                      bg="white"
                    >
                      <Flex gap={4} align="center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          boxSize="80px"
                          objectFit="cover"
                          borderRadius="md"
                          boxShadow="sm"
                        />
                        <Box flex="1">
                          <Flex justify="space-between" align="flex-start">
                            <Box>
                              <Heading size="sm" mb={1} color="brown.700">{item.name}</Heading>
                              <HStack spacing={1}>
                                <Tag size="sm" colorScheme="brown" variant="subtle">{item.size}</Tag>
                                <Tag size="sm" colorScheme="green" variant="subtle">{item.option}</Tag>
                              </HStack>
                            </Box>
                            <IconButton
                              aria-label="Remove item"
                              icon={<FaTrash />}
                              size="xs"
                              colorScheme="red"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              _hover={{ bg: "red.50" }}
                            />
                          </Flex>
                          <Flex justify="space-between" align="center" mt={3}>
                            <Text fontWeight="bold" color="brown.600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </Text>
                            <HStack 
                              p={1} 
                              borderRadius="md" 
                              border="1px" 
                              borderColor="gray.200"
                              bg="gray.50"
                            >
                              <IconButton
                                aria-label="Decrease quantity"
                                icon={<FaMinus />}
                                size="xs"
                                variant="ghost"
                                colorScheme="brown"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                isDisabled={item.quantity <= 1}
                              />
                              <Text fontWeight="medium" w="30px" textAlign="center">{item.quantity}</Text>
                              <IconButton
                                aria-label="Increase quantity"
                                icon={<FaPlus />}
                                size="xs"
                                variant="ghost"
                                colorScheme="brown"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              />
                            </HStack>
                          </Flex>
                        </Box>
                      </Flex>
                    </MotionBox>
                  ))}
                  
                  <Box 
                    p={5} 
                    borderRadius="lg" 
                    bg="brown.50" 
                    mt={4} 
                    boxShadow="sm"
                    border="1px"
                    borderColor="brown.100"
                  >
                    <Text fontSize="sm" color="gray.500" mb={4}>
                      Order Summary
                    </Text>
                    
                    <Flex justify="space-between" fontSize="md" mb={2}>
                      <Text color="gray.600">Subtotal:</Text>
                      <Text fontWeight="medium">${cartTotal.toFixed(2)}</Text>
                    </Flex>
                    
                    <Flex justify="space-between" fontSize="md" mb={4}>
                      <Text color="gray.600">Delivery:</Text>
                      <Text fontWeight="medium">Free</Text>
                    </Flex>
                    
                    <Divider borderColor="gray.300" mb={4} />
                    
                    <Flex justify="space-between" fontWeight="bold" fontSize="lg" mb={6}>
                      <Text>Total:</Text>
                      <Text color="brown.600">${cartTotal.toFixed(2)}</Text>
                    </Flex>
                    
                    <Box bg="white" p={4} borderRadius="md" mb={4}>
                      <Text fontSize="sm" color="gray.500" mb={2}>
                        <Icon as={FaInfo} mr={2} />
                        You'll need to provide a phone number to complete your order
                      </Text>
                    </Box>
                    
                    <Button
                      colorScheme="brown"
                      size="lg"
                      width="full"
                      onClick={proceedToCheckout}
                      rightIcon={<FaCreditCard />}
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                      transition="all 0.2s"
                    >
                      Proceed to Checkout
                    </Button>
                  </Box>
                </VStack>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Модальное окно оплаты */}
        {isPaymentOpen && (
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(0,0,0,0.75)"
            zIndex={1000}
            display="flex"
            alignItems="center"
            justifyContent="center"
            backdropFilter="blur(5px)"
            onClick={() => {
              if (paymentStatus !== 'processing') {
                setIsPaymentOpen(false);
              }
            }}
          >
            <MotionBox
              bg="white"
              borderRadius="xl"
              maxW="500px"
              w="90%"
              overflow="hidden"
              boxShadow="2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {paymentStatus === 'success' ? (
                <MotionBox 
                  py={12} 
                  px={6} 
                  textAlign="center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <MotionBox 
                    fontSize="8xl" 
                    mb={6}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0, -10, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: 1,
                    }}
                  >
                    ✅
                  </MotionBox>
                  <Heading size="lg" mb={4} color="green.600">Оплата Прошла Успешно!</Heading>
                  <Text fontSize="lg" mb={8} color="gray.600">
                    Спасибо за ваш заказ. Ваш кофе будет готов в ближайшее время.
                  </Text>
                  <Button 
                    colorScheme="brown"
                    size="lg"
                    onClick={() => {
                      setIsPaymentOpen(false);
                      setPaymentStatus('');
                    }}
                    _hover={{ transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    Вернуться к Меню
                  </Button>
                </MotionBox>
              ) : paymentStatus === 'processing' ? (
                <Box py={12} px={6} textAlign="center">
                  <MotionBox 
                    fontSize="8xl" 
                    mb={6}
                    animate={{ rotate: [0, 360] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    ⏳
                  </MotionBox>
                  <Heading size="lg" mb={4}>Обработка Платежа...</Heading>
                  <Text fontSize="md" color="gray.600">
                    Пожалуйста, подождите, пока мы обрабатываем ваш платеж.
                  </Text>
                </Box>
              ) : (
                <>
                  <Box 
                    py={6} 
                    px={6} 
                    borderBottom="1px solid" 
                    borderColor="gray.200"
                    bg="brown.50"
                  >
                    <Flex justify="space-between" align="center">
                      <Heading size="md">Платежная Информация</Heading>
                      <IconButton 
                        aria-label="Close" 
                        icon={<Box>✖</Box>} 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setIsPaymentOpen(false)}
                      />
                    </Flex>
                  </Box>
                  
                  <Box p={6}>
                    <VStack spacing={5} align="stretch">
                      <Box bg="gray.50" p={4} borderRadius="md" mb={2}>
                        <Flex justify="space-between" mb={2}>
                          <Text color="gray.600">Итого:</Text>
                          <Text fontWeight="bold" color="brown.600">${cartTotal.toFixed(2)}</Text>
                        </Flex>
                        <Text fontSize="xs" color="gray.500">
                          Оплата будет обработана безопасно
                        </Text>
                      </Box>
                      
                      <FormControl isRequired>
                        <FormLabel>Страна</FormLabel>
                        <Select 
                          value={phoneCountry}
                          onChange={handleCountryChange}
                          bg="white"
                          borderColor="gray.300"
                          _focus={{ borderColor: "brown.400", boxShadow: "0 0 0 1px var(--chakra-colors-brown-400)" }}
                        >
                          <option value="UA">Украина 🇺🇦</option>
                          <option value="US">США 🇺🇸</option>
                        </Select>
                      </FormControl>
                      
                      <FormControl isRequired isInvalid={!!phoneError}>
                        <FormLabel>Номер телефона</FormLabel>
                        <Input 
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          placeholder={phoneCountry === 'US' ? "+1 (555) 123-4567" : "+380 93 123 45 67"} 
                          maxLength={phoneCountry === 'US' ? 16 : 19} 
                          bg="white"
                          borderColor="gray.300"
                          _focus={{ borderColor: "brown.400", boxShadow: "0 0 0 1px var(--chakra-colors-brown-400)" }}
                        />
                        {!phoneError && (
                          <Text fontSize="xs" color="gray.500" mt={1}>
                            {getPhoneFormat()}
                          </Text>
                        )}
                        {phoneError && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {phoneError}
                          </Text>
                        )}
                      </FormControl>
                      
                      <FormControl isRequired>
                        <FormLabel>Номер Карты</FormLabel>
                        <Input 
                          placeholder="1234 5678 9012 3456" 
                          maxLength={19} 
                          bg="white"
                          borderColor="gray.300"
                          _focus={{ borderColor: "brown.400", boxShadow: "0 0 0 1px var(--chakra-colors-brown-400)" }}
                        />
                      </FormControl>
                      
                      <Flex gap={4}>
                        <FormControl isRequired>
                          <FormLabel>Срок Действия</FormLabel>
                          <Input 
                            placeholder="ММ/ГГ" 
                            maxLength={5} 
                            bg="white"
                            borderColor="gray.300"
                            _focus={{ borderColor: "brown.400", boxShadow: "0 0 0 1px var(--chakra-colors-brown-400)" }}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>CVV</FormLabel>
                          <Input 
                            placeholder="123" 
                            maxLength={3} 
                            type="password" 
                            bg="white"
                            borderColor="gray.300"
                            _focus={{ borderColor: "brown.400", boxShadow: "0 0 0 1px var(--chakra-colors-brown-400)" }}
                          />
                        </FormControl>
                      </Flex>
                      
                      <FormControl isRequired>
                        <FormLabel>Имя на Карте</FormLabel>
                        <Input 
                          placeholder="John Doe" 
                          bg="white"
                          borderColor="gray.300"
                          _focus={{ borderColor: "brown.400", boxShadow: "0 0 0 1px var(--chakra-colors-brown-400)" }}
                        />
                      </FormControl>
                      
                      <Flex justifyContent="space-between" mt={4}>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsPaymentOpen(false)}
                          _hover={{ bg: "gray.50" }}
                        >
                          Отмена
                        </Button>
                        <Button
                          leftIcon={<FaCreditCard />}
                          colorScheme="green"
                          onClick={processPayment}
                          _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                          transition="all 0.2s"
                        >
                          Оплатить Сейчас
                        </Button>
                      </Flex>
                    </VStack>
                  </Box>
                </>
              )}
            </MotionBox>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Menu 
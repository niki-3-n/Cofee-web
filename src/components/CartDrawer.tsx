import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Image,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Button,
  IconButton,
  useToast,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { FaTrash, FaPlus, FaMinus, FaCreditCard } from 'react-icons/fa'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartItemsCount, clearCart } = useCart();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const toast = useToast();

  // Handle checkout process
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
    onClose(); // Close cart drawer
  };

  // Simulate payment processing
  const processPayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      // Reset cart after successful payment
      setTimeout(() => {
        clearCart();
        setIsPaymentOpen(false);
        setPaymentStatus('');
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

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Your Cart ({cartItemsCount} items)
          </DrawerHeader>
          <DrawerBody>
            {cart.length === 0 ? (
              <VStack py={10} spacing={4}>
                <Box fontSize="5xl">🛒</Box>
                <Text>Your cart is empty</Text>
                <Button variant="outline" colorScheme="brown" onClick={onClose}>
                  Continue Shopping
                </Button>
              </VStack>
            ) : (
              <VStack spacing={5} align="stretch">
                {cart.map((item) => (
                  <Box key={item.id} p={3} borderWidth="1px" borderRadius="md">
                    <Flex gap={3}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="60px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Box flex="1">
                        <Flex justify="space-between" align="flex-start">
                          <Box>
                            <Heading size="sm">{item.name}</Heading>
                            <Text fontSize="xs" color="gray.600">
                              {item.size}, {item.option}
                            </Text>
                          </Box>
                          <IconButton
                            aria-label="Remove item"
                            icon={<FaTrash />}
                            size="xs"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                          />
                        </Flex>
                        <Flex justify="space-between" align="center" mt={2}>
                          <Text fontWeight="bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                          <HStack>
                            <IconButton
                              aria-label="Decrease quantity"
                              icon={<FaMinus />}
                              size="xs"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              isDisabled={item.quantity <= 1}
                            />
                            <Text>{item.quantity}</Text>
                            <IconButton
                              aria-label="Increase quantity"
                              icon={<FaPlus />}
                              size="xs"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            />
                          </HStack>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                ))}
                <Box py={4}>
                  <Flex justify="space-between" fontWeight="bold" fontSize="lg">
                    <Text>Total:</Text>
                    <Text>${cartTotal.toFixed(2)}</Text>
                  </Flex>
                  <Button
                    colorScheme="brown"
                    size="lg"
                    width="full"
                    mt={4}
                    onClick={proceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Payment Modal */}
      {isPaymentOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0,0,0,0.7)"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            maxW="500px"
            w="90%"
          >
            {paymentStatus === 'success' ? (
              <VStack spacing={5} py={8}>
                <Box fontSize="5xl">✅</Box>
                <Heading size="md">Payment Successful!</Heading>
                <Text textAlign="center">
                  Thank you for your order. Your coffee will be ready soon.
                </Text>
              </VStack>
            ) : paymentStatus === 'processing' ? (
              <VStack spacing={5} py={8}>
                <Box fontSize="5xl">⏳</Box>
                <Heading size="md">Processing Payment...</Heading>
                <Text textAlign="center">
                  Please wait while we process your payment.
                </Text>
              </VStack>
            ) : (
              <>
                <Heading size="md" mb={5}>Payment Details</Heading>
                <VStack spacing={4} align="stretch" mb={6}>
                  <FormControl isRequired>
                    <FormLabel>Card Number</FormLabel>
                    <Input placeholder="1234 5678 9012 3456" maxLength={19} />
                  </FormControl>
                  <Flex gap={4}>
                    <FormControl isRequired>
                      <FormLabel>Expiry Date</FormLabel>
                      <Input placeholder="MM/YY" maxLength={5} />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>CVV</FormLabel>
                      <Input placeholder="123" maxLength={3} type="password" />
                    </FormControl>
                  </Flex>
                  <FormControl isRequired>
                    <FormLabel>Name on Card</FormLabel>
                    <Input placeholder="John Doe" />
                  </FormControl>
                </VStack>
                <Text fontWeight="bold" mb={3}>
                  Total: ${cartTotal.toFixed(2)}
                </Text>
                <Flex justifyContent="space-between">
                  <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    leftIcon={<FaCreditCard />}
                    colorScheme="green"
                    onClick={processPayment}
                  >
                    Pay Now
                  </Button>
                </Flex>
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default CartDrawer; 
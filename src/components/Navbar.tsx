import { Box, Flex, Button, Container, IconButton, Badge, useDisclosure } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCoffee, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

const MotionBox = motion(Box)

const Navbar = () => {
  const { cartItemsCount } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        as="nav"
        position="fixed"
        w="100%"
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        zIndex={1000}
      >
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <Flex
            h="70px"
            align="center"
            justify="space-between"
          >
            <MotionBox
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RouterLink to="/">
                <Flex align="center" gap={2}>
                  <FaCoffee size="24px" color="#4A5568" />
                  <Box fontWeight="bold" fontSize="xl">Coffee House</Box>
                </Flex>
              </RouterLink>
            </MotionBox>

            <Flex align="center" gap={{ base: 1, md: 4 }}>
              {['Home', 'Menu', 'About', 'Contact', 'Reservation'].map((item) => (
                <Button
                  key={item}
                  as={RouterLink}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  variant="ghost"
                  _hover={{ bg: 'gray.100' }}
                  fontSize={{ base: 'sm', md: 'md' }}
                  px={{ base: 2, md: 4 }}
                >
                  {item}
                </Button>
              ))}
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
                variant="ghost"
                size="md"
                position="relative"
              />
            </Flex>
          </Flex>
        </Container>
      </Box>

      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Navbar 
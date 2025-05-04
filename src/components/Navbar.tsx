import { Box, Flex, Button, Container, IconButton, Badge, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Stack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCoffee, FaShoppingCart, FaBars } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

const MotionBox = motion(Box)

const Navbar = () => {
  const { cartItemsCount } = useCart();
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();

  const navItems = ['Home', 'Menu', 'About', 'Contact', 'Reservation'];

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

            {/* Desktop Navigation */}
            <Flex 
              align="center" 
              gap={{ base: 1, md: 4 }}
              display={{ base: 'none', md: 'flex' }}
            >
              {navItems.map((item) => (
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
                onClick={onCartOpen}
                colorScheme="brown"
                variant="ghost"
                size="md"
                position="relative"
              />
            </Flex>

            {/* Mobile Navigation */}
            <Flex
              align="center"
              gap={2}
              display={{ base: 'flex', md: 'none' }}
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
                onClick={onCartOpen}
                colorScheme="brown"
                variant="ghost"
                size="md"
                position="relative"
              />
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                icon={<FaBars />}
                onClick={onMenuOpen}
                variant="ghost"
              />
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        isOpen={isMenuOpen}
        placement="right"
        onClose={onMenuClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex align="center" gap={2}>
              <FaCoffee size="24px" color="#4A5568" />
              <Box>Menu</Box>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={4} mt={4}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  as={RouterLink}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  variant="ghost"
                  justifyContent="flex-start"
                  w="100%"
                  onClick={onMenuClose}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <CartDrawer isOpen={isCartOpen} onClose={onCartClose} />
    </>
  )
}

export default Navbar 
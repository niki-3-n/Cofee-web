import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
        margin: 0,
        padding: 0,
        minHeight: '100vh'
      },
      '#root': {
        width: '100%',
        margin: '0 auto'
      }
    },
  },
  colors: {
    brown: {
      50: '#F5F0E6',
      100: '#E6D9C3',
      200: '#D4C3A5',
      300: '#C2AD87',
      400: '#B09769',
      500: '#9E814B',
      600: '#7E673C',
      700: '#5F4D2D',
      800: '#3F331E',
      900: '#201A0F',
    },
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Inter", sans-serif',
  },
  components: {
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: { base: 4, md: 8 },
        mx: 'auto'
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brown.500',
          color: 'white',
          _hover: {
            bg: 'brown.600',
          },
        },
        outline: {
          borderColor: 'brown.500',
          color: 'brown.500',
          _hover: {
            bg: 'brown.50',
          },
        },
      },
    },
    FormControl: {
      baseStyle: {
        width: '100%',
      },
    },
    Input: {
      baseStyle: {
        field: {
          _focus: {
            borderColor: 'brown.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brown-500)',
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        _focus: {
          borderColor: 'brown.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-brown-500)',
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          _focus: {
            borderColor: 'brown.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brown-500)',
          },
        },
      },
    },
  },
})

export default theme 
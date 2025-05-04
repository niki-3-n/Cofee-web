import { extendTheme } from '@chakra-ui/react'

// Breakpoints для адаптивного дизайна
const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

const theme = extendTheme({
  breakpoints,
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
      // Добавляем размеры для мобильной версии
      sizes: {
        sm: {
          fontSize: { base: 'xs', md: 'sm' },
          px: { base: 2, md: 3 },
          py: { base: 1, md: 2 },
        },
        md: {
          fontSize: { base: 'sm', md: 'md' },
          px: { base: 3, md: 4 },
          py: { base: 2, md: 2 },
        },
        lg: {
          fontSize: { base: 'md', md: 'lg' },
          px: { base: 4, md: 6 },
          py: { base: 2, md: 3 },
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
      sizes: {
        md: {
          field: {
            fontSize: { base: 'sm', md: 'md' },
            px: { base: 2, md: 4 },
            h: { base: '40px', md: '48px' },
          }
        }
      }
    },
    Textarea: {
      baseStyle: {
        _focus: {
          borderColor: 'brown.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-brown-500)',
        },
      },
      sizes: {
        md: {
          fontSize: { base: 'sm', md: 'md' },
          px: { base: 2, md: 4 },
        }
      }
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
      sizes: {
        md: {
          field: {
            fontSize: { base: 'sm', md: 'md' },
            px: { base: 2, md: 4 },
            h: { base: '40px', md: '48px' },
          }
        }
      }
    },
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: 'bold',
      },
      sizes: {
        xl: {
          fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
          lineHeight: { base: 1.2, md: 1.4 }
        },
        '2xl': {
          fontSize: { base: '3xl', md: '4xl', lg: '5xl' },
          lineHeight: { base: 1.2, md: 1.4 }
        },
      }
    },
    Text: {
      sizes: {
        md: {
          fontSize: { base: 'sm', md: 'md' },
          lineHeight: { base: 1.4, md: 1.5 }
        },
        lg: {
          fontSize: { base: 'md', md: 'lg' },
          lineHeight: { base: 1.5, md: 1.6 }
        }
      }
    }
  },
})

export default theme 
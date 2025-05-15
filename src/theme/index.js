import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    darkBrown: "#8b6c5c", // 가장 어두운 색
    mediumBrown: "#a08679", // 중간 어두운 색
    lightBrown: "#bca89f", // 중간 밝은 색
    veryLightBrown: "#d8cbc4", // 가장 밝은 색
    background: "#f7f3f0", // 전체 배경색 (추가)
    textSubtle: "#a08679", // mediumBrown을 미묘한 텍스트 색으로도 활용
    textBody: "#5c3c2c", // 약간 더 어두운 갈색 (기존 darkBrown 보다 조금 더)
    accent: "#c08452", // 포인트 컬러 (주황색 계열 갈색)
  },
};

const shadows = {
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
  md: '0 4px 8px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)', // 부드럽게 수정
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)', // 부드럽게 수정
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.03)', // 부드럽게 수정
  outline: `0 0 0 3px ${colors.brand.darkBrown}60`, // 투명도 추가
  inset: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)',
};

const radii = {
  sm: '0.25rem', 
  md: '0.5rem',  
  lg: '0.75rem', 
  xl: '1rem',   
  full: '9999px',
};

const theme = extendTheme({
  colors,
  shadows, 
  radii,   
  styles: {
    global: {
      body: {
        bg: "brand.background",
        color: "brand.textBody", // 기본 텍스트 색 변경
        lineHeight: "tall",
      },
      "*::placeholder": {
        color: "brand.textSubtle",
        opacity: 0.7,
      },
      "*, *::before, &::after": {
        borderColor: "brand.veryLightBrown", // 기본 border 색상 통일
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "container.md",
        px: { base: 4, md: 5 }, 
        py: { base: 5, md: 6 }, 
      }
    },
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
        transition: "all 0.2s ease-in-out",
      },
      variants: {
        solid: (props) => ({
          bg: 'brand.darkBrown',
          color: 'white',
          _hover: {
            bg: 'brand.mediumBrown',
            transform: 'translateY(-1px)',
            boxShadow: 'md',
            _disabled: { // 비활성화 시 호버 스타일 제거
                bg: 'brand.darkBrown',
                transform: 'none',
                boxShadow: 'none',
            }
          },
          _active: {
            bg: 'brand.accent',
            transform: 'translateY(0px)',
            boxShadow: 'sm',
          },
        }),
        outline: (props) => ({
          borderColor: 'brand.lightBrown', // 더 연한 테두리
          color: 'brand.darkBrown',
          _hover: {
            bg: 'brand.veryLightBrown',
            borderColor: 'brand.mediumBrown',
            color: 'brand.mediumBrown',
            transform: 'translateY(-1px)',
          },
           _active: {
            bg: `brand.veryLightBrown`,
            transform: 'translateY(0px)',
          },
        }),
        ghost: {
          color: 'brand.darkBrown',
          _hover: {
            bg: 'brand.veryLightBrown',
            color: 'brand.mediumBrown',
          },
        },
        link: {
          color: 'brand.accent', // 포인트 컬러 사용
          fontWeight: 'medium',
          textDecoration: 'none',
          _hover: {
            color: 'brand.darkBrown',
            textDecoration: 'underline',
          }
        }
      },
      sizes: {
        md: {
          fontSize: 'sm', // 약간 작게
          px: 4,
          h: '2.5rem', // 높이 고정
        },
        lg: {
          fontSize: 'md',
          px: 6,
          h: '3rem',
        }
      },
      defaultProps: {
        size: 'md',
      }
    },
    Heading: {
      baseStyle: {
        color: 'brand.textBody',
        fontWeight: 'bold',
      },
      sizes: {
        '2xl': { fontSize: { base: '2rem', md: '2.5rem' }, lineHeight: 1.2 },
        xl: { fontSize: { base: '1.75rem', md: '2rem' }, lineHeight: 1.2 },
        lg: { fontSize: { base: '1.375rem', md: '1.5rem' }, lineHeight: 1.3 },
        md: { fontSize: { base: '1.125rem', md: '1.25rem' }, lineHeight: 1.3 },
        sm: { fontSize: '1rem', lineHeight: 1.4 },
        xs: { fontSize: '0.875rem', lineHeight: 1.4 },
      }
    },
    Text: {
      baseStyle: {
        color: 'brand.textBody',
        lineHeight: 'tall',
      },
      variants: {
        subtle: {
          color: 'brand.textSubtle',
        },
        caps: { 
            textTransform: 'uppercase',
            fontSize: 'xs',
            fontWeight: 'semibold',
            letterSpacing: 'wider',
            color: 'brand.textSubtle'
        }
      }
    },
    Card: {
      baseStyle: {
        bg: 'white',
        borderRadius: 'xl', 
        boxShadow: 'md', 
        p: { base: 4, md: 6 },
        overflow: 'hidden', // 내부 컨텐츠가 radius를 넘지 않도록
      },
      variants: {
        outline: {
          borderWidth: '1px',
          borderColor: 'brand.veryLightBrown',
          boxShadow: 'sm',
        },
        elevated: {
            boxShadow: 'lg',
            transition: 'box-shadow 0.2s ease-out, transform 0.2s ease-out',
            _hover: {
                boxShadow: 'xl',
                transform: 'translateY(-2px)',
            }
        },
        smooth: { // 그림자 거의 없고, 테두리만 살짝
            boxShadow: 'none',
            borderWidth: '1px',
            borderColor: 'brand.veryLightBrown',
            p: { base: 3, md: 4 },
        },
        unstyled: {
            p:0,
            bg: 'transparent',
            boxShadow: 'none',
            borderRadius: 0,
        }
      },
      defaultProps: {
        variant: 'elevated',
      }
    },
    Input: { 
        variants: {
            outline: {
                field: {
                    bg: "white",
                    borderColor: "brand.veryLightBrown",
                    borderRadius: "md",
                    color: "brand.textBody",
                    _hover: {
                        borderColor: "brand.lightBrown",
                    },
                    _focus: {
                        borderColor: "brand.darkBrown",
                        boxShadow: `0 0 0 1px ${colors.brand.darkBrown}`,
                    },
                },
            },
            filled: {
                field: {
                    bg: "brand.veryLightBrown",
                    borderColor: "transparent",
                    borderRadius: "md",
                    color: "brand.textBody",
                    _hover: {
                        bg: "#ECE7E4", // veryLightBrown보다 살짝 어둡게
                    },
                    _focus: {
                        bg: "brand.veryLightBrown",
                        borderColor: "brand.darkBrown",
                        boxShadow: `0 0 0 1px ${colors.brand.darkBrown}`,
                    },
                }
            }
        },
        defaultProps: {
            variant: 'outline',
        },
    },
    Select: { 
        variants: {
            outline: {
                field: {
                    bg: "white",
                    borderColor: "brand.veryLightBrown",
                    borderRadius: "md",
                    color: "brand.textBody",
                    _hover: {
                        borderColor: "brand.lightBrown",
                    },
                    _focus: {
                        borderColor: "brand.darkBrown",
                        boxShadow: `0 0 0 1px ${colors.brand.darkBrown}`,
                    },
                },
            },
            filled: {
                 field: {
                    bg: "brand.veryLightBrown",
                    borderColor: "transparent",
                    borderRadius: "md",
                    color: "brand.textBody",
                    _hover: {
                        bg: "#ECE7E4",
                    },
                    _focus: {
                        bg: "brand.veryLightBrown",
                        borderColor: "brand.darkBrown",
                        boxShadow: `0 0 0 1px ${colors.brand.darkBrown}`,
                    },
                }
            }
        },
        defaultProps: {
            variant: 'outline',
        },
    },
    Textarea: { 
        variants: {
            outline: {
                bg: "white",
                borderColor: "brand.veryLightBrown",
                borderRadius: "md",
                color: "brand.textBody",
                _hover: {
                    borderColor: "brand.lightBrown",
                },
                _focus: {
                    borderColor: "brand.darkBrown",
                    boxShadow: `0 0 0 1px ${colors.brand.darkBrown}`,
                },
            },
            filled: {
                bg: "brand.veryLightBrown",
                borderColor: "transparent",
                borderRadius: "md",
                color: "brand.textBody",
                 _hover: {
                    bg: "#ECE7E4",
                },
                _focus: {
                    bg: "brand.veryLightBrown",
                    borderColor: "brand.darkBrown",
                    boxShadow: `0 0 0 1px ${colors.brand.darkBrown}`,
                },
            }
        },
        defaultProps: {
            variant: 'outline',
        },
    },
    Tabs: {
      variants: {
        'soft-rounded': { 
          tab: {
            borderRadius: 'full',
            fontWeight: 'semibold',
            color: 'brand.textSubtle',
            py: 2,
            px: 4,
            _selected: {
              color: 'white',
              bg: 'brand.darkBrown',
            },
            _hover: {
                color: 'brand.darkBrown',
                bg: 'brand.veryLightBrown',
            }
          },
          tablist: {
            gap: 2, 
            p:1,
            bg: 'brand.veryLightBrown',
            borderRadius: 'full',
          },
        },
        'line': {
            tab: {
                borderColor: 'transparent',
                color: 'brand.textSubtle',
                fontWeight: 'semibold',
                _selected: {
                    color: 'brand.accent',
                    borderColor: 'brand.accent',
                },
                 _hover: {
                    borderColor: 'brand.lightBrown',
                    color: 'brand.darkBrown',
                }
            }
        }
      },
    },
    Alert: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          px: 4,
          py: 3,
        }
      },
      variants: { 
        subtle: (props) => {
          const { colorScheme: c } = props;
          // Chakra UI 기본 색상 스키마 활용 (예: red, green, blue)
          if (['red', 'green', 'blue', 'yellow', 'orange', 'teal', 'purple', 'pink', 'cyan'].includes(c)) {
            return {
                container: {
                    bg: `${c}.50`,
                },
                icon: { color: `${c}.500` },
                title: { color: `${c}.700` },
                description: { color: `${c}.600` },
            };
          } 
          // 브랜드 색상 기반 알림 (직접 정의)
          if (c === 'brand') {
            return {
                container: {
                    bg: 'brand.veryLightBrown',
                    borderColor: 'brand.lightBrown',
                    borderWidth: '1px',
                },
                icon: { color: 'brand.darkBrown' },
                title: { color: 'brand.textBody' },
                description: { color: 'brand.mediumBrown' },
            }
          }
          return {};
        },
      }
    },
    Divider: {
        baseStyle: {
            borderColor: "brand.veryLightBrown",
            opacity: 0.8,
        }
    }
  },
});

export default theme; 
// theme.ts - 테마 상수 정의
export const theme = {
  colors: {
    primary: '#52BEB5',
    secondary: '#73B2D9',
    accent: '#D94C9E',
    error: '#CE4537',
    text: {
      primary: '#C1718A',
      secondary: '#748EBC',
      light: '#F1F1F1',
      placeholder: '#666666',
    },
    background: {
      gradient: ['#52BEB5', '#73B2D9', '#FFE5E5'],
      glass: 'rgba(116, 192, 177, 0.25)',
      input: 'rgba(255, 255, 255, 0.9)',
    },
    border: {
      default: 'rgba(140, 212, 212, 0.3)',
      input: 'rgba(115, 178, 217, 0.5)',
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 10,
    md: 20,
  },
  typography: {
    title: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    error: {
      fontSize: 12,
    }
  },
  shadows: {
    default: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    button: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    }
  }
};

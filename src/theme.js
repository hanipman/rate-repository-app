import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#ffffff',
    textSecondary: '#000000',
    primary: '#0366d6',
    secondary: '#24292e'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
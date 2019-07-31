export const theme = {
  colors: {
    primary: '#00cd5c',
    secondary: '#002776',
    error: '#ff0000',
  },
  breakpoints: ['40em', '52em', '64em', '76em'],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

export type Theme = typeof theme;
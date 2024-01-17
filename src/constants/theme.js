import {Dimensions} from 'react-native';

export const colors = {
  green: '#007236',
  blue: '#034EA2',
  red: '#EF4123',
  yellow: '#F6B419',
  white: '#fff',
  black: '#000',
};

export const shadow = {
  light: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dark: {
    shadowColor: colors.black,
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowOffset: {
      width: 10,
      height: 20,
    },
  },
};

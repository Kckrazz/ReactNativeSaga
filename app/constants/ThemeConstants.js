import Display from 'react-native-device-display'

// const isPhone = Display.isPhone()
 const isPhone =true
// const isTablet  = Display.isTablet();

export default {
  color: {
    button: {
      green: '#00A560',
      primary: '#FFFEFF',
      red: '#E76466'
    },
    body: {
      accent: '#00C1EC',
      primary: '#8F94A8',
      secondary: '#8F94A8'
    },
    content: {
      accent: '#00C1EC',
      primary: '#B3B3B3'
    }
  },
  font: {
    family: 'HelveticaNeue',
    size: {
      heading1: isPhone ? 23 : 28,
      heading2: isPhone ? 20 : 23,
      heading3: isPhone ? 17 : 19,
      paragraph: isPhone ? 17 : 19,
      caption: isPhone ? 15 : 16
    }
  }
}

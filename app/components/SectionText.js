import React from 'react'
import { StyleSheet } from 'react-native'

import constants from '../constants'
import MyText from '../components/MyText'

const styles = StyleSheet.create({
  text: {
    color: constants.theme.color.content.primary,
    fontSize: constants.theme.font.size.small,
    // fontWeight: 'bold',
    marginHorizontal: 9,
    marginVertical: 5
  },
  textLink: {
    color: constants.theme.color.content.emphasis,
    fontWeight: 'bold'
  }
})

const SectionText = (props) => {
  const style = [
    styles.text,
    props.onPress && styles.textLink,
    props.style
  ]

  return <MyText.Paragraph {...props} style={style} />
}

SectionText.displayName = 'SectionText'

SectionText.propTypes = {
  ...MyText.propTypes
}

SectionText.defaultProps = {
  ...MyText.defaultProps,
  style: styles.text
}

export default SectionText

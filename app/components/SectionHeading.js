import React from 'react'
import { StyleSheet } from 'react-native'

import constants from '../constants'
import MyText from '../components/MyText'

const styles = StyleSheet.create({
  text: {
    color: constants.theme.color.content.primary,
    fontSize: constants.theme.font.size.normal,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginHorizontal: 9,
    marginTop: 5
  }
})

const SectionHeading = (props) => (
  <MyText {...props}>{props.children}</MyText>
)

SectionHeading.displayName = 'SectionHeading'

SectionHeading.propTypes = {
  ...MyText.propTypes
}

SectionHeading.defaultProps = {
  ...MyText.defaultProps,
  style: styles.text
}

export default SectionHeading

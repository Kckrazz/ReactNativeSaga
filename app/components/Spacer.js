import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  spacer: {
    flex: 1,
    flexDirection: 'column'
  }
})

const Spacer = (props) => (
  <View style={styles.spacer} />
)

Spacer.displayName = 'Spacer'

export default Spacer

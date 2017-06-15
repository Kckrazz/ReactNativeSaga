import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import selectors from '../selectors'

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#414141',
    height: 20
  }
})

const StatusBarHandler = (props, context) => {
  const hidden = (
    // Hide when told to do so.
    props.hidden ||

    // Hide when keyboard is visible.
    context.keyboardVisible ||

    // Status bar is hidden in landscape orientation on a phone.
    (context.isPhone && context.isLandscape)
  )

  return (
    <View>
      <StatusBar {...props} hidden={hidden} />
      {hidden ? null : <View style={styles.statusBar} />}
    </View>
  )
}

StatusBarHandler.displayName = 'StatusBarHandler'

StatusBarHandler.propTypes = {
  ...StatusBar.propTypes
}

StatusBarHandler.defaultProps = {
  barStyle: 'default',
  translucent: true
}

const mapStateToProps = (state) => ({
  networkActivityIndicatorVisible: selectors.app.networkActivityIndicatorVisible(state)
})

export default connect(mapStateToProps)(StatusBarHandler)

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
// import Display from 'react-native-device-display'
import BasicScene from '../containers/BasicScene'
import LoginScene from '../containers/LoginScene'
import MainNavigation from '../containers/MainNavigation'
import Container from '../components/Container'
import KeyboardHandler from '../components/KeyboardHandler'
import MyText from '../components/MyText'
import selectors from '../selectors'

const mapStateToProps = (state) => ({
  authenticated: selectors.user.authenticated(state),
  initialised: selectors.app.initialised(state)
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default @connect(mapStateToProps)
class App extends React.Component {

  static childContextTypes = {
    isLandscape: React.PropTypes.bool,
    isPhone: React.PropTypes.bool,
    isPortrait: React.PropTypes.bool,
    isTablet: React.PropTypes.bool
  };

  static propTypes = {
    authenticated: React.PropTypes.bool.isRequired,
    initialised: React.PropTypes.bool.isRequired
  };

  state = {
    isLandscape: false
    // isLandscape: Display.isLandscape()
  }

  getChildContext () {
    return {
      isLandscape: this.state.isLandscape,
      isPhone: true,
      // isPhone: Display.isPhone(),
      isPortrait: !this.state.isLandscape,
      isTablet: false
      // isTablet: Display.isTablet()
    }
  }

  componentDidMount () {
    // Listen to orientation change events.
    
    // this.onOrientationChange = Display.onOrientationDidChange((w, h, o) => {
    //   this.setState({
    //     isLandscape: o.current === 'landscape'
    //   })
    // })
  }

  componentWillUnmount () {
    // Unlisten to onOrientationChange...
    this.onOrientationChange = null
  }

  renderContainer () {
    if (!this.props.initialised) {
      return (
        <BasicScene>
          <Container centered padded>
            <MyText.Paragraph>
              Loading account ...
            </MyText.Paragraph>
          </Container>
        </BasicScene>
      )
    }
    //to be commited out
    if (!this.props.authenticated) {
      return <LoginScene />
    }

    return <MainNavigation />
  }

  render () {
    return (
      <View style={styles.container}>
          {this.renderContainer()}
      </View>
    )
  }
  //   render () {
  //   return (
  //     <View style={styles.container}>
  //       <KeyboardHandler>
  //         {this.renderContainer()}
  //       </KeyboardHandler>
  //     </View>
  //   )
  // }
}

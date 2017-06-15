import _ from 'lodash'
import React from 'react'
import { autobind } from 'core-decorators'
import { StyleSheet, View } from 'react-native'

import Container from '../components/Container'
import ErrorBar from '../components/ErrorBar'
import Logger from '../lib/Logger'
import NavBar from '../components/NavBar'
import StatusBarHandler from '../components/StatusBarHandler'
import TabBar from '../containers/TabBar'
import ThemeConstants from '../constants/ThemeConstants'

const styles = StyleSheet.create({
  body: {
    backgroundColor: ThemeConstants.color.body.background
  }
})

@autobind
export default class Scene extends React.Component {

  static contextTypes = {
    keyboardVisible: React.PropTypes.bool,
    isPhone: React.PropTypes.bool
  }

  static propTypes = {
    children: React.PropTypes.node,
    errors: React.PropTypes.array,
    fullscreen: React.PropTypes.bool.isRequired,
    hideErrors: React.PropTypes.bool.isRequired,
    hideMenu: React.PropTypes.bool.isRequired,
    hideNavigation: React.PropTypes.bool.isRequired,
    navigator: React.PropTypes.object,
    route: React.PropTypes.object.isRequired,
    scrollable: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string
  }

  static defaultProps = {
    fullscreen: false,
    hideErrors: false,
    hideMenu: false,
    hideNavigation: false,
    route: { index: 0 },
    scrollable: false
  }

  getNavigator () {
    return this.props.navigator
  }

  getNavigatorRoute (id, payload) {
    return {
      id,
      index: (this.props.route.index + 1) || 0,
      payload
    }
  }

  getErrors () {
    return this.props.errors
  }

  getTitle () {
    return this.props.title
  }

  back () {
    this.navigateBack()
  }

  backDisabled () {
    return false
  }

  backVisible () {
    return (this.props.route.index !== 0)
  }

  hideNavigation () {
    if (this.props.fullscreen) {
      return true
    }
    return this.props.hideNavigation
  }

  hideErrors () {
    if (this.props.hideErrors) {
      return true
    }
    return _.isNull(this.getErrors())
  }

  hideMenu () {
    if (this.props.fullscreen) {
      return true
    } else if (this.props.hideMenu) {
      return true
    }

    return (
      // Hide when we aren't on one of the base screens.
      this.props.route.index !== 0 ||

      // Save screen space by not showing the button bar when the keyboard is visible.
      this.context.keyboardVisible
    )
  }

  navigate (id, payload) {
    Logger.debug('Scene:navigate()', id, payload)
    if (!_.isString(id)) {
      Logger.error('Scene:navigate(): invalid id', id, payload)
    }
    if (!(_.isNull(payload) || _.isUndefined(payload) || _.isObject(payload))) {
      Logger.error('Scene:navigate(): invalid payload', payload)
    }
    this.getNavigator().push(this.getNavigatorRoute(id, payload))
  }

  navigateBack () {
    if (this.props.route.index > 0) {
      this.getNavigator().pop()
    }
  }

  navigateHome () {
    this.getNavigator().popToTop()
  }

  navigateReplace (id, payload) {
    if (!(_.isNull(payload) || _.isUndefined(payload) || _.isObject(payload))) {
      Logger.error('Scene:navigateReplaceAtIndex(): invalid payload', payload)
    }
    this.getNavigator().replace(this.getNavigatorRoute(id, payload))
  }

  navigateResetTo (id, payload) {
    if (!(_.isNull(payload) || _.isUndefined(payload) || _.isObject(payload))) {
      Logger.error('Scene:navigateReplaceAtIndex(): invalid payload', payload)
    }
    this.getNavigator().resetTo(_.merge({}, this.getNavigatorRoute(id, payload), { index: 0 }))
  }

  navigateReplaceAtIndex (id, payload, index) {
    if (!(_.isNull(payload) || _.isUndefined(payload) || _.isObject(payload))) {
      Logger.error('Scene:navigateReplaceAtIndex(): invalid payload', payload)
    }
    this.getNavigator().replaceAtIndex(this.getNavigatorRoute(id, payload), index)
  }

  renderBody () {
    return (
      <View>
        {this.props.children}
      </View>
    )
  }

  renderErrors () {
    return (
      <ErrorBar
        errors={this.getErrors()}
      />
    )
  }

  renderMenu () {
    const { context } = this

    const navigator = this.getNavigator()
    const active = navigator ? navigator.getCurrentRoutes()[0].id : ''

    return (
      <TabBar
        active={active}
        location={context.isPhone && context.isLandscape ? 'left' : 'bottom'}
        navigate={this.navigateResetTo}
      />
    )
  }

  renderNav () {
    return (
      <NavBar
        back={this.back}
        backDisabled={this.backDisabled()}
        backHidden={!(this.backVisible())}
        title={this.getTitle()}
      />
    )
  }

  renderNavLeft () {
    return null
  }

  renderNavRight () {
    return null
  }

  render () {
    const { props, context } = this
    return (
      <Container
        style={{
          flexDirection: context.isPhone && context.isLandscape ? 'row' : 'column'
        }}
      >
          <Container
            bounces={false}
            bouncesZoom={false}
            scrollable={props.scrollable}
            style={styles.body}
          >
            {this.renderBody()}
          </Container>
          {this.hideErrors() ? null : this.renderErrors()}
      </Container>
    )
  }
}

import React from 'react'
import { autobind } from 'core-decorators'
import { Alert, LayoutAnimation, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import actions from '../actions'
import Bar from '../components/Bar'
import Button from '../components/Button'
import Icon from '../components/Icon'
import IconWithLabels from '../components/IconWithLabels'
import constants from '../constants'
import Logger from '../lib/Logger'
import selectors from '../selectors'

const styles = StyleSheet.create({
  bar: {
    justifyContent: 'space-around'
  },
  icon: {
    fontSize: 19
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13
  },
  textActive: {
    color: constants.theme.color.body.accent
  },
  textDisabled: {
    color: constants.theme.color.body.secondary
  }
})

const mapStateToProps = (state) => ({
  authenticated: selectors.user.authenticated(state)
})

export default @connect(mapStateToProps)
class TabBar extends React.Component {

  static propTypes = {
    ...Bar.propTypes,
    active: React.PropTypes.string,
    navigate: React.PropTypes.func.isRequired
  }

  propsButton = {
    styleActive: styles.textActive,
    styleDisabled: styles.textDisabled
  }

  propsIcon = {
    style: styles.text,
    styleIcon: styles.icon
  }

  @autobind
  onLogout () {
    Alert.alert(
      'Log out',
      'Are you sure you wish to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => Logger.log('Log out cancelled.'),
          style: 'cancel'
        },
        {
          text: 'Log out',
          onPress: () => this.props.dispatch(actions.user.logoutRequest())
        }
      ]
    )
  }

  @autobind
  onNavigateProfile () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.navigate(constants.nav.profile)
  }

  @autobind
  onNavigateSchedule () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.navigate(constants.nav.schedule)
  }

  render () {
    const props = this.props

    return (
      <Bar
        {...props}
        style={styles.bar}
      >
        <Button
          {...this.propsButton}
          active={props.active === constants.nav.profile}
          disabled={!props.authenticated}
          onPress={this.onNavigateProfile}
        >
          <IconWithLabels
            {...this.propsIcon}
            bottom='Profile'
            icon={<Icon.Ion name='ios-person-outline' />}
          />
        </Button>
        <Button
          {...this.propsButton}
          active={props.active === constants.nav.schedule}
          disabled={!props.authenticated}
          onPress={this.onNavigateSchedule}
        >
          <IconWithLabels
            {...this.propsIcon}
            bottom='Schedule'
            icon={<Icon.Ion name='ios-calendar-outline' />}
          />
        </Button>
        <Button
          {...this.propsButton}
          disabled={!props.authenticated}
          onPress={this.onLogout}
        >
          <IconWithLabels
            {...this.propsIcon}
            bottom='Logout'
            icon={<Icon.Ion name='ios-log-out-outline' />}
          />
        </Button>
      </Bar>
    )
  }
}

import moment from 'moment'
import upperCase from 'lodash/upperCase'
import React from 'react'
import { autobind } from 'core-decorators'
import { StyleSheet } from 'react-native'

import Icon from '../components/Icon'
import IconWithLabels from '../components/IconWithLabels'

const styles = StyleSheet.create({
  icon: {
    fontSize: 19
  },
  text: {
    color: '#A6A6A6',
    fontSize: 17
  },

  statusActive: {
    color: '#00C2EC'
  },
  statusFuture: {
    color: '#FA9C31'
  },
  statusPast: {
    color: '#00A560'
  },
  statusPending: {
    color: '#AEB1B6'
  }
})

export default class ShiftStatus extends React.Component {

  static propTypes = {
    clockin: React.PropTypes.string,
    clockout: React.PropTypes.string,
    end: React.PropTypes.string.isRequired,
    start: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired
  }

  state = {
    iteration: 0
  }

  componentDidMount () {
    this.timer = setInterval(this.tick, 60000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  @autobind
  tick () {
    console.debug(`ShiftState iteration #${this.state.iteration}`)
    this.setState({iteration: this.state.iteration + 1})
  }

  @autobind
  getIconName () {
    if (this.props.clockout) {
      return 'ios-checkmark-circle'
    } else if (this.props.clockin) {
      return 'ios-timer'
    } else if (moment() < moment(this.props.start)) {
      return 'ios-checkmark-circle'
    }
    return 'ios-checkmark-circle-outline'
  }

  @autobind
  getStyle () {
    if (this.props.clockout) {
      return styles.statusPast
    } else if (this.props.clockin) {
      return styles.statusActive
    } else if (moment() < moment(this.props.start)) {
      return styles.statusFuture
    }
    return styles.statusPending
  }

  render () {
    return (
      <IconWithLabels
        icon={<Icon.Ion name={this.getIconName()} />}
        left={upperCase(this.props.status)}
        style={[styles.text, this.getStyle()]}
        styleIcon={styles.icon}
      />
    )
  }
}

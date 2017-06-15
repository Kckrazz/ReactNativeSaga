import moment from 'moment'
import React from 'react'
import { autobind } from 'core-decorators'
import { StyleSheet } from 'react-native'

import constants from '../constants'
import ButtonBig from '../components/ButtonBig'

const styles = StyleSheet.create({
  button: {
    color: '#FFFFFF',
    fontSize: constants.theme.font.size.heading3,
    fontWeight: 'bold'
  },
  buttonClockin: {
    backgroundColor: constants.theme.color.button.green
  },
  buttonClockout: {
    backgroundColor: constants.theme.color.button.red
  },
  container: {
    marginVertical: 30
  }
})

export default class ShiftButton extends React.Component {

  static propTypes = {
    clockin: React.PropTypes.string,
    clockinBusy: React.PropTypes.bool.isRequired,
    clockinMax: React.PropTypes.string,
    clockinMin: React.PropTypes.string,
    clockout: React.PropTypes.string,
    clockoutBusy: React.PropTypes.bool.isRequired,
    clockoutMax: React.PropTypes.string,
    clockoutMin: React.PropTypes.string
  }

  static defaultProps = {
    clockinBusy: false,
    clockoutBusy: false
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
    console.debug(`ShiftButton iteration #${this.state.iteration}`)
    this.setState({iteration: this.state.iteration + 1})
  }

  render () {
    const props = this.props
    const timeNow = moment()

    if (props.clockout) {
      // No button if we are already clocked out.
      return null
    } else if (props.clockin) {
      const timeClockoutMin = moment(props.clockoutMin)
      const timeClockoutMax = moment(props.clockoutMax)
      return (
        <ButtonBig
          children='FINISH'
          disabled={props.clockoutBusy || timeNow < timeClockoutMin || timeNow > timeClockoutMax}
          onPress={props.onClockout}
          style={[styles.button, styles.buttonClockout]}
          styleContainer={styles.container}
        />
      )
    }

    const timeClockinMin = moment(props.clockinMin)
    const timeClockinMax = moment(props.clockinMax)
    return (
      <ButtonBig
        children='START'
        disabled={props.clockinBusy || timeNow < timeClockinMin || timeNow > timeClockinMax}
        onPress={props.onClockin}
        style={[styles.button, styles.buttonClockin]}
        styleContainer={styles.container}
      />
    )
  }
}

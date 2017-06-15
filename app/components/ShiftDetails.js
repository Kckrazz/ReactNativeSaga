import moment from 'moment'
import React from 'react'
import { View } from 'react-native'

import ShiftDetailsRow from '../components/ShiftDetailsRow'

const formatDay = 'dddd'
const formatDate = 'MMM D, YYYY'
const formatTime = 'hh:mm A'
const formatTimestamp = 'MMM D, YYYY @ hh:mm A'

const ShiftDetails = (props) => (
  <View>
    <ShiftDetailsRow
      label='Date'
      labelIcon='ios-calendar-outline'
      subtitle={moment(props.start).format(formatDate)}
      title={moment(props.start).format(formatDay).toUpperCase()}
    />
    <ShiftDetailsRow
      label='Time'
      labelIcon='ios-time-outline'
      title={
        moment(props.start).format(formatTime) +
        ' - ' +
        moment(props.end).format(formatTime)
      }
    />
    <ShiftDetailsRow
      label='Location'
      labelIcon='ios-navigate-outline'
      onPress={props.onSelectMap}
      subtitle='view in map'
      title={props.address}
    />
    {props.accepted_at
      ? <ShiftDetailsRow
        label='Accepted'
        labelIcon='ios-checkmark-circle-outline'
        title={moment(props.accepted_at).format(formatTimestamp)}
      />
      : null
    }
    {props.clockin
      ? <ShiftDetailsRow
        label='Clock in'
        labelIcon='ios-play-outline'
        title={moment(props.clockin).format(formatTimestamp)}
      />
      : null
    }
    {props.clockout
      ? <ShiftDetailsRow
        label='Clock out'
        labelIcon='ios-pause-outline'
        title={moment(props.clockout).format(formatTimestamp)}
      />
      : null
    }
    {props.cancelled_at
      ? <ShiftDetailsRow
        label='Cancelled'
        labelIcon='ios-close-circle-outline'
        subtitle={props.cancelled_reason}
        title={moment(props.cancelled_at).format(formatTimestamp)}
      />
      : null
    }
    {props.description
      ? <ShiftDetailsRow
        label='Description'
        labelIcon='ios-clipboard-outline'
        onPress={props.onSelectDescription}
      />
      : null
    }
  </View>
)

ShiftDetails.propTypes = {
  accepted_at: React.PropTypes.string,
  address: React.PropTypes.string.isRequired,
  cancelled_at: React.PropTypes.string,
  cancelled_reason: React.PropTypes.string,
  clockin: React.PropTypes.string,
  clockout: React.PropTypes.string,
  description: React.PropTypes.string,
  end: React.PropTypes.string.isRequired,
  onSelectDescription: React.PropTypes.func.isRequired,
  onSelectMap: React.PropTypes.func.isRequired,
  start: React.PropTypes.string.isRequired
}

export default ShiftDetails

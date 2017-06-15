import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import Icon from '../components/Icon'
import IconWithLabels from '../components/IconWithLabels'
import MyText from '../components/MyText'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F7FB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5
  },
  containerLeft: {
    alignItems: 'flex-start',
    width: 120
  },
  containerCentre: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  containerRight: {
    alignItems: 'flex-end',
    width: 120
  },
  textLeft: {
    color: '#6F6F6F',
    fontSize: 19
  },
  textMiddle: {
    color: '#6F6F6F',
    fontSize: 16
  },
  textRight: {
    color: '#6F6F6F',
    fontSize: 9
  },
  textRightIcon: {
    fontSize: 11
  }
})

const ShiftListHeader = (props) => (
  <View style={[styles.container, { height: props.height }]} >
    <View style={styles.containerLeft} >
      <Icon.Ion
        name='ios-calendar-outline'
        style={styles.textLeft}
      />
    </View>
    <View style={styles.containerCentre} >
      <MyText style={styles.textMiddle} >
        {moment(props.date).format('dddd').toUpperCase()}
      </MyText>
    </View>
    <View style={styles.containerRight} >
      <IconWithLabels
        top={moment(props.date).format('MMM')}
        icon={moment(props.date).format('D')}
        style={styles.textRight}
        styleIcon={styles.textRightIcon}
      />
    </View>
  </View>
)

ShiftListHeader.propTypes = {
  date: React.PropTypes.object.isRequired,
  height: React.PropTypes.number
}

export default ShiftListHeader

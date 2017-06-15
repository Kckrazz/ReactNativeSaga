import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'

import Icon from '../components/Icon'
import MyText from '../components/MyText'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    flexDirection: 'row'
  },
  containerLeftIcon: {
    alignItems: 'center',
    paddingLeft: 5,
    width: 35
  },
  containerLeft: {
    alignItems: 'flex-start',
    width: 100
  },
  containerRight: {
    alignItems: 'flex-start',
    flex: 1,
    paddingRight: 5
  },
  containerRightIcon: {
    alignItems: 'flex-end',
    paddingRight: 5
  },
  iconLeft: {
    fontSize: 15,
    color: '#A6A6A6'
  },
  iconRight: {
    color: '#6F6F6F',
    fontSize: 17
  },
  textLabel: {
    color: '#A6A6A6',
    fontSize: 15
  },
  textSubtitle: {
    color: '#BFC7D2',
    fontSize: 13,
    marginTop: 5
  },
  textTitle: {
    color: '#6F6F6F',
    fontSize: 15
  }
})

const ShiftDetailsRow = (props) => (
  <TouchableHighlight onPress={props.onPress}>
    <View style={styles.container}>
      <View style={styles.containerLeftIcon}>
        <Icon.Ion
          name={props.labelIcon}
          style={styles.iconLeft}
        />
      </View>
      <View style={styles.containerLeft}>
        <MyText style={styles.textLabel}>
          {props.label}
        </MyText>
      </View>
      <View style={styles.containerRight}>
        {props.title
          ? <MyText style={styles.textTitle}>
            {props.title}
          </MyText>
          : null
        }
        {props.subtitle
          ? <MyText style={styles.textSubtitle}>
            {props.subtitle}
          </MyText>
          : null
        }
      </View>
      {props.rightIcon
        ? <View style={styles.containerRight}>
          <Icon.Ion
            name={props.rightIcon}
            style={styles.iconRight}
          />
        </View>
        : null
      }
    </View>
  </TouchableHighlight>
)

ShiftDetailsRow.propTypes = {
  label: React.PropTypes.string.isRequired,
  labelIcon: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func,
  rightIcon: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  title: React.PropTypes.string
}

export default ShiftDetailsRow

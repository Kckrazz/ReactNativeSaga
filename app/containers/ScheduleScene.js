import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import { autobind } from 'core-decorators'
import { ListView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import actions from '../actions'
import constants from '../constants'
import selectors from '../selectors'
import DateBar from '../components/DateBar'
import MyText from '../components/MyText'
import Scene from '../containers/Scene'
import ShiftListDivider from '../components/ShiftListDivider'
import ShiftListHeader from '../components/ShiftListHeader'
import ShiftListItem from '../components/ShiftListItem'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1
  }
})

@autobind
class ScheduleScene extends Scene {

  static propTypes = {
    ...Scene.propTypes,
    shifts: React.PropTypes.object.isRequired,
    listHeaderHeight: React.PropTypes.number.isRequired,
    listItemHeight: React.PropTypes.number.isRequired
  };

  static defaultProps = {
    ...Scene.defaultProps,
    listHeaderHeight: 35,
    listItemHeight: 85
  };

  datasource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => (r1 !== r2),
    sectionHeaderHasChanged: (s1, s2) => (s1 !== s2)
  });

  scrollView = null;

  state = {
    datasource: this.initDatasource(this.props),
    date: this.initDate(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      datasource: this.initDatasource(nextProps),
      date: this.initDate(nextProps)
    })
  }

  getDataSource () {
    return this.state.datasource
  }

  getDate () {
    if (!this.props.loaded) {
      return moment().startOf('day').toDate()
    }

    return this.state.date
  }

  getDates () {
    const parseToDate = d => moment(d).toDate()
    return _(this.getShifts())
      .keys()
      .map(parseToDate)
      .value()
  }

  getDatesForSelector () {
    if (!this.props.loaded) {
      return []
    }

    const datesAll = this.getDates()
    const dateCurrent = this.getDate()
    const datesSelector = []

    const datesBefore = _(datesAll)
      .filter(v => v < dateCurrent)
      .sortBy()
      .value()
    const datesAfter = _(datesAll)
      .filter(v => v > dateCurrent)
      .sortBy()
      .value()

    // Take atleast 3 dates from before.
    datesSelector.push(..._.takeRight(
      datesBefore,
      6 - _.min([3, _.size(datesAfter)])
    ))

    // Add current date.
    datesSelector.push(dateCurrent)

    // Pad with required number of dates after.
    datesSelector.push(..._.take(
      datesAfter,
      7 - _.size(datesSelector)
    ))

    return datesSelector
  }

  getShifts () {
    return this.props.shifts
  }

  getTitle () {
    return moment(this.getDate()).format('MMMM YYYY').toUpperCase()
  }

  initDatasource (props) {
    if (props.loaded) {
      const keysSection = _.sortBy(_.keys(props.shifts))
      const mapSectionRows = _.mapValues(props.shifts, (v) => _.map(v, 'id'))
      const keysRow = []
      for (const key of keysSection) {
        keysRow.push(mapSectionRows[key])
      }
      return this.datasource.cloneWithRowsAndSections(
        props.shifts,
        keysSection,
        keysRow,
      )
    }
    return null
  }

  initDate (props) {
    if (props.loaded) {
      let date = moment().startOf('day').toDate()

      const parseToDate = d => moment(d).toDate()
      const datesAll = _(props.shifts)
        .keys()
        .map(parseToDate)
        .sortBy()
        .value()

      date = _.max([date, _.first(datesAll)])
      date = _.min([date, _.last(datesAll)])

      return date
    }
    return null
  }

  onChangeVisibleRows (visibleRows) {
    this.setDate(
      _(visibleRows)
        .keys()
        .sortBy()
        .first()
    )
  }

  onEndReached () {
    const lastDate = moment(
      _(this.getShifts())
        .keys()
        .sortBy()
        .last()
    )
    this.props.dispatch(
      actions.shift.loadShiftsRequest(
        lastDate.toDate(),
        lastDate.add(7, 'days').toDate(),
      )
    )
  }

  onSelectDate (date) {
    this.setDate(date)

    // Calculate pixel offset of section for given date.
    const dateKey = moment(date).format('YYYY-MM-DD')
    const shifts = this.getShifts()
    const rowCountBySection = _(shifts)
      .filter((v, k) => k < dateKey)
      .map(_.size)
      .value()
    const sectionOffset = _.size(rowCountBySection) * this.props.listHeaderHeight
    const itemOffset = _.sum(rowCountBySection) * this.props.listItemHeight

    // Animate and scroll to section - we add an additional 1 pixels to crudely
    // account for hairlineWidth dividers.
    this.scrollView.scrollTo({ y: (sectionOffset + itemOffset + 1), animated: false })
  }

  onSelectShift (id) {
    this.navigate(constants.nav.shift.home, {
      id
    })
  }

  setDate (date) {
    const dateNew = moment(date).startOf('day').toDate()
    if (dateNew === this.state.date) { return }
    this.setState({
      date: dateNew
    })
  }

  setScrollView (scrollView) {
    this.scrollView = scrollView
  }

  renderBody () {
    if (!this.props.loaded) {
      return (
        <MyText.Paragraph>
          Loading shifts ...
        </MyText.Paragraph>
      )
    }

    // // Uncomment to test a particular shift as sometimes ListView swallows
    // // rendering errors.
    // const sectionID = '2016-09-05'
    // const sectionData = null
    // const rowID = 1788
    // const rowData = this.props.shifts[sectionID][rowID]
    // return (
    //   <View style={styles.container}>
    //     <DateBar
    //       date={this.getDate()}
    //       dates={this.getDatesForSelector()}
    //       onSelect={this.onSelectDate}
    //     />
    //     {this.renderListSectionHeader(sectionData, sectionID)}
    //     {this.renderListRow(rowData, sectionID, rowID)}
    //     {this.renderListSeparator(sectionID, rowID)}
    //   </View>
    // )

    return (
      <View style={styles.container}>
        <DateBar
          date={this.getDate()}
          dates={this.getDatesForSelector()}
          onSelect={this.onSelectDate}
        />
        <ListView
          ref={this.setScrollView}
          dataSource={this.getDataSource()}
          onChangeVisibleRows={this.onChangeVisibleRows}
          onEndReached={this.onEndReached}
          renderRow={this.renderListRow}
          renderSectionHeader={this.renderListSectionHeader}
          renderSeparator={this.renderListSeparator}
          style={styles.list}
        />
      </View>
    )
  }

  renderListRow (rowData, sectionID, rowID) {
    return (
      <ShiftListItem
        id={rowID}
        key={rowID}
        height={this.props.listItemHeight}
        onPress={this.onSelectShift}
        {...rowData}
      />
    )
  }

  renderListSectionHeader (sectionData, sectionID) {
    return (
      <ShiftListHeader
        date={moment(sectionID).toDate()}
        height={this.props.listHeaderHeight}
        key={`section-${sectionID}`}
      />
    )
  }

  renderListSeparator (sectionID, rowID) {
    return (
      <ShiftListDivider
        key={`divider-${rowID}`}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  loaded: selectors.shift.loaded(state),
  shifts: selectors.shift.groupedByDateThenId(state)
})

export default connect(mapStateToProps)(ScheduleScene)

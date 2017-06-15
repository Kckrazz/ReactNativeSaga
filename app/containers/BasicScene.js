import React from 'react'

import Scene from '../containers/Scene'

export default class BasicScene extends Scene {

  static propTypes = {
    ...Scene.propTypes,
    errors: React.PropTypes.node
  }

  static defaultProps = Scene.defaultProps

  errors () { return this.props.errors }

  renderBody () { return this.props.children }
}

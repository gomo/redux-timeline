import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Frame from '../components/Frame'


class App extends Component {

  render() {
    return (
      <Frame
        timeSpan={this.props.timeSpan}
        events={this.props.events}
        lines={this.props.lines}
        lineWidth={this.props.lineWidth}
        minHeight={this.props.minHeight}
        minInterval={this.props.minInterval}
        rulerInterval={this.props.rulerInterval}
        windowHeight={this.props.windowHeight}
      />
    )
  }
}


function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

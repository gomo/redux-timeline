import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Frame from '../components/Frame'
import Actions from '../actions/'
import { bindActionCreators } from 'redux'

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
        lineDidClick={this.props.lineDidClick}
        eventDidClick={this.props.eventDidClick}
        actions={this.props.actions}
      />
    )
  }
}


function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

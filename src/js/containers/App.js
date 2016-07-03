import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Frame from '../components/Frame'


class App extends Component {
  render() {
    return (
      <Frame />
    )
  }
}


function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

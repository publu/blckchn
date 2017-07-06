// Frameworks
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'
import { uport } from '../utilities/uportSetup'
import kjua from 'kjua'

import styled from 'styled-components'

const ConnectWrap = styled.section``

class ConnectYourUport extends Component {

  componentDidMount () {
    uport.requestCredentials(
      {
        requested: ['name', 'phone', 'country'],
        notifications: true
      },
      (uri) => {

        // Create QR
        const qr = kjua({
          text: uri,
          fill: '#000000',
          size: 400,
          back: 'rgba(255,255,255,1)'
        })

        // Create wrapping link for mobile touch
        let aTag = document.createElement('a')
        aTag.href = uri

        // Nest QR in <a> and inject
        aTag.appendChild(qr)
        document.querySelector('#kqr').appendChild(aTag)
      }).then((credentials) => {
        this.props.actions.connectUport(credentials)
      })
  }

  render () {
    return (
      <ConnectWrap>
        <h4>Connect with uPort</h4>
        <h6>Scan QR code with uPort app</h6>
        <div id='kqr' />
      </ConnectWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectYourUport)

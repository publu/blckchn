// Frameworks
import React, { Component } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'

const RegisterYourAppWrap = styled.section``
const NextButton = styled.button`
  margin-top: 20px;
`
const Link = styled.a`
  display: block;
`

class RegisterYourApp extends Component {
  render () {
    return (
      <RegisterYourAppWrap>
        <h4>Title of page</h4>
        <br/>
        <Link className='external' target='_blank' href='http://www.caudicum.com'>
          Link
        </Link>
        <NextButton
          onClick={this.props.actions.registerAppAreaComplete}>
          Logout
        </NextButton>
      </RegisterYourAppWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return { }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterYourApp)

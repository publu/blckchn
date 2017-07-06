// Frameworks
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'

import SharesContract from '../utilities/SharesContract'
import waitForMined from '../utilities/waitForMined'
import checkAddressMNID from '../utilities/checkAddressMNID'
import getShares from '../utilities/getShares'

import styled from 'styled-components'

const SharesWrap = styled.section``
const SharesArea = styled.div``
const CurrentSharesArea = styled.div``
const CurrentSharesNumber = styled.span`
  color: #33C273;
  font-weight: bold;
`
const FormBuyshares = styled.form``
const FormRow = styled.div``
const BtnBuyShares = styled.button``
const NextButton = styled.button`
  margin-top: 20px;
`

class SignTransaction extends Component {

  constructor (props) {
    super(props)
    this.getCurrentShares = this.getCurrentShares.bind(this)
    this.buyShares = this.buyShares.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  getCurrentShares () {
    // TODO: Dump this check once MNID is default behavior
    const addr = checkAddressMNID(this.props.uport.address)
    const actions = this.props.actions
    getShares(addr, actions)
  }

  buyShares (e) {
    e.preventDefault()

    console.log('buyShares')

    let sharesNumber = 100
    const addr = checkAddressMNID(this.props.uport.address)
    const actions = this.props.actions

    console.log({sharesNumber, addr, actions})

    this.props.actions.buySharesREQUEST(sharesNumber)

    SharesContract.updateShares(sharesNumber, (error, txHash) => {
      console.log('updateShares')
      if (error) { this.props.actions.buySharesERROR(error) }
      waitForMined(addr, txHash, { blockNumber: null }, actions,
        () => {
          this.props.actions.buySharesPENDING()
        },
        (total) => {
          console.log('waitForMined complete')
          this.props.actions.buySharesSUCCESS(txHash, total)
        }
      )
    })
  }

  handleInputChange (event) {
    this.props.actions.updatesharesInput(event.target.value)
  }

  componentDidMount () {
    // Populate existing shares
    this.getCurrentShares()
  }

  render () {
    return (
      <SharesWrap>
        <h4>Click to checkin</h4>
        <SharesArea>
          {
            this.props.buyingInProgress
              ? (
                <div>
                  <br />
                  <div className='loading loading--double' />
                  <br />
                </div>
              )
              : (
                <FormBuyshares>
                  <FormRow>
                    <br />
                    <BtnBuyShares
                      onClick={this.buyShares}>
                      Checkin
                    </BtnBuyShares>
                  </FormRow>
                  <FormRow>
                    <br />
                    {
                      this.props.buyingInProgress
                        ? <div>Please wait for transaction card on phone</div>
                        : null
                    }
                  </FormRow>
                </FormBuyshares>
              )
          }
        </SharesArea>
        {
          this.props.confirmingInProgress
            ? <div>Please confirm the transaction card on your phone</div>
            : null
        }
        {
          this.props.buyingInProgress === false
            ? (
              <NextButton
                onClick={this.props.actions.buySharesDemoComplete}>
                Next
              </NextButton>
            )
            : null
        }
      </SharesWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport,
    sharesInput: state.App.sharesInput,
    gettingShares: state.App.gettingShares,
    confirmingInProgress: state.App.confirmingInProgress,
    sharesTotal: state.App.sharesTotal,
    buyingInProgress: state.App.buyingInProgress,
    tx: state.App.tx,
    error: state.App.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignTransaction)

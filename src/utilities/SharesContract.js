import { web3 } from './uportSetup'

function SharesContractSetup () {
  let SharesABI = web3.eth.contract([{"constant":false,"inputs":[{"name":"share","type":"uint256"}],"name":"updateShares","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}])
  let SharesContractObj = SharesABI.at('0x432472827c271b795402cd385df9f425d0bf1cfe')
  return SharesContractObj
}

const SharesContract = SharesContractSetup()

export default SharesContract

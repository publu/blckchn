import { Connect, SimpleSigner } from 'uport-connect'

const uport = new Connect('Blckchn Club', {
  clientId: '0xa3ddbef910bba89ac358d651c133eef685fe64b1',
  signer: SimpleSigner('af9bd046d42179304b9dfbd0cfbc2e548a21522f93dcb09825db0fdcd05a4cac')
})

const web3 = uport.getWeb3()
export { web3, uport }

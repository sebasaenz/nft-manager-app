export interface BvOption {
  value: string | number | null,
  text: string
}

export interface ContractEvent {
  returnValues: {
    [key: string]: any
  },
  raw: {
    [key: string]: any
  },
  event: string,
  signature: string,
  logIndex: number,
  transactionIndex: number,
  transactionHash: string,
  blockHash: string,
  blockNumber: number,
  address: string
}

export interface Transaction {
  blockHash: string,
  blockNumber: number,
  contractAddress: string | null,
  cumulativeGasUsed: number,
  events: {
    [key: string]: ContractEvent
  },
  from: string,
  gasUsed: number,
  logsBloom: number,
  status: boolean,
  to: string,
  transactionHash: string,
  transactionIndex: number
}
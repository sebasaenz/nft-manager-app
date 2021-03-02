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

export enum TokenConstants {
  DIGITAL_ART = 1,
  MUSIC = 2,
  CERTIFICATIONS = 3
}

export enum Tabs {
  CREATE_TOKENS_TAB = 1,
  MY_TOKENS_TAB = 2,
  ADDRESS_INFO_TAB = 3,
}


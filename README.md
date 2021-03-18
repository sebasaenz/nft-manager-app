# NFT Manager app
## Vue.js + Typescript Web app for creating and visualizing ERC1155 tokens
The web app is currently using an ERC1155 Open Zeppelin preset contract deployed on the Görli network.

In order to implement NFTs over the ERC1155 specification a prefix for each type of NFT was added so they can be differentiated.
Also, tokens are being directly pulled from the TransferSingle events stored on the contract, so there's no external database storing the tokens information.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

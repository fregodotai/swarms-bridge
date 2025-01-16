# FREGO Swarms Bridge

> Cross-chain agentic swarms data feed and interaction

FREGO Swarms Bridge is a language-agnostic, cross-chain data connector enabling seamless interaction with web3 swarm protocols. Designed to bridge web2 and web3 technologies, FREGO provides developers with a standardized interface to leverage the power of agentic swarm protocols like [fxn-protocol-sdk](https://github.com/Oz-Networks/fxn-protocol-sdk).

[![GitHub stars](https://img.shields.io/github/stars/fregodotai/swarms-bridge?style=flat-square)](https://github.com/fregodotai/swarms-bridge/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](https://github.com/fregodotai/swarms-bridge/blob/master/LICENSE.md)
[![GitHub issues](https://img.shields.io/github/issues/fregodotai/swarms-bridge?style=flat-square)](https://github.com/fregodotai/swarms-bridge/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/fregodotai/swarms-bridge?style=flat-square)](https://github.com/fregodotai/swarms-bridge/pulls)
[![Last commit](https://img.shields.io/github/last-commit/fregodotai/swarms-bridge?style=flat-square)](https://github.com/fregodotai/swarms-bridge/commits/master)
[![Contributors](https://img.shields.io/github/contributors/fregodotai/swarms-bridge?style=flat-square)](https://github.com/fregodotai/swarms-bridge/graphs/contributors)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Solana](https://img.shields.io/badge/Solana-14F195?style=flat-square&logo=solana&logoColor=white&color=black)

![Cover](./Cover.png)

## Features

- Cross-Chain Compatibility: Interact with multiple blockchains through standardized APIs
- Real-Time Data: Access live on-chain and off-chain swarm data
- Developer Friendly: Language-agnostic design with web2 friendly APIs
- Free to Use Public Deployment: [Hosted here](https://data.frego.ai)

## Supported Protocols:

### FXN

- [fxn-protocol-sdk](https://github.com/Oz-Networks/fxn-protocol-sdk)

## Roadmap

We aim to establish FREGO Swarms Bridge as the go-to interface for agentic swarm data interactions across chains. Our focus is on enhancing data transparency to maximize developer ability to use, measure, and draw insights from web3 agentic swarms.

### Near-term (1-2 months)

- [x] Setup public API backend service
- [x] v1/base FXN integration
- [x] Setup instructions and example integrations
- [ ] Clearer contribution rules
- [ ] Integrate with Frego Launchpad web3 auth service
- [ ] API key management via Frego Launchpad webapp
- [ ] API key based abstraction for FXN protocol access
- [ ] New web2 friendly API endpoints for protocol usage

### Later

- [ ] Install via npm
- [ ] Eliza connector
- [ ] Zerepy connector
- [ ] Swarms data agent interface
- [ ] v1/base TAO integration

### Long term

- [ ] Frontend dashboard webapp w/ auth
- [ ] Automated cross-framework risk assement

## API Documentation

Access the [Swagger API documentation](https://data.frego.ai/api-docs/) to explore available endpoints and test API requests.

## Code Examples

### Register Agent

Register an agent with the following API request:

```javascript
fetch('https://data.frego.ai/api/v1/auth/register-agent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ id: 1, name: 'test' }), // replace with your own data
})
  .then(res => res.json())
  .then(res => console.log(res)); // { "apiKey": "c3ba5ba...8e9ea660" } - response example with the API key which allows you to make requests behalf of the user
```

- Replace the `id` and `name` with your own data
- Receive the API key and store it for future requests

### POST request to the FXN protocol example

Send a POST request with your API key as a query parameter:

```javascript
const API_KEY = 'c3ba5ba...8e9ea660';
fetch(`https://data.frego.ai/api/v1/fxn/data-provider-fee?apiKey=${API_KEY}`, {
  // provide your API key as a query parameter
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ fee: 10 }), // replace with your own data
})
  .then(res => res.json())
  .then(res => console.log(res)); // { "transactionSignature": "5LrcE2f6....MmujAhXD" } - response example
```

- Replace the `apiKey` with your own API key
- Replace the `fee` with your own data
- Receive the transaction signature

### GET request to the FXN protocol example

Send a GET request with your API key as a query parameter:

```javascript
const requestParams = {
  apiKey: 'c3ba5ba...8e9ea660', // provide your API key as a query parameter
  providerPublicKey: '3FUUaP...e6LosWs', // provide your provider public key as a query parameter
};

const urlSearchParams = new URLSearchParams(requestParams).toString();

fetch(
  `https://data.frego.ai/api/v1/fxn/get-subscriptions-for-provider?${urlSearchParams}`,
)
  .then(res => res.json())
  .then(res => console.log(res)); // { "subscriptions": [...] } - response example
```

- Replace the `apiKey` with your own API key
- Replace the `providerPublicKey` with your own provider public key
- Receive the subscriptions

## Contributing

We welcome contributions from the community! To contribute:

- Fork the repository
- Create your feature branch (git checkout -b feature/YourFeature)
- Commit your changes (git commit -m 'Made a cool new feature')
- Push to the branch (git push origin feature/YourFeature)
- Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

- [Links page](https://links.frego.ai)

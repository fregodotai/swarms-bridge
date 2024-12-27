# FXN Controller Documentation

==========================

## Overview

---

Our API acts as a versatile bridge, enabling seamless integration of [fxn-protocol-sdk](https://github.com/Oz-Networks/fxn-protocol-sdk) JavaScript SDK with other programming languages, such as Python. It provides a language-agnostic interface, allowing developers to harness the capabilities of the JS SDK without being constrained by its native environment.

With this API, developers can:

- Leverage JS SDK Features: Access and utilize all SDK functionalities through a standardized API.
- Cross-Language Compatibility: Simplify integration in diverse environments like Python, Java, Ruby, or any language that supports HTTP.
- Effortless Integration: Minimize the complexity of incorporating advanced features into non-JavaScript projects.

## fxn-protocol-sdk Documentation

---

### Github

- [fxn-protocol-sdk](https://github.com/Oz-Networks/fxn-protocol-sdk)

### Web

- [Introduction](https://docs.fxn.world/)
- [Key Concepts](https://docs.fxn.world/key-concepts)
- [Brand Guidelines](https://docs.fxn.world/brand-guidelines)
- [Quick Start](https://docs.fxn.world/developers/quick-start)
- [FAQ](https://docs.fxn.world/faq)

## API Documentation

---

Access the [Swagger UI documentation](https://fxn-connector-prod-48a023245efe.herokuapp.com/api-docs/) to explore available endpoints and test API requests.

## Endpoints

---

### setDataProviderFee

- **Method:** `POST`
- **Path:** `/data-provider-fee`
- **Request Body:** DataProviderFeeRequestDto
- **Response:** TransactionSignatureResponse

Sets the data provider fee for a subscription.

#### Request Body Parameters:

- `dataProviderFee`: The new data provider fee.

#### Response Parameters:

- `transactionSignature`: The signature of the transaction.

### createSubscription

- **Method:** `POST`
- **Path:** `/create-subscription`
- **Request Body:** CreateSubscriptionRequestDto
- **Response:** TransactionSignatureResponse

Creates a new subscription.

#### Request Body Parameters:

- `dataProvider`: TThe data provider address.
- `recipient`: The recipient address.
- `durationInDays`: The duration of the subscription.
- `nftTokenAccount`: The NFT token account.

#### Response Parameters:

- `transactionSignature`: The signature of the transaction.

### getSubscriptionStatus

- **Method:** `GET`
- **Path:** `/get-subscription-status`
- **Query Parameters:** `endTime`: The end time of the subscription.
- **Response:** GetSubscriptionStatusResponse

Gets the status of a subscription.

#### Query Parameters:

- `endTime`: The end time of the subscription.

#### Response Parameters:

- `subscriptionStatus`: The status of the subscription.

### getProviderTokenAccount

- **Method:** `GET`
- **Path:** `/get-provider-token-account`
- **Query Parameters:** `providerAddress`: The address of the provider.
- **Response:** GetProviderTokenAccountResponse

Gets the token account of a provider.

#### Query Parameters:

- `providerAddress`: The address of the provider.

#### Response Parameters:

- `tokenAccount`: The token account of the provider.

### getSubscriptionsForProvider

- **Method:** `GET`
- **Path:** `/get-subscriptions-for-provider`
- **Query Parameters:** `providerPublicKey`: The public key of the provider.
- **Response:** GetSubscriberDetailsResponse

Gets the subscriptions for a provider.

#### Query Parameters:

- `providerPublicKey`: The public key of the provider.

#### Response Parameters:

- `subscriptions`: The subscriptions for the provider.

### getAllSubscriptionsForUser

- **Method:** `GET`
- **Path:** `/get-subscriptions-for-user`
- **Query Parameters:** `userPublicKey`: The public key of the user.
- **Response:** GetAllSubscriptionsResponse

Gets subscriptions for a user.

#### Query Parameters:

- `userPublicKey`: The public key of the user.

#### Response Parameters:

- `subscriptions`: The subscriptions for the user.

### renewSubscription

- **Method:** `POST`
- **Path:** `/renew-subscription`
- **Request Body:** RenewSubscriptionRequestDto
- **Response:** TransactionSignatureResponse

Renews a subscription.

#### Request Body Parameters:

- `dataProvider`: The data provider address.
- `newRecipient`: The new recipient address.
- `newEndTime`: The new end time.
- `qualityScore`: The quality score.
- `nftTokenAccount`: The NFT token account.

#### Response Parameters:

- `transactionSignature`: The signature of the transaction.

### cancelSubscription

- **Method:** `POST`
- **Path:** `/cancel-subscription`
- **Request Body:** CancelSubscriptionRequestDto
- **Response:** TransactionSignatureResponse

Cancels a subscription.

#### Request Body Parameters:

- `dataProvider`: The data provider address.
- `qualityScore`: The quality score.
- `nftTokenAccount`: The NFT token account.

#### Response Parameters:

- `transactionSignature`: The signature of the transaction.

### getSubscriptionState

- **Method:** `GET`
- **Path:** `/get-subscription-state`
- **Query Parameters:** `subscriptionPDA`: The program address of the subscription PDA.
- **Response:** GetSubscriptionStateResponse

Gets the state of a subscription.

#### Query Parameters:

- `subscriptionPDA`: The program address of the subscription PDA.

#### Response Parameters:

- `recipient`: The recipient of the subscription.
- `endTime`: The end time of the subscription.

### getQualityInfo

- **Method:** `GET`
- **Path:** `/get-quality-info`
- **Query Parameters:** `dataProvider`: The data provider address.
- **Response:** GetQualityInfoResponse

Gets the quality score of a data provider.

#### Query Parameters:

- `dataProvider`: The data provider address.

#### Response Parameters:

- `qualities`: The quality scores of the data provider.
- `currentIndex`: The index of the current quality score.
- `quality`: The current quality score.
- `subscriber`: The subscriber of the data provider.

### getProgramAddress

- **Method:** `GET`
- **Path:** `/get-program-address`
- **Query Parameters:** `dataProvider`: The data provider address.
- **Query Parameters:** `subscriber`: The subscriber address.
- **Response:** ProgramAddressResponse

Gets the program address of the FXN protocol.

#### Response Parameters:

- `statePDA`: The program address of the state PDA.
- `qualityPDA`: The program address of the quality PDA.
- `subscriptionPDA`: The program address of the subscription PDA.
- `subscribersListPDA`: The program address of the subscribers list PDA.
- `dataProviderFeePDA`: The program address of the data provider fee PDA.

# Arifpay Node.js Library

The Arifpay Node library provides convenient access to the Arifpay API from
applications written in server-side JavaScript.


## Documentation

See the [`Developer` API docs](https://developer.arifpay.net/).

## Requirements

Node 8, 10 or higher.

## Installation

Install the package with:

```sh
npm install arifpay-ts-sdk --save
# or
yarn add arifpay-ts-sdk

```

## Usage

The package needs to be configured with your account's API key, which is
available in the [Arifpay Dashboard](https://dashboard.arifpay.net/app/api). Require it with the key's
value:

<!-- prettier-ignore -->
```js
const arifpay = require('arifpay-ts-sdk')('API KEY...');

```

Or using ES modules and `async`/`await`:

```js
import Arifpay from 'arifpay-ts-sdk';
const arifpay = new Arifpay('API KEY...');

```

### Usage with TypeScript

Import Arifpay as a default import.

```ts
import Arifpay from 'arifpay-ts-sdk';
const arifpay = new Arifpay('API KEY...');

```

You can find a full server example in [arifpay-samples](https://github.com/arifpay-net).

## Creating Checkout Session

After importing the `arifpay` package, use the checkout property of the Arifpay instance to create or fetch `checkout sessions`.

```js 
    const arifpay = new Arifpay('API KEY...');
    const date = new Date();
    date.setMonth(10);
    const expired = getExpireDateFromDate(date);
    const data: ArifpayCheckoutRequest = {
      beneficiaries: [
        {
          accountNumber: 'account number',
          bank: 'bank id',
          amount: amount,
        },
      ],
      cancelUrl: 'https://gateway.arifpay.net/',
      errorUrl: 'https://gateway.arifpay.net/',
      notifyUrl: 'https://gateway.arifpay.net/',
      expireDate: expired,
      nonce: Math.floor(Math.random() * 10000).toString(),
      paymentMethods: [],
      successUrl: 'https://gateway.arifpay.net',
      items: [
        {
          name: 'Bannana',
          price: 10.0,
          quantity: 1,
          image: "image url",
          description: "description..."
        },
      ],
    };
    let session = await arifpay.checkout.create(data, true);
    console.log(session)
```
This is session response object contains the following fields

```js
{
  sessionId: string;
  paymentUrl: string;
  cancelUrl: string;
  totalAmount: number;
}
```

## Getting Session by Session ID

To track the progress of a checkout session you can use the fetch method as shown below:

```js
 const arifpay = new Arifpay('API KEY...');
// A sessionId will be returned when creating a session.
 const session = await arifpay.checkout.fetch('checkOutSessionID', true);
```

The following object represents a session

```js
{
  id: number;
  transaction: ArifpayTranscation;
  totalAmount: number;
  test: boolean;
  updatedAt: string;
  createdAt: string;
  uuid: string;
  cancelUrl: string;
  nonce: string;
  errorUrl: string;
  notifyUrl: string;
  successUrl: string;
  paymentMethods: string[];
  expireDate: string;
  items: ArifpayCheckoutItem[];
  beneficiaries: ArifpayBeneficary[];
}
```

## More Information

- [REST API Version](https://developer.arifpay.net/docs/checkout/overview)
- [Mobile SDK](https://developer.arifpay.net/docs/clientSDK/overview)


# Arifpay Node.js Library

The Arifpay Node library provides convenient access to the Arifpay API from
applications written in server-side JavaScript.


## Documentation

See the [`Developer` API docs](https://developer.arifpay.net/). For Laravel SDK [visit here](https://packagist.org/packages/arifpay/arifpay). 

## Requirements

Node 8, 10 or higher.

## Installation

Install the package with:

```sh
npm install arifpay --save
# or
yarn add arifpay

```

## Usage

The package needs to be configured with your account's API key, which is
available in the [Arifpay Dashboard](https://dashboard.arifpay.net/app/api). Require it with the key's
value:

<!-- prettier-ignore -->
```js
const arifpay = require('arifpay')('API KEY...');

```

Or using ES modules and `async`/`await`:

```js
import Arifpay from 'arifpay';
const arifpay = new Arifpay('API KEY...');

//for common js

const Arifpay =  require('arifpay').default;
const arifpay  = new Arifpay('API KEY...');

```

### Usage with TypeScript

Import Arifpay as a default import.

```ts
import Arifpay from 'arifpay';
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
          name: 'Banana',
          price: 10.0,
          quantity: 1,
          image: "image url",
          description: "description..."
        },
      ],
    };
```
After putting your building  `ArifpayCheckoutRequest` just call the `create` method. Note passing `sandbox: true` option will create the session in test environment.

```js

    let session = await arifpay.checkout.create(data, { sandbox: true});
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
 const session = await arifpay.checkout.fetch('checkOutSessionID', { sandbox: true});
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

## Cancel Session by Session ID

If the merchant want to cancel a checkout session. it's now possible as shown below.

```php
 $arifpay = new Arifpay('API KEY...');
// A sessionId will be returned when creating a session.
 $session = $arifpay->checkout->cancel('checkOutSessionID', new ArifpayOptions(true));
```

The `ArifpayCheckoutSession` class is returned.

- [`Laravel`](/docs/laravel/checkoutsession#Cancel-Session-by-Session-ID) SDK
- [`NodeJS`](/docs/nodejs/checkoutsession#Cancel-Session-by-Session-ID) SDK


## DirectPay

learn more about [DirectPay here](https://developer.arifpay.net/docs/direcPay/overview)
### DirectPay for telebirr
```js 
     session = arifpay.checkout.create($data, new ArifpayOptions(true));

    return arifpay.directPay.telebirr.pay(session.sessionId);
```
<!--
```js 
     session = arifpay.checkout.create($data, new ArifpayOptions(true));

    return arifpay.directPay.awashWallet.transfer(session.sessionId, phoneNumber);

    //Verify OTP
    arifpay.directPay.awashWallet.verify(session.sessionId, otp)

```

### DirectPay for awash
```js 
    session = arifpay.checkout.create($data, new ArifpayOptions(true));

    return arifpay.directPay.awash.transfer(session.sessionId, phoneNumber, debitAccount);

    //Verify OTP
    arifpay.directPay.awash.verify(session.sessionId, otp)
```
-->
# Change Log

Released Date: `v1.0.1` June 03, 2022

- Initial Release

Released Date: `v1.0.2` June 03, 2022

- added  `ArifpayOptions` to `checkout.create` and `checkout.fetch`

Released Date: `v2.0.0` Aug 15, 2022

- `DirectPay` added for Telebirr and Awash payment options

## More Information

- [REST API Version](https://developer.arifpay.net/docs/checkout/overview)
- [Mobile SDK](https://developer.arifpay.net/docs/clientSDK/overview)
- [Node JS](https://developer.arifpay.net/docs/nodejs/overview)
- [Laravel](https://developer.arifpay.net/docs/laravel/overview)
- [Change Log](https://developer.arifpay.net/docs/nodejs/changelog)

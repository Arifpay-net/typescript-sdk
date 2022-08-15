import Arifpay from '../arifpay';
import Checkout, { ArifpayCheckoutRequest, ArifpayCheckoutResponse } from '../checkout';
import ArifpayBadRequestException from '../exceptions/APIBadRequestException';
import ArifpayUnAuthorizedException from '../exceptions/APIUnauthorized';
import { getExpireDateFromDate } from '../helper';

describe('Arifpay Checkout', () => {
  test('checkout Is istance of  Checkout', () => {
    const arifpay = new Arifpay('myAPI');
    expect(arifpay.checkout).toBeInstanceOf(Checkout);
  });
  test('Creates Checkout Session', async () => {
    const arifpay = new Arifpay('jZeS3zV7aebkMfuPYjgeXTpWUW4J7sMd');
    const d = new Date();
    d.setMonth(10);
    const expired = getExpireDateFromDate(d);
    const data: ArifpayCheckoutRequest = {
      beneficiaries: [
        {
          accountNumber: '01320811436100',
          bank: 'AWINETAA',
          amount: 10.0,
        },
      ],
      cancelUrl: 'https://api.arifpay.com',
      errorUrl: 'https://api.arifpay.com',
      notifyUrl: 'https://gateway.arifpay.net/test/callback',
      expireDate: expired,
      nonce: Math.floor(Math.random() * 10000).toString(),
      paymentMethods: [],
      successUrl: 'https://gateway.arifpay.net',
      items: [
        {
          name: 'Bannana',
          price: 10.0,
          quantity: 1,
        },
      ],
    };
    let session = await arifpay.checkout.create(data, { sandbox: true });
    expect(session).toHaveProperty('sessionId');
  });
  test('Check API key is Invalid', async () => {
    try {
      const arifpay = new Arifpay('myAPI');
      await arifpay.checkout.fetch('fake', { sandbox: true });
    } catch (err) {
      expect(err).toBeInstanceOf(ArifpayUnAuthorizedException);
    }
  });
  test('Check getting Session', async () => {
    const arifpay = new Arifpay('jZeS3zV7aebkMfuPYjgeXTpWUW4J7sMd');
    const session = await arifpay.checkout.fetch('11bb7352-b228-4c75-9f0d-8a035aeac08b', { sandbox: true });
    expect(session).toHaveProperty('uuid', '11bb7352-b228-4c75-9f0d-8a035aeac08b');
  });

  test("Check Production doesn't work with Test key", async () => {
    try {
      const arifpay = new Arifpay('jZeS3zV7aebkMfuPYjgeXTpWUW4J7sMd');
      await arifpay.checkout.fetch('11bb7352-b228-4c75-9f0d-8a035aeac08b', { sandbox: false });
    } catch (err) {
      expect(err).toBeInstanceOf(ArifpayBadRequestException);
    }
  });
  test('Check Vaildation Error Detail is Added', async () => {
    try {
      const arifpay = new Arifpay('jZeS3zV7aebkMfuPYjgeXTpWUW4J7sMd');
      const d = new Date();
      d.setMonth(10);
      const expired = getExpireDateFromDate(d);
      const data: ArifpayCheckoutRequest = {
        beneficiaries: [
          {
            accountNumber: '01320811436100',
            bank: 'AWINETAA',
            amount: 10.0,
          },
        ],
        cancelUrl: 'https://api.arifpay.com',
        errorUrl: 'https//error.com',
        notifyUrl: 'https://gateway.arifpay.net/test/callback',
        expireDate: expired,
        nonce: Math.floor(Math.random() * 10000).toString(),
        paymentMethods: ["AWASH"],
        successUrl: 'https://gateway.arifpay.net',
        items: [
          {
            name: 'Bannana',
            price: 10.0,
            quantity: 1,
          },
        ],
      };
      let session = await arifpay.checkout.create(data, { sandbox: true });
    } catch (err) {
      if (err instanceof ArifpayBadRequestException) console.log(err.error);
      expect(err).toBeInstanceOf(ArifpayBadRequestException);
      expect(err).toHaveProperty('msg');
      expect(err).toHaveProperty('error');
    }
  });
});

import Arifpay from '../arifpay';
import Checkout, { ArifpayCheckoutRequest, ArifpayCheckoutResponse } from '../checkout';
import ArifpayBadRequestException from '../exceptions/APIBadRequestException';
import ArifpayUnAuthorizedException from '../exceptions/APIUnauthorized';
import { getExpireDateFromDate } from '../helper';

describe('Arifpay DirectPay', () => {
  test('Direct Pay  Telebirr is working', async () => {
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
      await arifpay.directPay.telebirr.pay(session.sessionId);
    } catch (err) {
      expect(err).toBeInstanceOf(ArifpayBadRequestException);
      err = err as ArifpayBadRequestException;
      // expect(err.msg).toContain("Not Configured");
    }
  });
  test('Direct Pay Awash Wallet is working', async () => {
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
    let transferResponse = await arifpay.directPay.awashWallet.transfer(session.sessionId, '251961186323');
    expect(transferResponse).toHaveProperty('otp');
    let verifyResponse = await arifpay.directPay.awashWallet.verify(session.sessionId, transferResponse.otp);
    expect(verifyResponse).toHaveProperty('sessionId');
  });
});

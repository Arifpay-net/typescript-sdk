import axios, { AxiosInstance } from 'axios';
import Checkout from './checkout';

class ArifPay {
  DEFAULT_HOST: string = 'https://gateway.arifpay.net';
  API_VERSION: string = '/v0';
  PACKAGE_VERSION: string = '1.0.0';
  DEFAULT_TIMEOUT: number =  1000 * 60 * 2;

  _httpClient: AxiosInstance;
  checkout: Checkout;
  apiKey: string;
  constructor(apikey: string) {
    this.apiKey = apikey;

    this._httpClient = axios.create({
      baseURL: `${this.DEFAULT_HOST}${this.API_VERSION}`,
      timeout: this.DEFAULT_TIMEOUT,
      headers: {
        'x-arifpay-key': apikey,
      },
    });
    this.checkout = new Checkout(this._httpClient);
  }
}

export default ArifPay;

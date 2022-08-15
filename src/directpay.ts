import { AxiosInstance } from 'axios';
import Awash from './directPay/awash';
import AwashWallet from './directPay/awashwallet';
import Telebirr from './directPay/telebirr';

class DirectPay {
  _httpClient: AxiosInstance;
  telebirr: Telebirr;
  awash: Awash;
  awashWallet: AwashWallet;
  constructor(_httpClient: AxiosInstance) {
    this._httpClient = _httpClient;
    this.telebirr = new Telebirr(this._httpClient);
    this.awash = new Awash(this._httpClient);
    this.awashWallet = new AwashWallet(this._httpClient);
  }
}

export default DirectPay;

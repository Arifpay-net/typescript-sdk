import { AxiosInstance } from 'axios';
import { __handleException } from '../helper';
import ArifpayAPIResponse from '../interface/arifpayapiresponse';
import ArifpayTransferResponse from '../interface/arifpaytransferresponse';

class Telebirr {
  _httpClient: AxiosInstance;
  constructor(_httpClient: AxiosInstance) {
    this._httpClient = _httpClient;
  }

  async pay(
    checkoutSessionID: string
  ): Promise<ArifpayTransferResponse> {
    try {
      const response = await this._httpClient.post(`/checkout/telebirr/direct/transfer`, {sessionId: checkoutSessionID});
      const arifAPIResponse = response.data as ArifpayAPIResponse<ArifpayTransferResponse>;
      return arifAPIResponse.data;
    } catch (error) {
      __handleException(error);
      throw error;
    }
  } 
}

export default Telebirr;

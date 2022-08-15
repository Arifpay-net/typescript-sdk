import { AxiosInstance } from 'axios';
import { __handleException } from '../helper';
import ArifpayAPIResponse from '../interface/arifpayapiresponse';
import ArifpayTransferResponse from '../interface/arifpaytransferresponse';

class Awash {
  _httpClient: AxiosInstance;
  constructor(_httpClient: AxiosInstance) {
    this._httpClient = _httpClient;
  }

  
  async transfer(
    checkoutSessionID: string,
    phoneNumber: string,
    debitAccount: string
  ): Promise<ArifpayTransferResponse> {
    try {
      const response = await this._httpClient.post(`/checkout/awash/wallet/direct/transfer`, {sessionId: checkoutSessionID, phoneNumber: phoneNumber, debitAccount: debitAccount});
      const arifAPIResponse = response.data as ArifpayAPIResponse<ArifpayTransferResponse>;
      return arifAPIResponse.data;
    } catch (error) {
      __handleException(error);
      throw error;
    }
  } 
  async verify(
    checkoutSessionID: string,
    otp: string,
    fail: boolean = false
  ): Promise<ArifpayTransferResponse> {
    try {
      const response = await this._httpClient.post(`/checkout/awash/wallet/direct/verifyOTP`, {sessionId: checkoutSessionID, otp: otp, paymentRunMode: fail ? "FAIL" : "SUCCESS",});
      const arifAPIResponse = response.data as ArifpayAPIResponse<ArifpayTransferResponse>;
      return arifAPIResponse.data;
    } catch (error) {
      __handleException(error);
      throw error;
    }
  } 
}

export default Awash;

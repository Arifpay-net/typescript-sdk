import axios, { AxiosInstance } from 'axios';
import ArifpayBadRequestException from './exceptions/APIBadRequestException';
import ArifpayUnAuthorizedException from './exceptions/APIUnauthorized';
import ArifpayException from './exceptions/arifpayexception';
import ArifpayNetworkException from './exceptions/arifpaynetworkexception';
import ArifpayAPIResponse from './interface/arifpayapiresponse';

class Checkout {
  _httpClient: AxiosInstance;
  constructor(_httpClient: AxiosInstance) {
    this._httpClient = _httpClient;
  }

  async create(
    arifpayCheckoutRequest: ArifpayCheckoutRequest,
    option: ArifpayOptions = { sandbox: false },
  ): Promise<ArifpayCheckoutResponse> {
    try {
      const basePath: string = option.sandbox ? '/sandbox/' : '/';
      const response = await this._httpClient.post(`${basePath}checkout/session`, arifpayCheckoutRequest);
      const arifAPIResponse = response.data as ArifpayAPIResponse<ArifpayCheckoutResponse>;
      return arifAPIResponse.data;
    } catch (error) {
      this.__handleException(error);
      throw error;
    }
  }

  async fetch(sessionID: string, option: ArifpayOptions = { sandbox: false }): Promise<ArifpayCheckoutSession> {
    try {
      const basePath: string = option.sandbox ? '/sandbox/' : '/';
      const response = await this._httpClient.get(`${basePath}checkout/session/${sessionID}`);

      const arifAPIResponse = response.data as ArifpayAPIResponse<ArifpayCheckoutSession>;
      return arifAPIResponse.data;
    } catch (error) {
      this.__handleException(error);
      throw error;
    }
  }

  __handleException(error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response?.status === 401)
          throw new ArifpayUnAuthorizedException('Invalid authentication credentials');
        if (error.response?.status === 400)
          throw new ArifpayBadRequestException((error.response?.data as ArifpayAPIResponse<any>).msg as string);
        throw new ArifpayException((error.response?.data as ArifpayAPIResponse<any>).msg as string);
      } else throw new ArifpayNetworkException(error.message);
    }
  }
}

export interface ArifpayCheckoutSession extends ArifpayCheckoutRequest {
  id: number;
  transaction: ArifpayTranscation;
  totalAmount: number;
  test: boolean;
  updatedAt: string;
  createdAt: string;
  uuid: string;
}

export interface ArifpayTranscation {
  id: number;
  transactionId: string;
  transactionStatus: string; // TODO: change to enum
  paymentType: string; // TODO change to enum
  updatedAt: string;
  createdAt: string;
}

export interface ArifpayCheckoutResponse {
  sessionId: string;
  paymentUrl: string;
  cancelUrl: string;
  totalAmount: number;
}
export interface ArifpayCheckoutRequest {
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

export interface ArifpayCheckoutItem {
  name: string;
  quantity: number;
  price: number;
  description?: string;
  image?: string;
}
export interface ArifpayOptions {
  sandbox: boolean;
}

export interface ArifpayBeneficary {
  id?: number;
  accountNumber: string;
  bank: any; // change to enum?
  amount: number;
}

export default Checkout;

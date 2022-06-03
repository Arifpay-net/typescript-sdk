import axios, { AxiosInstance } from 'axios';
import ArifpayUnAuthorizedException from './exceptions/APIUnauthorized';
import ArifpayException from './exceptions/arifpayexception';
import ArifpayAPIResponse from './interface/arifpayapiresponse';

class Checkout {
  _httpClient: AxiosInstance;
  constructor(_httpClient: AxiosInstance) {
    this._httpClient = _httpClient;
  }

  async create(
    arifpayCheckoutRequest: ArifpayCheckoutRequest,
    option: ArifpayCheckoutOption = { sandbox: false },
  ): Promise<ArifpayCheckoutResponse> {
    try {
      const basePath: string = option.sandbox ? '/sandbox/' : '/';
      const response = await this._httpClient.post(`${basePath}checkout/session`, arifpayCheckoutRequest);
      const arifAPIResponse = response.data as ArifpayAPIResponse<ArifpayCheckoutResponse>;
      return arifAPIResponse.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response?.status === 401)
          throw new ArifpayUnAuthorizedException('Invalid authentication credentials');
        throw new ArifpayException((error.response?.data as ArifpayAPIResponse<any>).msg as string);
      }
      throw error;
    }
  }

  async fetch(sessionID: string, option: ArifpayCheckoutOption = { sandbox: false }): Promise<ArifpayCheckoutSession> {
    try {
      const basePath: string = option.sandbox ? '/sandbox/' : '/';
      const response = await this._httpClient.get(`${basePath}checkout/session/${sessionID}`);

      const arifAPIResponse = response.data as ArifpayAPIResponse<ArifpayCheckoutSession>;
      return arifAPIResponse.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response?.status === 401)
          throw new ArifpayUnAuthorizedException('Invalid authentication credentials');
        throw new ArifpayException((error.response?.data as ArifpayAPIResponse<any>).msg as string);
      }
      throw error;
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
export interface ArifpayCheckoutOption {
  sandbox: boolean;
}

export interface ArifpayBeneficary {
  id?: number;
  accountNumber: string;
  bank: any; // change to enum?
  amount: number;
}

export default Checkout;

import axios from 'axios';
import ArifpayBadRequestException from './exceptions/APIBadRequestException';
import ArifpayUnAuthorizedException from './exceptions/APIUnauthorized';
import ArifpayException from './exceptions/arifpayexception';
import ArifpayNetworkException from './exceptions/arifpaynetworkexception';
import ArifpayAPIResponse from './interface/arifpayapiresponse';

export function getExpireDateFromDate(date: Date) {
  return date.toISOString();
}
export function __handleException(error: any) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response?.status === 401) throw new ArifpayUnAuthorizedException('Invalid authentication credentials');
      if (error.response?.status === 400) {
        const arifAPIResponse = error.response?.data as ArifpayAPIResponse<any>;
        throw new ArifpayBadRequestException(arifAPIResponse.msg as string, arifAPIResponse.data);
      }
      throw new ArifpayException((error.response?.data as ArifpayAPIResponse<any>).msg as string);
    } else throw new ArifpayNetworkException(error.message);
  }
}

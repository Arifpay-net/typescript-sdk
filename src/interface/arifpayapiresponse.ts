interface ArifpayAPIResponse<T> {
  data: T;
  error: boolean;
  msg: string;
}

export default ArifpayAPIResponse;

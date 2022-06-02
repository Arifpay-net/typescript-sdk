import ArifpayException from './arifpayexception';

class ArifpayUnAuthorizedException extends ArifpayException {
  msg: string;
  constructor(msg: string) {
    super(msg);
    this.msg = msg;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ArifpayUnAuthorizedException.prototype);
  }
}

export default ArifpayUnAuthorizedException;

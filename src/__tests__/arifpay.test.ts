import Arifpay from '../arifpay';

describe('Arifpay::class', () => {
  test('Creates Instance', () => {
    expect(new Arifpay('myAPI')).toBeInstanceOf(Arifpay);
  });
  test('Check API key is Set', () => {
    const arifpay = new Arifpay('myAPI');
    expect(arifpay.apiKey).toBe('myAPI');
  });
  test('Check API key is Set', () => {
    const arifpay = new Arifpay('myAPI');
    expect(arifpay.apiKey).toBe('myAPI');
  });
});

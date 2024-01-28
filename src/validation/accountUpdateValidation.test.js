import { InvalidAccountData } from '../exceptions/invalidAccountData';
import accountUpdateValidation from './accountUpdateValidation';
describe('udateValdiation tests', () => {
  describe('types check', () => {
    it.each([{}, [], Symbol, BigInt, Boolean, null])(
      'checking type: %p',
      (input) => {
        expect(() => {
          accountUpdateValidation.validateUpdate(input);
        }).toThrow(InvalidAccountData);
      },
    );
  });
  describe('pass an object with only some properties', () => {
    it('Only sex property', () => {
      const accountObject = { sex: 'other' };
      expect(
        accountUpdateValidation.validateUpdate(accountObject),
      ).toStrictEqual(undefined);
    });
  });
});

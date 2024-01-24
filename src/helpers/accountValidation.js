import { InvalidAccountData } from '../exceptions/invalidAccountData';

const validate = (account) => {
  if (
    (typeof account.firstname &&
      typeof account.lastname &&
      typeof account.avatar !== 'string') ||
    account.sex !== 'male' ||
    'famale' ||
    'other'
  ) {
    throw new InvalidAccountData('Wrong account data type');
  }
  return true;
};

export default { validate };

import { InvalidAccountData } from '../exceptions/invalidAccountData';

const validateCreate = (account) => {
  if (
    typeof account.firstname !== 'string' ||
    typeof account.lastname !== 'string' ||
    typeof account.avatar !== 'string' ||
    account.sex !== 'male' ||
    account.sex !== 'famale' ||
    account.sex !== 'other'
  ) {
    throw new InvalidAccountData('Wrong account data type');
  }
};

export default { validateCreate };

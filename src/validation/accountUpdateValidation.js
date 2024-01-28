import { InvalidAccountData } from '../exceptions/invalidAccountData';

const validateUpdate = (account) => {
  if (account === null) {
    throw new InvalidAccountData('Wrong data type');
  }
  if (account && !isAnyPropertyInAccount(account)) {
    throw new InvalidAccountData('Wrong data type property');
  }
  if (
    account.firstname &&
    (typeof account.firstname !== 'string' || account.firstname.length < 1)
  ) {
    throw new InvalidAccountData('Wrong firstname');
  }
  if (
    account.lastname &&
    (typeof account.lastname !== 'string' || account.lastname.length < 1)
  ) {
    throw new InvalidAccountData('Wrong lastname');
  }
  if (
    account.avatar &&
    (typeof account.avatar !== 'string' || account.avatar.length < 1)
  ) {
    throw new InvalidAccountData('Wrong avatar');
  }
  if (account.sex && !isSexValid(account.sex)) {
    throw new InvalidAccountData('Wrong sex');
  }
};

const isSexValid = (sex) => {
  return sex === 'male' || sex === 'famale' || sex === 'other';
};

const isAnyPropertyInAccount = (account) => {
  return account.firstname || account.lastname || account.avatar || account.sex;
};

export default { validateUpdate };

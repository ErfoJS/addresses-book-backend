import { WrongUuidFormat } from '../exceptions/wrongUuidFormat';
import accountsRepo from '../repositories/accounts';
import addressRepo from '../repositories/adresses';
import { database } from '../repositories/db';
import usersRepo from '../repositories/users'; // user service
import accountUpdateValidation from '../validation/accountUpdateValidation';
import accountValidation from '../validation/accountValidation';
// eslint-disable-next-line import/no-cycle
import addressService from './addresses';
import usersService from './users';

// eslint-disable-next-line operator-linebreak
const uuidRegex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const getAll = () => accountsRepo.getAll();

const getById = (id) => {
  if (!uuidRegex.test(id)) {
    throw new WrongUuidFormat('Invalid account ID format (uuid expected)');
  }
  return accountsRepo.getById(id);
};

// const validateAccountUser = (accountUser) => {};

const create = async (accountUser) => {
  const trx = await database.transaction();
  try {
    const accountId = await accountsRepo.createAccount(accountUser, trx);
    const userId = await usersRepo.createUser(
      { ...accountUser, accountId },
      trx,
    );
    await accountsRepo.assignUserToAccount(accountId, userId, trx);
    await trx.commit();
    return accountId;
  } catch (error) {
    await trx.rollback();
    throw new Error(error.message); // exeptions
  }
};

const updateAccount = async (accountId, updatingAccount) => {
  const trx = await database.transaction();
  try {
    accountUpdateValidation.validateUpdate(updatingAccount);
    await getById(accountId);
    await accountsRepo.updateAccount(accountId, updatingAccount, trx);
    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw new Error(error.message);
  }
};

const del = async (accountId) => {
  const trx = await database.transaction();
  try {
    await getById(accountId);
    await addressService.deleteAllAddressesFromAccountId(accountId, trx);
    await usersService.deleteUserByAccId(accountId, trx);
    await accountsRepo.deleteAccount(accountId, trx);
    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw new Error(error.message);
  }
};
// eslint-disable-next-line object-curly-newline
export default { getAll, getById, create, del, updateAccount };

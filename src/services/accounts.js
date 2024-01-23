import { WrongUuidFormat } from '../exceptions/wrongUuidFormat';
import accountsRepo from '../repositories/accounts';
import { database } from '../repositories/db';
import usersRepo from '../repositories/users'; // user service
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
    throw new Error('Cannot create Account'); // exeptions
  }
};

const del = async (accountId) => {
  const trx = await database.transaction();
  try {
    console.log('account deletes');
    await getById(accountId);
    console.log('account deletes: get by id');
    await usersService.deleteUserByAccId(accountId, trx);
    await accountsRepo.deleteAccount(accountId, trx);
    console.log('account deletes: get by id');
    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw new Error('Cannot delete account');
  }
};
// eslint-disable-next-line object-curly-newline
export default { getAll, getById, create, del };

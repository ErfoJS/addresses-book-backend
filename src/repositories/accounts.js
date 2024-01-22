import { randomUUID } from 'crypto';
import { AccountNotFound } from '../exceptions/accountNotFound';
import { database } from './db';

export const ACCOUNTS_TABLE_NAME = 'accounts';

const getAll = () => database.select('*').from(ACCOUNTS_TABLE_NAME);

const getById = async (id) => {
  const account = await database
    .select('*')
    .where({ id })
    .from(ACCOUNTS_TABLE_NAME)
    .first();
  if (!account) {
    throw new AccountNotFound(`Account with ID ${id} does not exist`);
  }
  return account;
};

const createAccount = async (account, trx) => {
  const id = randomUUID();
  await database
    .transacting(trx)
    .insert({
      id,
      firstname: account.firstname,
      lastname: account.lastname,
      dateOfBirth: account.dateOfBirth,
      sex: account.sex,
      avatar: account.avatar,
    })
    .into(ACCOUNTS_TABLE_NAME);
  return id;
};

const assignUserToAccount = async (accountId, userId, trx) => {
  await database(ACCOUNTS_TABLE_NAME)
    .transacting(trx)
    .update({ userId })
    .where({ id: accountId });
};

export default { getAll, getById, createAccount, assignUserToAccount };

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

export default { getAll, getById };

import { randomUUID } from 'crypto';
import { database } from './db';
import { UserNotFound } from '../exceptions/userNotFound';

export const USERS_TABLE_NAME = 'users';

const getUserByAccId = async (accountId) => {
  const user = await database(USERS_TABLE_NAME).where({ accountId }).first();
  if (!user) {
    throw new UserNotFound(`Account ID ${accountId} does not have users`); // impossible error
  }
  return user;
};

const createUser = async (user, trx) => {
  const id = randomUUID();
  await database
    .transacting(trx)
    .insert({
      id,
      accountId: user.accountId,
      username: user.username,
      password: user.password,
    })
    .into('users');
  return id;
};

const deleteUserByAccId = async (accountId, trx) => {
  try {
    console.log('deletesssss');
    await database(USERS_TABLE_NAME)
      .transacting(trx)
      .where({ accountId })
      .del();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default { createUser, deleteUserByAccId, getUserByAccId };

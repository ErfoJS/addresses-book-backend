import { randomUUID } from 'crypto';
import { database } from './db';

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
export default { createUser };

import userValidation from '../helpers/userValidation';
import usersRepo from '../repositories/users';

const getUserByAccId = async (accountId) => {
  const user = await usersRepo.getUserByAccId(accountId);
  return userValidation.validate(user);
};

const deleteUserByAccId = async (accountId, trx) => {
  await getUserByAccId(accountId);
  return usersRepo.deleteUserByAccId(accountId, trx);
};

export default { getUserByAccId, deleteUserByAccId };

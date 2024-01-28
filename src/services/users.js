import userValidation from '../validation/userValidation';
import usersRepo from '../repositories/users';

const getUserByAccId = async (accountId) => {
  const user = await usersRepo.getUserByAccId(accountId);
  return userValidation.validate(user);
};

const deleteUserByAccId = async (accountId, trx) => {
  await getUserByAccId(accountId);
  return usersRepo.deleteUserByAccId(accountId, trx);
};

const changePassword = async (accountId, password) => {
  await getUserByAccId(accountId);
  return usersRepo.changePassword(accountId, password);
};

export default { getUserByAccId, deleteUserByAccId, changePassword };

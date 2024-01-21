import { WrongUuidFormat } from '../exceptions/wrongUuidFormat';
import addressesRepo from '../repositories/adresses';
import accountService from './accounts';

const uuidRegex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const getAll = async (accountId) => {
  await accountService.getById(accountId);
  return addressesRepo.getAll(accountId);
};
const getById = async (accountId, addressId) => {
  if (!uuidRegex.test(addressId)) {
    throw new WrongUuidFormat('Invalid format (uuid expected)');
  }
  await accountService.getById(accountId);
  return addressesRepo.getById(accountId, addressId);
};
export default { getAll, getById };

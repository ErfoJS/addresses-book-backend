/* eslint-disable operator-linebreak */
import { InvalidAddressData } from '../exceptions/invalidAddressData';
import { WrongUuidFormat } from '../exceptions/wrongUuidFormat';
import addressesRepo from '../repositories/adresses';
import accountService from './accounts';

// eslint-disable-next-line operator-linebreak
const uuidRegex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const getAll = async (accountId) => {
  await accountService.getById(accountId);
  return addressesRepo.getAll(accountId);
};
const getById = async (accountId, addressId) => {
  if (!uuidRegex.test(addressId)) {
    throw new WrongUuidFormat('Invalid address ID format (uuid expected)');
  }
  await accountService.getById(accountId);
  return addressesRepo.getById(accountId, addressId);
};

const createAddress = async (accountId, address) => {
  await accountService.getById(accountId);
  if (
    typeof address.street !== 'string' ||
    typeof address.houseNumber !== 'number' ||
    typeof address.apartmentNumber !== 'number' ||
    typeof address.city !== 'string' ||
    typeof address.postalCode !== 'string'
  ) {
    throw new InvalidAddressData('Invalid address data');
  }
  return addressesRepo.createAddress(accountId, address);
};

const deleteAddress = async (accountId, addressId) => {
  await getById(accountId, addressId);
  return addressesRepo.deleteAddress(accountId, addressId);
};

const deleteAllAddressesFromAccountId = async (accountId, trx) => {
  return addressesRepo.deleteAllAddressesFromAccountId(accountId, trx);
};
// eslint-disable-next-line object-curly-newline
export default {
  getAll,
  getById,
  createAddress,
  deleteAddress,
  deleteAllAddressesFromAccountId,
};

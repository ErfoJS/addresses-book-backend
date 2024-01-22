import { randomUUID } from 'crypto';
import { AddressNotFound } from '../exceptions/addressNotFound';
import { database } from './db';

export const ADDRESSES_TABLE_NAME = 'addresses';

const getAll = (accountId) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  database.select('*').from(ADDRESSES_TABLE_NAME).where({ accountId });

const getById = async (accountId, addressId) => {
  const address = await database
    .select('*')
    .from(ADDRESSES_TABLE_NAME)
    .where({ accountId, id: addressId })
    .first();
  if (!address) {
    throw new AddressNotFound(`Address with ID ${addressId} does not exist`);
  }
  return address;
};

const createAddress = async (accountId, address) => {
  await database
    .insert({
      id: randomUUID(),
      accountId,
      street: address.street,
      houseNumber: address.houseNumber,
      apartmentNumber: address.apartmentNumber,
      city: address.city,
      postalCode: address.postalCode,
    })
    .into(ADDRESSES_TABLE_NAME);
};

const deleteAddress = async (accountId, addressId) => {
  await database(ADDRESSES_TABLE_NAME)
    .where({ id: addressId, accountId })
    .del();
};

// eslint-disable-next-line object-curly-newline
export default { getAll, getById, createAddress, deleteAddress };

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

export default { getAll, getById };

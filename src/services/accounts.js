import { WrongUuidFormat } from '../exceptions/wrongUuidFormat';
import accountsRepo from '../repositories/accounts';

const uuidRegex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
const getAll = () => accountsRepo.getAll();
const getById = (id) => {
  if (!uuidRegex.test(id)) {
    throw new WrongUuidFormat('Invalid format (uuid expected)');
  }
  return accountsRepo.getById(id);
};
export default { getAll, getById };

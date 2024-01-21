import { Router } from 'express';
import addressService from '../services/addresses';
import { WrongUuidFormat } from '../exceptions/wrongUuidFormat';
import { AccountNotFound } from '../exceptions/accountNotFound';
import { AddressNotFound } from '../exceptions/addressNotFound';
const adressesRoutes = Router({ mergeParams: true });

adressesRoutes.get('', async (req, res) => {
  try {
    const addresses = await addressService.getAll(req.params.accountId);
    return res.status(200).json(addresses);
  } catch (error) {
    if (error instanceof WrongUuidFormat) {
      return res.status(400).json(error.message);
    }
    if (error instanceof AccountNotFound) {
      return res.status(404).json(error.message);
    }
    return res.sendStatus(500);
  }
});

adressesRoutes.get('/:addressId', async (req, res) => {
  try {
    const address = await addressService.getById(
      req.params.accountId,
      req.params.addressId
    );
    return res.status(200).json(address);
  } catch (error) {
    if (error instanceof WrongUuidFormat) {
      return res.status(400).json(error.message);
    }
    if (error instanceof AccountNotFound) {
      return res.status(404).json(error.message);
    }
    if (error instanceof AddressNotFound) {
      return res.status(404).json(error.message);
    }
    return res.sendStatus(500);
  }
});

export default adressesRoutes;

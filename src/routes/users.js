import { Router } from 'express';
import usersService from '../services/users';
import { WrongUuidFormat } from '../exceptions/wrongUuidFormat';
import { AccountNotFound } from '../exceptions/accountNotFound';
import { AddressNotFound } from '../exceptions/addressNotFound';
import { InvalidAddressData } from '../exceptions/invalidAddressData';
import { InvalidUserData } from '../exceptions/invalidUserData';

const usersRoutes = Router();

usersRoutes.patch('/:accountId', async (req, res) => {
  const password = req.body.value;
  try {
    await usersService.changePassword(req.params.accountId, password);
    return res.status(200).send('Password changed');
  } catch (error) {
    if (error instanceof WrongUuidFormat) {
      return res.status(400).send(error.message);
    }
    if (error instanceof AccountNotFound) {
      return res.status(404).send(error.message);
    }
    if (error instanceof AddressNotFound) {
      return res.status(404).json(error.message);
    }
    if (error instanceof InvalidAddressData) {
      return res.status(400).json(error.message);
    }
    if (error instanceof InvalidUserData) {
      return res.status(400).json(error.message);
    }
    return res.status(500).send(error.message);
  }
});

export default usersRoutes;

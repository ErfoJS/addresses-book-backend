import { Router } from 'express';

import accountService from '../services/accounts';
import userService from '../services/users';
import { WrongUuidFormat } from '../exceptions/wrongUuidFormat';
import { AccountNotFound } from '../exceptions/accountNotFound';
import { AddressNotFound } from '../exceptions/addressNotFound';
import { InvalidAddressData } from '../exceptions/invalidAddressData';
import { InvalidUserData } from '../exceptions/invalidUserData';
import { InvalidAccountData } from '../exceptions/invalidAccountData';

const accountsRoutes = Router();

accountsRoutes.get('', async (req, res) => {
  const accounts = await accountService.getAll();
  if (accounts.length === 0) {
    return res.status('404').json({ message: 'Account not found' });
  }
  return res.json(accounts);
});

accountsRoutes.get('/:id', async (req, res) => {
  try {
    const account = await accountService.getById(req.params.id);
    return res.status(200).json(account);
  } catch (error) {
    if (error instanceof WrongUuidFormat) {
      return res.status(400).send(error.message);
    }
    if (error instanceof AccountNotFound) {
      return res.status(404).send(error.message);
    }
    return res.status(500).send(error.message);
  }
});

accountsRoutes.post('', async (req, res) => {
  try {
    const accountUser = req.body;
    const id = await accountService.create(accountUser); // valdiacja w serwisie do zrobienia
    return res.status(201).json({ id });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

accountsRoutes.patch('/:id', async (req, res) => {
  try {
    const updatingAccount = req.body;
    await accountService.updateAccount(req.params.id, updatingAccount);
    return res.status(200).send('account updated');
  } catch (error) {
    if (error instanceof WrongUuidFormat) {
      return res.status(400).send(error.message);
    }
    if (error instanceof AccountNotFound) {
      return res.status(404).send(error.message);
    }
    if (error instanceof InvalidAccountData) {
      return res.status(400).json(error.message);
    }
    return res.status(500).send(error.message);
  }
});

accountsRoutes.delete('/:accountId', async (req, res) => {
  try {
    await accountService.del(req.params.accountId);
    return res.status(200).send('deleted');
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

// exports.accountsRoutes = accountsRoutes;
export default accountsRoutes;

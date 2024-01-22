import { Router } from 'express';

import accountService from '../services/accounts';
import { WrongUuidFormat } from '../exceptions/wrongUuidFormat';
import { AccountNotFound } from '../exceptions/accountNotFound';

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
    return res.status(500).send(error);
  }
});

accountsRoutes.post('', async (req, res) => {
  try {
    const accountUser = req.body;
    const id = await accountService.create(accountUser); // valdiacja w serwisie do zrobienia
    return res.status(201).json({ id });
  } catch (error) {
    return res.status(500).send(error);
  }
});
// exports.accountsRoutes = accountsRoutes;
export default accountsRoutes;

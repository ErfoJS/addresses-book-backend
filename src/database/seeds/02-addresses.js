import { randomUUID } from 'crypto';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('addresses').del();

  const { id: accountId } = await knex('accounts')
    .where({
      firstname: 'Karol',
      lastname: 'Chasz',
    })
    .select('id')
    .first();

  await knex('addresses').insert([
    {
      id: randomUUID(),
      accountId,
      street: 'Żmigrodzka',
      houseNumber: 2,
      apartmentNumber: 1,
      city: 'Warszawa',
      postalCode: '22-400',
    },
  ]);
};

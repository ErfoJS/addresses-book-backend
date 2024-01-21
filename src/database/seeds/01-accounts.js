import { randomUUID } from 'crypto';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('accounts').del();
  await knex('accounts').insert([
    {
      id: randomUUID(),
      firstname: 'Karol',
      lastname: 'Chasz',
      dateOfBirth: new Date(),
      sex: 'other',
      avatar: 'kokokoko',
    },
    // {
    //   id: randomUUID(),
    //   firstname: 'Wiktor',
    //   lastname: 'Basz',
    //   dateOfBirth: new Date(),
    //   sex: 'other',
    //   avatar: 'zzzzzzzz',
    // },
  ]);
};

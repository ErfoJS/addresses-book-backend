import ADDRESSES_TABLE_NAME from '../../repositories/adresses';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('addresses', (table) => {
    table.dropForeign('accountId');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('addresses', (table) => {
    table.foreign('accountId').references('id').inTable('accounts');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('accounts', (table) => {
    table.dropForeign('userId');
    table.dropColumn('userId');
  });

  await knex.schema.alterTable('users', (table) => {
    table.dropForeign('acountId');
    table.uuid('accountId').alter().unique();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('accounts', (table) => {
    table.uuid('userId');
    table.foreign('userId').references('id').inTable('users');
  });
  await knex.schema.alterTable('users', (table) => {
    table.dropUnique;
  });
}

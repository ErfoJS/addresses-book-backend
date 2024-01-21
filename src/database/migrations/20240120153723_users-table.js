/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTableIfNotExists('users', (table) => {
    table.uuid('id').primary();
    table.uuid('accountId').unsigned();
    table.foreign('accountId').references('id').inTable('accounts');
    table.string('username');
    table.string('password');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}

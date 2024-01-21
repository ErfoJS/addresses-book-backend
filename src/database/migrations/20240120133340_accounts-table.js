/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTableIfNotExists('accounts', (table) => {
    table.uuid('id').primary();
    table.string('firstname');
    table.string('lastname');
    table.date('dateOfBirth');
    table.enum('sex', ['male', 'famale', 'other']);
    table.string('avatar');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('accounts');
}

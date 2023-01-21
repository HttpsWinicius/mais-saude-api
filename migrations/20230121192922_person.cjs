/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.hasTable('tbl_person').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('tbl_person', function (table) {
                table.increments('id').primary();
                table.string('name', 255).notNullable();
                table.string('cpf', 11).notNullable().primary();
                table.date('birth_date').notNullable();
                table.string('email', 255).notNullable().primary();
                table.string('phone', 10).notNullable();
                table.string('cep', 9);
                table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
            });
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};

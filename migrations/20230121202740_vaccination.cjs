/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.hasTable('tbl_vaccination').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('tbl_vaccination', function (table) {
                table.increments('id').primary();
                table.integer('id_person').notNullable();
                table.integer('id_vaccine').notNullable();
                table.date('date');
                table.date('schedule_date');
                table.string('batch', 11);
                table.string('maker');
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

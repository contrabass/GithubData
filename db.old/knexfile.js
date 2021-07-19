// Update with your config settings.

module.exports = {

/*   development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  }, */

  development: {
    client: 'pg',
    connection: {
      database: 'github_dashboard',
      user:     'postgres',
      password: '6V5fposvaCiRT2'
    },-*-*
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }/* ,

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  } */

};

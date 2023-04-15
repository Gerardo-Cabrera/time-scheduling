module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'username',
  password: 'password',
  database: 'dbname',
  entities: ['src/entities/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
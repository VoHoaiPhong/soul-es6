const host = 'localhost';
const username = 'supreme';
const password = 'J>sxt*[N3D-jv9)Z';
const database = 'noquere';

// database management system
const dialect = 'mysql';

const pool = {
  acquire: 30000,
  idle: 10000,
  max: 5,
  min: 0
};

const authdb = {
  host, username, password
};

const replication = {
  read: authdb,
  write: authdb
};

/**
 * Read node_modules\@types\sequelize\index.d.ts
 * @line 5924
 * node_modules\sequelize\types\lib\sequelize.d.ts
 */
export const DB_CONFIG = {
  dialect,
  pool,
  username,
  password,
  port: 3306,
  database,
  replication
};
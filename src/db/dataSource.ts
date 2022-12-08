import { DataSource } from 'typeorm';
import path from 'path';

import config from '../config';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.postgres.hostDb,
  port: +config.postgres.portDb,
  username: config.postgres.user,
  password: config.postgres.password,
  database: config.postgres.database,
  logging: config.postgres.logging,
  synchronize: false,
  subscribers: [],
  migrationsTableName: 'typeorm_migrations',
  entities: [path.normalize(`${__dirname}/entities/**/*.{ts,js}`)],
  migrations: [path.normalize(`${__dirname}/migrations/*.{ts,js}`)],
});

export default dataSource;

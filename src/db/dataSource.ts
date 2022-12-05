import { DataSource } from 'typeorm';
import path from 'path';

import config from '../config';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.postgresDbProperty.host,
  port: +config.postgresDbProperty.port,
  username: config.postgresDbProperty.user,
  password: config.postgresDbProperty.password,
  database: config.postgresDbProperty.database,
  logging: !!config.postgresDbProperty.logging,
  synchronize: false,
  subscribers: [],
  migrationsTableName: 'typeorm_migrations',
  entities: [path.normalize(`${__dirname}/entities/**/*.{ts,js}`)],
  migrations: [path.normalize(`${__dirname}/migrations/*.{ts,js}`)],
});

export default dataSource;

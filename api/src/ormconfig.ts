import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: `.env.${process.env.STAGE}`,
});

const config: ConnectionOptions = {
  type: 'postgres',

  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  logging: ['error', "info", 'schema'],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  synchronize: true,

  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;

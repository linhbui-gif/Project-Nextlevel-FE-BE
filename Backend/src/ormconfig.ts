import { ConnectionOptions } from 'typeorm';
import * as entities from './entities';

const config: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: parseInt('3306', 10),
    username: 'root',
    password: '',
    database: process.env.DB_NAME || process.env.DB_USER,
    entities: Object.values(entities),
    logging: true,
    synchronize: false,
    dropSchema: process.env.NODE_ENV === 'test',
    migrations: ['dist/migrations/**/*.js'],
    migrationsRun: true,
    cli: {
        migrationsDir: './src/migrations',
    },
};

export = config;

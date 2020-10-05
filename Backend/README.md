# Next Level Backend
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Configuration .env
Confiruge the .env file before running the app

```
DB_HOST=
DB_PORT=
DB_PASSWORD=
DB_USER=
DB_NAME=
JWT_SECRET=
PUBLIC_URL=
PUBLIC_API_URL=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_FROM_NAME=
EMAIL_FROM=
EMAIL_PASSWORD=
```

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Migrations
The server must not be running when migrations are created/generated. The server will automatically check for migrations on startup.

### List
Show a list of current migrations.
```
yarn migration:show
```

### Create
Create a new migration file.
```
yarn migration:create -n "name"
```
### Generate
Generates a new migration file with sql needs to be executed to update schema.
```
yarn migration:generate -n "name"
```
### Revert
This command will execute 'down' in the latest executed migration. If you need to revert multiple migrations you must call this command multiple times.
```
yarn migration:revert
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

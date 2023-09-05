# NestJS_Microservice_Practice

write it later.

## Features

- write it later.

## Start

### Intallation

1. NestJs Cli install:
   ```sh
   npm i -g @nestjs/cli
   ```
2. Project SetUp

   ```sh
   nest new .
   npm run start

   ```

3. Configure Common Lib
   ```sh
   nest generate library common
   ```

### Configure the database module

1. Install MongoDB:

   ```sh
   npm i @nestjs/mongoose mongoose
   npm i @nestjs/config

   ```

1. Create Database Module:
   nest generate module -p common
   nest generate module database -p common
   nest generate module config -p common

- https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
- common/database 모듈 생성

### Create Reservation Mono Repo

1. Create Mono Repo:

   ```sh
   nest g app reservations

   ```

- change the nest-cli.json to reflect Reservation Repo

2. Create Reservation Resource

   ```sh
   nest g resource reservations

   ```

   - create reservation repository, controller, service, schema

3. Apply Validation

   ```sh
   npm i class-transformer class-validator
   npm i nestjs-pino pino-http
   npm i pino-pretty
   nest g module logger
   ```

   - create common logger module in logger.module.ts
   - apply validation(pipe) and loggerModule to main.ts
   - apply class-validation to createDTO

4. Dockerize

   - create reservation dockerFile
   - create docker-compose.yaml

   ```sh
   docker build ../../ -f Dockerfile -t microservice_reservations
   docker-compose up
   ```

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

### Create Reservation Repo

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

### Create Auth Repo

1. Create Mono Repo:

   ```sh
   nest g app auth
   nest g module users
   nest g controller users
   nest g service users
   ```

2. Setup Passport Strategy

   ```sh
   npm i @nestjs/passport passport passport-local
   npm i -D @types/passport-local
   npm i @nestjs/jwt passport-jwt
   npm i -D @types/passport-jwt
   ```

   - configure environment variable in auth module

3. Create Passport Strategy

   ```sh
   npm i bcryptjs express
   npm i -D @types/bcryptjs
   ```

   - create local strategy
   - create auth guard
   - create custom decoration in current-user
   - apply strategy to auth module

4. Create JWT Strategy

   ```sh
   npm i cookie-parser
   npm i -D @types/cookie-parser
   ```

   - create jwt strategy
   - create jwt guard
   - apply cookieParser to main.ts

5. Create Common Auth Guard And apply microservice authenticate

   ```sh
   npm i @nestjs/microservices
   ```

   - apply microservice connection to auth module
   - create authenticate request in auth controller
   - connect reservation module with auth Service
   - create common jwt auth guard
   - apply jwtAuthGuard to reservation controller
   - move current-user decorator, user model to common lib

### Create Payment Repo

1. Create Payment Repo:

   ```sh
   nest g app payments
   npm i stripe
   ```

   - make createCharge Controller, Service
   - configure stripe settings

2. Inject Payment Service to Reservation Service:

   - apply Payment service to reservation module
   - configure stripe settings
   - modify Reservation create service

### Create Notification Repo

1. Create Notification Repo:

   ```sh
   nest g app notifications
   ```

   - setup notification configuration
   - apply eventPattern to notify_email in controller

2. Configuer Nodemailer Settings

   ```sh
   npm i nodemailer
   npm i -D @types/nodemailer
   ```

   - apply nodemailer configuration in module
   - apply nodemailer service  to notification service

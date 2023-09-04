1. Project Setup

- npm i -g @nestjs/cli
- nest new .
- npm run start
- nest generate library common

2. Database & Config Module

- npm i @nestjs/mongoose mongoose
- npm i @nestjs/config
- nest generate module -p common
- nest generate module database -p common
- nest generate module config -p common
- https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/

- common/database 모듈 생성

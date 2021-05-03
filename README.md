# WiSaw.serverless


## Example scripts invocation:

Last argument is "stage" (requred), either test or prod:
```
yarn run deploy test
yarn run deploy prod

yarn run info test
yarn run info prod
```

The automated tests are always executing on test stage and never on prod, if tests pass on "test" -- it will work on "prod" for sure:
```
yarn run test
```

To run migrations:
```
yarn run migrate test
yarn run migrate prod
```

To undo one migration:
```
yarn run migrate-undo test
yarn run migrate-undo prod
```

## Configuration files
There are 3 independent areas which require DB configuration:
* Runtime services
* Migrations
* Tests (TBD later)

Unfortunately each one of these does it slightly differently. The bruit force approach would be to duplicate the DB config for every area. We actually figured out how to keep the DB config in one file and propagate it where needed.

Take a look at ```.env.sample.yml```. This file is the example which is versioned controlled. You need to clone this file into ```.env.prod.js``` and ```.env.test.js``` -- these files are gitignored -- we do not want to expose life DB connection config to the world, so it's important not to loose them.

The ```serverless.yml``` file will read the stage specific file in the provider section, depending on which "stage" you are deploying to:
```
provider:
  environment:
    DATABASE_URL: ${file(.env.${opt:stage}.js):config.DATABASE_URL}
    HOST: ${file(.env.${opt:stage}.js):config.HOST}
```
As the result, the environment variables ```DATABASE_URL``` and ```HOST``` will be made available for every service running as AWS Lambda Function on that stage. In order for a function to establish a sequelize connection, import the ```./config/consts.js``` like this:
```
import {sequelize} from '../../../../consts'
```
Here's how the ```./consts.js``` referring the environment variable.
```
export var sequelize = new Sequelize(process.env.DATABASE_URL)
```
And, in order to run sequelize migrations, we are expected to create ```./config/config.js``` file. Take a look at it's contents. At the very beginning of the file read the stage specific .env file depending on which stage we run the migration for, like this:
```
const config = require('../.env.'+ env).config();

```
As the result, we can reference these config parameters like the following (in the same file down below):
```
module.exports = {
  test: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    host: config.DB_HOST,
    dialect: config.DB_DIALECT
  },
  prod: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    host: config.DB_HOST,
    dialect: config.DB_DIALECT
  }
};
```

# WiSaw
## What I Saw today
No registration, no sign in -- just open the app, start taking photos, and see what's posted by other people nearby today.

This is the most minimalistic social sharing possible, yet, it's probably the most relevant one as well. 

It's relevant in time and space. You only see what may potentially matter to you. You do not choose what you see. As such, you do not have to spend time and effort making connections, describing your profile etc. You just start using it. 

The feed will always stay relevant for your location and time. 

If you see something you do not like -- just delete it, which will have an effect of drastically increasing the quality of the content for everyone, reducing the noise.

This works best for events, large and small. Wedding or celebration party, at a beach or a park, student at a campus, or a conference attendee, or a group of fans at a football game -- these all will benefit from WiSaw and will definitely make it a lot more fun.

To see your and others photos visit https://www.wisaw.com

# Simple CRUD module for MongoDB

[![CircleCI](https://circleci.com/gh/almrooth/mongo-crud-simple.svg?style=svg)](https://circleci.com/gh/almrooth/mongo-crud-simple)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/almrooth/mongo-crud-simple/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/almrooth/mongo-crud-simple/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/almrooth/mongo-crud-simple/badges/build.png?b=master)](https://scrutinizer-ci.com/g/almrooth/mongo-crud-simple/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/almrooth/mongo-crud-simple/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/almrooth/mongo-crud-simple/?branch=master)

Module for handling simple CRUD functionality agains a MongoDB database.

Functions asynchronously making use of the new async/await functionality of Node v7.10 and above.

## Dependencies

* Installation of MongoDB
* MongoDB Node.JS Driver v2.2.33

## Installation

Using npm:

```
$ npm install --save mongo-crud-simple
```

In Node.js:

```
const dataset_name = require('mongo-crud-simple')(dsn, collection);

// Example connecting to localhost and collection users
const dsn = 'mongodb://127.0.0.1:27017/my_collection';
const collection = 'users';
const Users = require('mongo-crud-simple')(dsn, collection);
```

## CRUD usage

### Get all items

```
let data = Users.index();
// Returns array of objects
```

### Get single item

```
let data = Users.read(id);
// Returns object
```

### Create new item

```
let user = {
    name: 'John Doe',
    email: 'john.doe@test.com
};

Users.create(user);
```

### Update item

```
let updated_user = {
    name: 'Mike Smith',
    email: 'mike.smith@test.com'
};

Users.index(id, updated_user);
```

### Delete item

```
Users.delete(id);
```

### Reset and delete whole collection

```
Users.reset();
```

## Tests

Testing is done through Jest and ESLint and the module is developed using CI with CircleCI and Scrutinizer.

Available tests:

* Linting and codestyle using ESLint
* Unittests and code coverage using Jest

To run tests:

```
// ESLint
$ npm run eslint

// All tests including ESLint, Jest, Code Coverage
$ npm run test
```

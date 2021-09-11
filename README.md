# EID Queue Processor

This projet aims to handle patients stored in the lab sync queue.
It takes the patients from the queue one at a time and sends an api request to another service
that fetches their lab results
Its only task is to pick patients from the queue, and sync them at predefined intervals specified in the configuratio file

## Project set up
1. Fork the project
2. Clone the project
3. Create a conf folder in the root directory with config.mjs file with the following configuration

```js

'use strict'

const db = {
  mysql:{
    "connectionLimit": 2,
    "host": "hostip",
    "port": "port",
    "user": "username",
    "password": "password"
  }
};

const server = {
  etl: {
    'lab1': 'lab1url',
    'lab2': 'lab2url'
  },
  amrs:{
    'auth': 'authtoken'
  }
}

const queueTables = {
  ampath: 'queue_table_1',
  alupe: 'queue_table_2'
}
const syncIntervalSettings = {
  ampath:{
    peakHrSyncInterval: 10000,
    offpeakHrSyncInterval: 5000
  },
  alupe:{
    peakHrSyncInterval: 30000,
    offpeakHrSyncInterval: 5000
  }
}

export { db, server, queueTables, syncIntervalSettings}

```

## Requirements
1. Node Version 16
2. Docker

## Getting started
```npm install```
```npm start```

## Building and deployment
```docker build -f Dockerfile -t <account>/<repo>:<version> .```

```docker run -d -it --name <name>  <account>/<repo>:<version> ```

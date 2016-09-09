# A mongoose plugin for hapi

*Just A tool plugin ,enjoy it!*


## Install

```
npm install hapi-plugin-mongoose

```
### Usage
#### Don't forget
```js
require('babel-polyfill'); // In your main prgrams where should use this module
```
#### pass your mongoose schema by hapi plugin options
##### 1. In schema.js
```js
import Mongoose from 'mongoose';

const Test = new Mongoose.Schema({...
export  {tests:Test}
```
##### 2. In your app
```js
import Hapi from 'hapi';
import * as MongoModels from 'hapi-plugin-mongoose';
import * as models from './schema';
const server = new Hapi.Server();
server.register([
  {
    register: MongoModels,
    options: {models,uris:''},
  }
])
```

## License

This software is licensed under the Apache 2 license, quoted below.

    Copyright (c) 2014 Elasticsearch <http://www.elasticsearch.org>

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

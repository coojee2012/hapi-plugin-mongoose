/**
 * Created by linyong on 6/20/16.
 */

import Mongoose from 'mongoose';
import packageJson from '../package.json';
const MongoModels = function (server, options, next) {
  options = options || {};
  const {uris, opts, models}  = options;
  Mongoose.Promise = Promise;
  const dbConnection = Mongoose.createConnection(uris, opts);
  dbConnection.on('error', function (error) {
    server.log(['mongo-models', 'error'], error);
    next(error);
  });
  dbConnection.once('open', function (callback) {
    server.log(['mongo-models', 'info'], 'MongoDB Connect Success!');
    const mongoModels = {}
    Object.keys(models).map(key => {
      mongoModels[key] = dbConnection.model(key, models[key]);
    });
    server.expose('models', mongoModels);
    next();
  });
  dbConnection.on("reconnected", function () {
    server.log(['mongo-models', 'warn'], "DB Reconnected!");
  });

  dbConnection.on("disconnected", function () {
    server.log(['mongo-models', 'warn'], 'DB Disconnected!');
  });

  dbConnection.on("close", function () {
    server.log(['mongo-models', 'warn'], 'DB Closed!');
  });
  server.expose('connection', dbConnection);
};

MongoModels.attributes = {
  pkg: packageJson,
  multiple: true
};

export default MongoModels;

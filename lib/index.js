'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by linyong on 6/20/16.
 */

var MongoModels = function MongoModels(server, options, next) {
  options = options || {};
  var _options = options;
  var uris = _options.uris;
  var opts = _options.opts;
  var models = _options.models;

  _mongoose2.default.Promise = Promise;
  var dbConnection = _mongoose2.default.createConnection(uris, opts);
  dbConnection.on('error', function (error) {
    server.log(['mongo-models', 'error'], error);
    next(error);
  });
  dbConnection.once('open', function (callback) {
    server.log(['mongo-models', 'info'], 'MongoDB Connect Success!');
    var mongoModels = {};
    Object.keys(models).map(function (key) {
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
  pkg: _package2.default,
  multiple: true
};

exports.default = MongoModels;
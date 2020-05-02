"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bunyan = _interopRequireDefault(require("bunyan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _bunyan.default.createLogger({
  name: "applicationLogs",
  streams: [{
    level: 'debug',
    stream: process.stdout // log INFO and above to stdout

  }, {
    level: 'info',
    stream: process.stdout // log INFO and above to stdout

  }, {
    level: 'error',
    path: 'logs/appError.log' // log ERROR and above to a file

  }]
});

var _default = logger;
exports.default = _default;
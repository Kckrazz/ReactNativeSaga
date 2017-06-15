import _ from "lodash";

const Logger = {};

if (_.isFunction(console.debug)) {
  Logger.debug = (...args) => console.debug(...args);
} else {
  Logger.debug = () => {}; // NOOP
}
Logger.log = (...args) => console.log(...args);
Logger.info = (...args) => console.info(...args);
Logger.warn = (...args) => console.warn(...args);
Logger.error = (...args) => console.error(...args);

export default Logger;

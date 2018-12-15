const yargs = require('yargs');

const parseOptions = commandLine => {
  return yargs(commandLine.split(' ')).argv;
};

module.exports = { parseOptions };

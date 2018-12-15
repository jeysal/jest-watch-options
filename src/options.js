const yargs = require('yargs');

const parseOptions = commandLine => {
  let error;
  let options = yargs
    .option('bail')
    .alias('b', 'bail')
    .string('changedSince')
    .boolean('coverage')
    .array('collectCoverageFrom')
    .boolean('notify')
    .string('testNamePattern')
    .alias('t', 'testNamePattern')
    .string('testPathPattern')
    .boolean('updateSnapshot')
    .alias('u', 'updateSnapshot')
    .boolean('verbose')
    .boolean('watch')
    .boolean('watchAll')
    .conflicts('watch', 'watchAll')
    .fail(msg => (error = new Error(msg)))
    .parse(commandLine);

  if (error) {
    throw error;
  }

  if (options.coverage) {
    delete options.coverage;
    options.collectCoverage = true;
  }

  if (options.watch) {
    delete options.watch;
    options.mode = 'watch';
  }
  if (options.watchAll) {
    delete options.watchAll;
    options.mode = 'watchAll';
  }

  return options;
};

module.exports = { parseOptions };

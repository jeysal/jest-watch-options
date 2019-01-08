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

  if (options.coverage != null) {
    options.collectCoverage = options.coverage;
    delete options.coverage;
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

// yargs getCompletion always throws for some reason, so we implement this manually
const options = [
  ...['b', 't', 'u'].map(option => `-${option}`),
  ...[
    'bail',
    'changedSince',
    'coverage',
    'collectCoverageFrom',
    'notify',
    'testNamePattern',
    'testPathPattern',
    'updateSnapshot',
    'verbose',
    'watch',
    'watchAll',
  ].map(option => `--${option}`),
  ...[
    'bail',
    'changedSince',
    'coverage',
    'notify',
    'testNamePattern',
    'testPathPattern',
    'verbose',
  ].map(option => `--no-${option}`),
];
const completeOptions = commandLine => {
  const args = commandLine.split(' ');
  const last = args[args.length - 1];
  return options.filter(option => option.startsWith(last));
};

module.exports = { completeOptions, parseOptions };

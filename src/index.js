const {
  cursorHide,
  cursorShow,
  cursorLeft,
  cursorTo,
  eraseLine,
  eraseScreen,
} = require('ansi-escapes');
const chalk = require('chalk');

const {
  printPatternCaret,
  printRestoredPatternCaret,
  Prompt,
} = require('jest-watcher');

const { completeOptions, parseOptions } = require('./options');

// Roughly based on jest-watch-typeahead TestNamePatternPrompt
class OptionsPlugin {
  constructor({ stdin, stdout }) {
    this._stdin = stdin;
    this._stdout = stdout;

    this._prompt = new Prompt();
  }

  getUsageInfo() {
    return { key: '-', prompt: 'change the CLI options' };
  }

  onKey(key) {
    this._prompt.put(key);
  }

  run(globalConfig, updateConfigAndRun) {
    return new Promise((resolve, reject) => {
      this._stdout.write(cursorHide);
      this._stdout.write(eraseScreen); // clearScreen can mess up color schemes
      this._stdout.write(cursorTo(0, 0));
      this._stdout.write(cursorShow);

      this._prompt.enter(
        this._onChange.bind(this),
        commandLine => {
          const options = parseOptions(commandLine);
          updateConfigAndRun(options);
          resolve();
        },
        reject,
      );
      this._prompt.put('-'); // for the original keypress that activated the plugin
    });
  }

  _onChange(commandLine, options) {
    const matchedOptions = completeOptions(commandLine);

    this._stdout.write(eraseScreen); // clearScreen can mess up color schemes
    this._stdout.write(cursorTo(0, 0));

    const promptStr = 'options > ';
    this._stdout.write(chalk.gray(promptStr));
    this._stdout.write(commandLine);

    this._stdout.write(chalk.gray('\n\nMatching options:\n'));
    matchedOptions.forEach((option, i) =>
      this._stdout.write(`${chalk.yellow(String(i).padStart(2))} ${option}\n`),
    );

    this._stdout.write(cursorTo(promptStr.length + commandLine.length, 0));
    this._stdout.write(cursorShow);
  }
}

module.exports = OptionsPlugin;

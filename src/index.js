const { Prompt } = require('jest-watcher');
const {
  cursorHide,
  cursorShow,
  cursorLeft,
  cursorTo,
  eraseLine,
  eraseScreen,
} = require('ansi-escapes');

const { parseOptions } = require('./options');

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
        commandLine => {
          this._stdout.write(eraseLine);
          this._stdout.write(cursorLeft);
          this._stdout.write('options › ');
          this._stdout.write(commandLine);
        },
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
}

module.exports = OptionsPlugin;

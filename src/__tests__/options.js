const { parseOptions } = require('../options');

describe('parseOptions', () => {
  test('parses different kinds of options', () => {
    expect(
      parseOptions(
        '-b --notify --testNamePattern .+.test.js --collectCoverageFrom **/*.js',
      ),
    ).toEqual(
      expect.objectContaining({
        bail: true,
        notify: true,
        testNamePattern: '.+.test.js',
        collectCoverageFrom: ['**/*.js'],
      }),
    );
  });

  test('support the "no-" prefix', () => {
    expect(parseOptions('--no-bail')).toEqual(
      expect.objectContaining({
        bail: false,
      }),
    );
  });

  test('renames --coverage to collectCoverage', () => {
    expect(parseOptions('--coverage')).toEqual(
      expect.objectContaining({ collectCoverage: true }),
    );
  });

  test('renames --watch to mode: "watch"', () => {
    expect(parseOptions('--watch')).toEqual(
      expect.objectContaining({ mode: 'watch' }),
    );
  });

  test('renames --watchAll to mode: "watchAll"', () => {
    expect(parseOptions('--watchAll')).toEqual(
      expect.objectContaining({ mode: 'watchAll' }),
    );
  });

  test('does not allow --watch and --watchAll', () => {
    expect(() => parseOptions('--watch --watchAll')).toThrowError(/watch/);
  });
});

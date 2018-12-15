const { parseOptions } = require('../options');

describe('parseOptions', () => {
  test('parses different kinds of options', () => {
    expect(parseOptions('--coverage --collectCoverageFrom **/*.js')).toEqual({
      $0: expect.any(String),
      _: [],
      coverage: true,
      collectCoverageFrom: '**/*.js',
    });
  });

  test('support the "no-" prefix', () => {
    expect(parseOptions('--no-coverage')).toEqual({
      $0: expect.any(String),
      _: [],
      coverage: false,
    });
  });
});

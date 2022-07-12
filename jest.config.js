module.exports = {
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '.+\\.(ya?ml|css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$':
      'jest-transform-stub',
    '^.+\\.js$': '@swc/jest',
    '^.+\\.ts$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2021',
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: true,
          },
        },
        sourceMaps: true,
      },
    ],
  },
  moduleNameMapper: {
    '~(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testPathIgnorePatterns: ['src/tests/'],
  coveragePathIgnorePatterns: ['src/main.ts'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{ts,vue}'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
}

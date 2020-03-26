module.exports = {
	preset: 'ts-jest/presets/js-with-ts',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	moduleNameMapper: {
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testMatch: ['**/*.test.(ts|tsx)'],
	setupFiles: ['./jest.setup.js'],
	testPathIgnorePatterns: ['./.next/', './node_modules/'],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.jest.json',
		},
	},
}

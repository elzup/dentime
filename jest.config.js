module.exports = {
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	moduleNameMapper: {
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
	},
	testMatch: ['**/*.test.(ts|tsx)'],
	testPathIgnorePatterns: ['./.next/', './node_modules/'],
	transform: {
		'^.+\\.(t|j)sx?$': '@swc/jest',
	},
}

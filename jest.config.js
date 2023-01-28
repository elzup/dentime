module.exports = {
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	moduleNameMapper: {
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testMatch: ['**/*.test.(ts|tsx)'],
	testPathIgnorePatterns: ['./.next/', './node_modules/'],
	transform: {
		'^.+\\.(t|j)sx?$': '@swc/jest',
	},
	setupFilesAfterEnv: ['./jest.setup.js'],
}

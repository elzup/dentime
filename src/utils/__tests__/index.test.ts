import 'jest-styled-components'
import { encodeStudy, decodeStudy, hex2Bools } from '../formats'
import { Study } from '../../types'

const study: Study = {
	'2': { '1': true, '2': true },
	'4': { '3': false },
	'5': { '1': true, '2': true, '4': false, '5': false },
	'6': { '1': false, '2': false, '3': false, D6: true },
}
const key = '0000c00000c001'
const pks = ['1', '2', '3', '4', '5', '6', 'D5', 'D6']

test('encodeStudy', () => {
	expect(encodeStudy(study, pks)).toStrictEqual(key)
})

test('decodeStudy', () => {
	expect(decodeStudy(key, pks)).toMatchSnapshot()
})

test('hex2Bools', () => {
	expect(hex2Bools('00af')).toStrictEqual([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		true,
		false,
		true,
		false,
		true,
		true,
		true,
		true,
	])
})

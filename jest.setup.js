import { configure } from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'
import '@babel/polyfill'

configure({ adapter: new ReactSixteenAdapter() })

import 'normalize.css'
import 'moment/locale/ja'
import { createGlobalStyle } from 'styled-components'
import config from './'

export const GlobalStyle = createGlobalStyle`
html, body {
  height: 100%;
  min-height: 100%;
  background: ${config.color.main};
  color: ${config.color.font};
}

body {
  /* font-avenir: 'Avenir Next W01', sans-serif; font-weight: 700; */
  font-family: 'Helvetica Neue', 'Segoe UI',
  'Noto Sans Japanese', 'ヒラギノ角ゴ ProN W3', Meiryo, monospace;
  margin: 0;
}
`

// @flow

import 'moment/locale/ja'
import { injectGlobal } from 'styled-components'

injectGlobal`
html, body {
  height: 100%;
  min-height: 100%;
}
body {
  font-family: 'Helvetica Neue', 'Segoe UI',
  'Noto Sans Japanese', 'ヒラギノ角ゴ ProN W3', Meiryo, monospace;
  margin: 0;
}
`

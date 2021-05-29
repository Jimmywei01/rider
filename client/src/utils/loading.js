import { Loading } from 'element-ui'

let loading
export function startLoading () {
  loading = Loading.service({
    text: '加載中',
    background: 'rgba(239, 239, 239, 0.8)'
  })
}
export function endLoading () {
  loading.close()
}

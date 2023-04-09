import { ElNotification } from 'element-plus'
import NProgress from 'nprogress'

// 全局进度条
export function showFullLoading() {
  NProgress.start()
}
export function hideFullLoading() {
  NProgress.done()
}

// 消息通知
export function notice({ type = 'success', message }) {
  ElNotification({
    type,
    message,
    duration: 1500
  })
}

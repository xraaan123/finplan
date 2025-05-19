import { toast } from 'react-toastify'

export const showSuccess = (msg: string) => toast.success(msg, { icon: () => <span>🟢</span>})

export const showError = (msg: string) => toast.error(msg, { icon: () => <span>❌</span>})

export const showInfo = (msg: string) => toast.success(msg, { icon: () => <span>ℹ️</span>})

import Api from '@/services/Api'

export default {
  signIn(credentials) {
    return Api().post('videos/login', credentials)
  },
  me(token) {
    return Api().post('videos/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}


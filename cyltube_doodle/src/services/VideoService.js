import Api from '@/services/Api'

export default {
  getAll(data, params) {
    return Api().get(`videos/${data}`, {
      params
    })
  },
  getById(id) {
    return Api().get(`videos/${id}`)
  }
}

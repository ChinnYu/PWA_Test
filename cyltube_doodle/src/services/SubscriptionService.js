import Api from '@/services/Api'

export default {
  getSubscribedVideos(page) {
    return Api().get('videos/getAll', {
      params: {
        page
      }
    })
  }
}

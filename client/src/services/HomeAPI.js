import API from '@/services/API'
export default {
  getHomes () {
    return API().get('homes')
  },
  getLocation (query) {
    return API().post('location', {
      query: query
    })
  }
}

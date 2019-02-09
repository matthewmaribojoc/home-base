import API from '@/services/API'
export default {
  getHomes () {
    return API().get('homes')
  }
}

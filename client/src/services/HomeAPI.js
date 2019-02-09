import API from '@/services/API'
export default {
  getHomes () {
    return API().get('homes')
  },
  getLocation (query) {
    return API().post('location', {
      query: query
    })
  },
  getDetails (query) {
    return API().post('addHome', {
      data: query
    })
  },
  getFind (query) {
    return API().post('findHome', {
      data: query
    })
  },
  getWeather (lat, lon) {
    return API().post('weather', {
      lat: lat,
      lon: lon
    })
  },
  sendMatchEmail (email) {
    return API().post('sendMatchEmail', {
      email: email
    })
  }
}

import axios from 'axios'

export const APP_KEY = '85e26e4e15f378913cb15913a4e30850'
export const APP_ID = 82950100

const baseUrl = axios.create({
  baseURL: 'https://api.nutritionix.com'
})

export const apiSearch = async searchText => {
  try {
    const response = await baseUrl.get('/v1_1/search', {
      params: {
        appId: APP_ID,
        appKey: APP_KEY,
        q: searchText,
        limit: 5,
        offset: 0
      }
    })
    console.log(response)
    return Promise.resolve(response.data.results)
  } catch (e) {
    return Promise.reject(e)
  }
}

// apiSearch('Greek Yogurt')

export default baseUrl

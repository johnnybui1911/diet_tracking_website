export const APP_KEY = '85e26e4e15f378913cb15913a4e30850'
export const APP_ID = '82950100'
export const BASE_URL = 'https://trackapi.nutritionix.com/v2'
export const headers = {
  'x-app-key': APP_KEY,
  'x-app-id': APP_ID,
  'Content-Type': 'application/json'
}

// axios
//   .get('https://trackapi.nutritionix.com/v2/search/instant', {
//     headers: headers,
//     params: {
//       query: 'greek'
//     }
//   })
//   .then(res => console.log(res))
//   .catch(e => console.log(e))

// fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
//   method: 'POST',
//   headers: headers,
//   body: JSON.stringify({
//     query: 'big mac'
//   })
// })
//   .then(res => res.json())
//   .then(resJson => console.log(resJson))
//   .catch(e => console.log(e))

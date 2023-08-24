/* eslint-disable consistent-return */
import axios from 'axios'

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        },
      }
    )

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getWeatherData = async (lat, lon) => {
  if (lat && lon) {
    const options = {
      method: 'GET',
      url: `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lon}`,
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
      },
    }

    try {
      const response = await axios.request(options)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

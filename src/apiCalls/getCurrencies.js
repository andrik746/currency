import axios from 'axios'
import apiUrl from '@/apiUrls'

export const getCurrencies = async (queryObject) => {
  return await axios.get(apiUrl.currencyByDate(queryObject))
    .then(r => r.data.rates)
}
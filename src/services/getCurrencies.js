import axios from 'axios'
import apiUrl from '@/services/apiUrl'

export default async (queryObject) => {
  const response = await axios.get(apiUrl.currencyByDate(queryObject))

  return response
}
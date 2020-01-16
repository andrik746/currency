import axios from 'axios'
import apiUrl from '@/services/apiUrl'

export const getCurrencyWeek = async (queryObject) => {
  const response = await axios.get(apiUrl.currencyByDate(queryObject))
  console.log(response)

  return response
}

export const getCurrencyMonth = async () => {
  
  return response
}

export const getCurrencyYear = async () => {
  
  return response
}
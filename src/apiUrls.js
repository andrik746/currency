export default {
  currencyByDate ({ currencies, base, start, end }) {
    return `https://api.exchangeratesapi.io/history?base=${base}&symbols=${currencies.join(',')}&start_at=${start}&end_at=${end}`
  } 
}
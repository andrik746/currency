import formatDate from '@/utils/formatDate'

const today = new Date
const todayInMillisecond = today.getTime()
const millisecondsPerDay = 86400000

export default {
  today: formatDate(today),
  nDaysAgo(n) {
    const nMilliseconds = millisecondsPerDay * n
    const nTimeAgo = new Date (todayInMillisecond - nMilliseconds)
    return formatDate(nTimeAgo)
  }
}

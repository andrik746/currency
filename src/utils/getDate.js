import formatDate from '@/utils/formatDate'

const today = new Date
const todayInMillisecond = today.getTime()
const millisecondsPerDay = 86400000

const week = millisecondsPerDay * 7
const weekAgo = new Date (todayInMillisecond - week)

export default {
  today: formatDate(today),
  weekAgo: formatDate(weekAgo)
}

<template>
  <div id="app">
    <div class="chart-wrap">
      <h3>Compare to {{base}}</h3>
      <LineChart :chartData="chartData" :options="options" />

      <PeriodSwitch
        :showTwoWeeks="showTwoWeeks"
        :showMonth="showMonth"
        @fetchTwoWeeks="fetchTwoWeeks"
        @fetchMonth="fetchMonth"
      />
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'
import { getCurrencies } from '@/services/getCurrencies.js'
import getDate from '@/utils/getDate'
import PeriodSwitch from '@/components/PeriodSwitch.vue'

export default {
  name: 'app',
  components: {
    LineChart,
    PeriodSwitch
  },
  created() {
    this.fetchCurrency(14)
  },
  data() {
    return { 
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'BRL',
            backgroundColor: '#81bcf878',
            data: []
          },
          {
            label: 'EUR',
            backgroundColor: '#ff4040b0',
            data: []
          },
          {
            label: 'AUD',
            backgroundColor: '#6563ff85',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      currencies: ['BRL', 'EUR', 'AUD'],
      base: 'USD',
      showTwoWeeks: true,
      showMonth: false
    }
  },
  methods: {
    async fetchCurrency(daysAgo) {
      try {
        let response = JSON.parse(sessionStorage.getItem(`currency-result-${daysAgo}`))
        if(!response) {
          const queryObject = { 
            currencies: this.currencies,
            base: this.base,
            start: getDate.nDaysAgo(daysAgo),
            end: getDate.today
          }
          response = await getCurrencies(queryObject)
          sessionStorage.setItem(`currency-result-${daysAgo}`, JSON.stringify(response))
        }
        
        const ratesEntries = Object.entries(response)
        const sortedRatesEntries = this.sortRatesEntries(ratesEntries)
        
        this.populateChart(sortedRatesEntries)
      } catch (e) {
        console.error (e)
        this.resetData()
      }
    },
    sortRatesEntries(ratesEntries) {
      return ratesEntries.sort((dateOne, dateTwo) => {
        const dateOneString = dateOne[0]
        const dateOneObject = new Date (dateOneString)
        const dateOneMilliseconds = dateOneObject.getTime()

        const dateTwoString = dateTwo[0]
        const dateTwoObject = new Date (dateTwoString)
        const dateTwoMilliseconds = dateTwoObject.getTime()

        return dateOneMilliseconds - dateTwoMilliseconds
      })
    },
    populateChart(entries) {
      entries.forEach(entry => {
        const [ date, ratesObject ] = entry
        this.chartData.labels.push(date)
        
        this.currencies.forEach((currency, index) => {
          const rate = Number(ratesObject[currency]).toFixed(4)
          this.chartData.datasets[index].data.push(rate)
        })
      })
      // reactivity hack
      this.chartData = Object.assign({}, this.chartData)
    },
    fetchTwoWeeks() {
      this.resetData()
      this.fetchCurrency(14)
      this.showTwoWeeks = true
      this.showMonth = false
    },
    fetchMonth() {
      this.resetData()
      this.fetchCurrency(30)
      this.showMonth = true
      this.showTwoWeeks = false
    },
    resetData() {
      this.chartData.labels = []
      this.chartData.datasets.forEach(dataset => dataset.data = [])
    }
  }
}
</script>

<style>
  body{
    background: #f3f9ff;
  }
  .chart-wrap {
    border-radius: 5px;
    box-shadow: 1px 1px 5px #eee;
    padding: 10px;
    background: #fff;
    max-width: 800px;
    margin: 15px auto 0 auto;
  }
  h3 {
    font-family: Arial;
    text-align: center;
    font-weight: 300;
  }
</style>

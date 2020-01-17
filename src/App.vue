<template>
  <div id="app">
    <div class="chart-wrap">
      <BaseButton @click="refreshData">Refresh</BaseButton>
      <LineChart :chartData="chartData" :options="options" />
    </div>
    
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'
import BaseButton from '@/components/BaseButton.vue'
import getCurrencies from '@/services/getCurrencies.js'
import getDate from '@/utils/getDate'

export default {
  name: 'app',
  components: {
    LineChart,
    BaseButton
  },
  created() {
    this.fetchCurrency()
  },
  data() {
    return { 
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'BRL',
            backgroundColor: '#f32c7c',
            data: []
          },
          {
            label: 'EUR',
            backgroundColor: '#03248A',
            data: []
          },
          {
            label: 'AUD',
            backgroundColor: '#7c86a0',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      currencies: ['BRL', 'EUR', 'AUD'],
      base: 'USD'
    }
  },
  methods: {
    async fetchCurrency() {
      try {
        let response = JSON.parse(localStorage.getItem('currency-result'))
        if(!response) {
          const queryObject = { 
            currencies: this.currencies,
            base: this.base,
            start: getDate.nDaysAgo(14),
            end: getDate.today
          }
          response = await getCurrencies(queryObject)
          localStorage.setItem('currency-result', JSON.stringify(response))
        }
        
        const ratesEntries = Object.entries(response.data.rates)

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
    refreshData() {
      this.resetData()
      this.fetchCurrency()
    },
    resetData() {
      this.chartData.labels = []
      this.chartData.datasets.forEach(dataset => dataset.data = [])
      localStorage.removeItem('currency-result')
    }
  }
}
</script>

<style>
  #app{
    display:flex;
    justify-content: center;
  }
  .chart-wrap {
    border-radius: 5px;
    box-shadow: 1px 1px 5px #eee;
    padding: 10px;
    background: #fff;
  }
</style>

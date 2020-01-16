<template>
  <div id="app">
    <GraphChart :chartData="chartData" :options="options" />
  </div>
</template>

<script>
import GraphChart from './components/GraphChart.vue'
import { getCurrencyWeek } from '@/services/services.js'
import getDate from '@/utils/getDate'

export default {
  name: 'app',
  components: {
    GraphChart
  },
  created() {
    this.fetchCurrency()
  },
  data() {
    return { 
      chartData: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f32c7c',
            data: [40, 34, 33, 20]
          },
          {
            label: 'Data Two',
            backgroundColor: '#205dbf',
            data: [10, 54, 23, 10]
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
        const queryObject = { 
          currencies: this.currencies,
          base: this.base,
          start: getDate.weekAgo,
          end: getDate.today
        }
        await getCurrencyWeek(queryObject)
        // todo show chart
      } catch (e) {
        console.error (e)
      }
    }
  }
}
</script>

<style>

</style>

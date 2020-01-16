<template>
  <div id="app">
    <GraphChart :chartData="chartData" :options="options" />
  </div>
</template>

<script>
import GraphChart from './components/GraphChart.vue'

export default {
  name: 'app',
  components: {
    GraphChart
  },
  data() {
    return { 
      chartData: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 34, 53, 20]
          },
          {
            label: 'Data Two',
            backgroundColor: 'blue',
            data: [10, 54, 23, 10]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
}
</script>

<style>

</style>

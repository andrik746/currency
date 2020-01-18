import { expect, assert } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import App from '@/App.vue'
import LineChart from '@/components/LineChart.vue'
import PeriodSwitch from '@/components/PeriodSwitch.vue'
import mockStorage from './mockStorage.js'
import { getCurrencies } from '@/apiCalls/getCurrencies.js'

describe('App.vue', () => {
  let wrapper
  global['sessionStorage'] = mockStorage()
  
  beforeEach(() => {
    wrapper = shallowMount(App)
  })

  it('contains LineChart component', () => {
    expect(wrapper.contains(LineChart)).to.be.true
  })

  it('contains PeriodSwitch component', () => {
    expect(wrapper.contains(PeriodSwitch)).to.be.true
  })

  it('renders chart-wrap', () => {
    expect(wrapper.contains('div.chart-wrap')).to.be.true
  })

  it('renders h3', () => {
    expect(wrapper.contains('h3')).to.be.true
  })

  it('has correct initial data-values and types', () => {
    expect(wrapper.vm.chartData).to.be.an('object')
    
    expect(wrapper.vm.options).to.be.an('object')
    expect(wrapper.vm.options).to.deep.equal({
      responsive: true,
      maintainAspectRatio: false
    })

    expect(wrapper.vm.currencies).to.be.an('array')
    expect(wrapper.vm.currencies).to.deep.equal(['BRL', 'EUR', 'AUD'])

    expect(wrapper.vm.base).to.be.an('string')
    expect(wrapper.vm.base).to.equal('USD')

    assert.isBoolean(wrapper.vm.showTwoWeeks, 'showTwoWeeks is bool')
    expect(wrapper.vm.showTwoWeeks).to.equal(true)

    assert.isBoolean(wrapper.vm.showMonth, 'showMonth is bool')
    expect(wrapper.vm.showMonth).to.equal(false)

    assert.isBoolean(wrapper.vm.showSixMonths, 'showSixMonths is bool')
    expect(wrapper.vm.showSixMonths).to.equal(false)
  })

  it('interects with sessionStorage: getRatesFromStorage() && setRatesToStorage() methods', async () => {
    const entry = 'test value'
    
    wrapper.vm.setRatesToStorage({ daysAgo: 2, sortedRatesEntries: entry })

    await Vue.nextTick()

    const storedValue = wrapper.vm.getRatesFromStorage(2)
    expect(storedValue).to.equal(entry)
  })

  it('sorts different values passed to sortRatesEntries() method', () => {
    let entriesToSort = [ ['2018-01-07', {}], ['2019-01-07', {}], ['2019-03-03', {}] ]
    let sortedEntries = wrapper.vm.sortRatesEntries(entriesToSort)

    expect(sortedEntries).to.deep.equal([ ['2018-01-07', {}], ['2019-01-07', {}], ['2019-03-03', {}] ])

    entriesToSort = [ ['2007-03-11', {}], ['2007-02-02', {}], ['2007-01-01', {}] ]
    sortedEntries = wrapper.vm.sortRatesEntries(entriesToSort)

    expect(sortedEntries).to.deep.equal([ ['2007-01-01', {}], ['2007-02-02', {}], ['2007-03-11', {}] ])
  })

  it('populateChart() method populates the chart with correct data', () => {
    const entries = [ 
      ['2020-01-01', {BRL: '9.9997', EUR: '1.1111', AUD: '1.1111'}], 
      ['2020-01-02', {BRL: '9.9998', EUR: '1.1112', AUD: '1.1110'}], 
      ['2020-01-03', {BRL: '9.9999', EUR: '1.1113', AUD: '1.1100'}] 
    ]

    wrapper.vm.resetData()
    wrapper.vm.populateChart(entries)

    expect(wrapper.vm.chartData).to.deep.equal({
      labels: ['2020-01-01', '2020-01-02', '2020-01-03'],
      datasets: [
        {
          label: 'BRL',
          backgroundColor: '#81bcf878',
          data: ["9.9997", "9.9998", "9.9999"]
        },
        {
          label: 'EUR',
          backgroundColor: '#ff4040b0',
          data: ['1.1111', '1.1112', '1.1113']
        },
        {
          label: 'AUD',
          backgroundColor: '#6563ff85',
          data: ['1.1111', '1.1110', '1.1100']
        }
      ]
    })
  })
})

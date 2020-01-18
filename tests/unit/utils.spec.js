import { expect } from 'chai'
import getDate from '@/utils/getDate'
import formatDate from '@/utils/formatDate'

describe('utils/formatDate.js', () => {
  it('returns correct date format', () => {
    let testDate = new Date(2011, 0, 1)
    expect(formatDate(testDate)).to.equal('2011-1-1')
    testDate = new Date(2020, 0, 17)
    expect(formatDate(testDate)).to.equal('2020-1-17')
  })
})
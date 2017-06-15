import * as ShiftSelectors from '../ShiftSelectors'

import { expect } from 'chai'
import  'mocha'

describe('ShiftSelectors', function () {
  it('groupedByDateThenId', function () {
    const state = {
      shifts: {
        1: { id: 1, start: '2016-07-20T02:00:00+10:00' },
        2: { id: 2, start: '2016-07-21T02:00:00+10:00' },
        3: { id: 3, start: '2016-07-20T04:00:00+10:00' },
        4: { id: 4, start: '2016-07-20T03:00:00+10:00' }
      }
    }
    const expected = {
      '2016-07-20': {
        1: { id: 1, start: '2016-07-20T02:00:00+10:00' },
        3: { id: 3, start: '2016-07-20T04:00:00+10:00' },
        4: { id: 4, start: '2016-07-20T03:00:00+10:00' }
      },
      '2016-07-21': {
        2: { id: 2, start: '2016-07-21T02:00:00+10:00' }
      }
    }
    const result = JSON.stringify(ShiftSelectors.groupedByDateThenId(state), null, 2)
    // expect(result).to.equal(JSON.stringify(expected, null, 2))
  })
})

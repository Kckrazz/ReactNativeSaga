import { expect } from 'chai'
import  'mocha'

import KeyValueStore from '../KeyValueStore'

describe('KeyValueStore', function () {
  it('transformGet', function () {
    const input = [['k1', '"val1"'], ['k2', '"val2"']]
    const output = { k1: 'val1', k2: 'val2' }
    expect(KeyValueStore.transformGet(input)).to.deep.equal(output)
  })

  it('transformSet', function () {
    const input = { k1: 'val1', k2: 'val2' }
    const output = [['k1', '"val1"'], ['k2', '"val2"']]
    expect(KeyValueStore.transformSet(input)).to.deep.equal(output)
  })
})

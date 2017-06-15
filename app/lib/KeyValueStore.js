import _fp from 'lodash/fp'
import { autobind } from 'core-decorators'
import { AsyncStorage } from 'react-native'

import Logger from '../lib/Logger'

/*
 * Setting up block level variable to store class state
 * , set's to null by default.
 */
let instance = null

@autobind
class KeyValueStore {

  constructor () {
    if (!instance) {
      instance = this
    }
    return instance
  }

  transformGet = _fp.pipe(
    _fp.fromPairs,
    _fp.mapValues(JSON.parse),
  );

  transformSet = _fp.pipe(
    _fp.mapValues((v) => (!v ? null : v)),
    _fp.mapValues(JSON.stringify),
    _fp.toPairs,
  );

  async multiGet (keys) {
    try {
      const payload = await AsyncStorage.multiGet(keys, Logger.debug)
      const data = this.transformGet(payload)
      Logger.debug('KeyValueStore.multiGet(): fetched', keys, data)
      return data
    } catch (err) {
      Logger.warn('KeyValueStore.mutliGet(): error', err)
      throw err
    }
  }

  async multiSet (data) {
    try {
      const payload = this.transformSet(data)
      await AsyncStorage.multiSet(payload)
      Logger.debug('KeyValueStore.multiSet(): saved', data)
    } catch (err) {
      Logger.warn('KeyValueStore.mutliSet(): error', err)
      throw err
    }
  }

  async multiRemove (keys) {
    try {
      await AsyncStorage.multiRemove(keys)
      Logger.debug('KeyValueStore.multiRemove(): deleted', keys)
    } catch (err) {
      Logger.warn('KeyValueStore.mutliRemove(): error', err)
      throw err
    }
  }
}

export default new KeyValueStore()

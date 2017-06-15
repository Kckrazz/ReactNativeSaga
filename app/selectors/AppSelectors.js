import every from 'lodash/every'
import some from 'lodash/some'
import { createSelector } from 'reselect'
import * as UserSelectors from './UserSelectors'

export const initialised = createSelector(
  UserSelectors.initialised,
  (...args) => every(args) // returns true if all arguments are true.
)

export const networkActivityIndicatorVisible = createSelector(
  UserSelectors.authPending,
  (...args) => some(args) // returns true if any argument is true.
)

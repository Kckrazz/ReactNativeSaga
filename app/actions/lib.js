
function handleAction (type, payload, error) {
  if (!type) {
    throw new Error("missing mandatory parameter: 'type'")
  }

  return {
    error: error || {},
    // meta: {
    //   timestamp: Date.now()
    // },
    payload: payload || {},
    type
  }
}

function handleActionType (subtype) {
  return (type, payload, error) => handleAction(type[subtype], payload, error)
}

export const action = handleAction
export const actionRequest = handleActionType('request')
export const actionPending = handleActionType('pending')
export const actionFailure = handleActionType('failure')
export const actionSuccess = handleActionType('success')

import * as types from '../constants/ActionTypes'

export function addEvent(lineId, timeSpan, color) {
  return { type: types.ADD_EVENT, lineId, timeSpan, color }
}

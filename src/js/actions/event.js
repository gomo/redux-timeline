import * as types from '../constants/ActionTypes'

export function eventToDraggable(eventId) {
  return { type: types.EVENT_TO_DRAGGABLE, eventId }
}

export function setOffsetToEvent(eventId, offset) {
  return { type: types.SET_OFFSET_TO_EVENT, eventId, offset }
}

export function clearEventOffset(eventId) {
  return { type: types.CLEAR_EVENT_OFFSET, eventId}
}

export function addEvent(lineId, timeSpan, color) {
  return { type: types.ADD_EVENT, lineId, timeSpan, color }
}

export function displayTimeToEvent(eventId, time) {
  return { type: types.DISPLAY_TIME_TO_EVENT, eventId, time }
}

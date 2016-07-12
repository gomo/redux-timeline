import * as types from '../constants/ActionTypes'
import assign from 'object-assign';

let maxId = 0;

export default function events(state = [], action) {
  switch (action.type) {
    case types.ADD_EVENT:
      return [
        {
          id: action.id ? action.id : 'new_' + maxId++,
          lineId: action.lineId,
          timeSpan: action.timeSpan,
          color: action.color
        },
        ...state
      ]
    case types.EVENT_TO_DRAGGABLE:
      return state.map(event => {
        if(event.id != action.eventId){
          return event;
        } else {
          return assign(event, {draggable: true});
        }
      });
    case types.SET_OFFSET_TO_EVENT:
      return state.map(event => {
        if(event.id != action.eventId){
          return event;
        } else {
          return assign(event, {moveTo: action.offset});
        }
      })
    case types.CLEAR_EVENT_OFFSET:
      return state.map(event => {
        if(event.id != action.eventId){
          return event;
        } else {
          return assign(event, {moveTo: undefined});
        }
      })
    case types.DISPLAY_TIME_TO_EVENT:
      return state.map(event => {
        if(event.id != action.eventId){
          return event;
        } else {
          return assign(event, {draggingDisplay: action.time.getDisplayTime()});
        }
      })
    default:
      return state
  }
}

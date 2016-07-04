import * as types from '../constants/ActionTypes'

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
    default:
      return state
  }
}

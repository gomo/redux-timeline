import { combineReducers } from 'redux'
import events from './events'

const rootReducer = combineReducers({
  events,
  lines: (state = [], action) => state,
  lineWidth: (state = 62, action) => state,
  minHeight: (state = 17, action) => state,
  minInterval: (state = 5, action) => state,
  rulerInterval: (state = 4, action) => state,
  timeSpan: (state = null, action) => state,
  windowHeight: (state = 0, action) => {
    return state;
  }
})

export default rootReducer

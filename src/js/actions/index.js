import assign from 'object-assign';
import * as LineActions from './line'
import * as EventActions from './event'

export default assign(LineActions, EventActions)

import App from '../src/js/containers/App';
import configureStore from '../src/js/store/configureStore'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import TimeSpan from '../src/js/classes/TimeSpan'
import Actions from '../src/js/actions/'

function getWindowSize(){
  const width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  const height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  return {width: width, height: height};
}

function calcHeight(timelineElement){
  const wrapperBounds = timelineElement.getBoundingClientRect();
  const windowSize = getWindowSize();
  return windowSize.height - wrapperBounds.top;
}

window.onload = () => {

  const elem = document.getElementById('timeline')
  const store = configureStore({
    lines: [
      {label:'label1', id:'__1'},
      {label:'label2', id:'__2'},
      {label:'label3', id:'__3'},
      {label:'label55', id:'__4'},
      {label:'label5', id:'__5'},
      {label:'label6', id:'__6'},
      {label:'label7', id:'__7'},
      {label:'label8', id:'__8'},
      {label:'label9', id:'__9'},
      {label:'label10', id:'__10'},
      {label:'label11', id:'__11'},
      {label:'label12', id:'__12'},
      {label:'label13', id:'__13'},
      {label:'label14', id:'__14'},
      {label:'label15', id:'__15'},
      {label:'label16', id:'__16'},
      {label:'label17', id:'__17'},
      {label:'label18', id:'__18'}
    ],
    events: [
      {id: '1221', lineId: '__1', timeSpan: TimeSpan.create([11, 15], [12, 30]), color: '#FFDCB6'},
      {id: '1231', lineId: '__1', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '1241', lineId: '__1', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '1251', lineId: '__1', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},
      {id: '1261', lineId: '__1', timeSpan: TimeSpan.create([18, 30], [19, 30]), color: '#FFDCB6'},
      {id: '1271', lineId: '__1', timeSpan: TimeSpan.create([19, 30], [20, 30]), color: '#FFDCB6'},
      {id: '1281', lineId: '__1', timeSpan: TimeSpan.create([20, 30], [21, 30]), color: '#FFDCB6'},
      {id: '1291', lineId: '__1', timeSpan: TimeSpan.create([22, 30], [23, 30]), color: '#FFDCB6'},

      {id: '123', lineId: '__2', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '124', lineId: '__2', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '125', lineId: '__2', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},

      {id: '1233', lineId: '__3', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '1243', lineId: '__3', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '1253', lineId: '__3', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},

      {id: '1234', lineId: '__4', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '1244', lineId: '__4', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '1254', lineId: '__4', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},

      {id: '12355', lineId: '__5', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '12455', lineId: '__5', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '12555', lineId: '__5', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},

      {id: '1226', lineId: '__6', timeSpan: TimeSpan.create([11, 15], [12, 30]), color: '#FFDCB6'},
      {id: '1236', lineId: '__6', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '1246', lineId: '__6', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '1256', lineId: '__6', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},
      {id: '1266', lineId: '__6', timeSpan: TimeSpan.create([18, 30], [19, 30]), color: '#FFDCB6'},
      {id: '1276', lineId: '__6', timeSpan: TimeSpan.create([19, 30], [20, 30]), color: '#FFDCB6'},
      {id: '1286', lineId: '__6', timeSpan: TimeSpan.create([20, 30], [21, 30]), color: '#FFDCB6'},
      {id: '1296', lineId: '__6', timeSpan: TimeSpan.create([22, 30], [23, 30]), color: '#FFDCB6'},

      {id: '12377', lineId: '__7', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '12477', lineId: '__7', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '12577', lineId: '__7', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},

      {id: '1228', lineId: '__8', timeSpan: TimeSpan.create([11, 15], [12, 30]), color: '#FFDCB6'},
      {id: '1238', lineId: '__8', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '1248', lineId: '__8', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '1258', lineId: '__8', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},
      {id: '1268', lineId: '__8', timeSpan: TimeSpan.create([18, 30], [19, 30]), color: '#FFDCB6'},
      {id: '1278', lineId: '__8', timeSpan: TimeSpan.create([19, 30], [20, 30]), color: '#FFDCB6'},
      {id: '1288', lineId: '__8', timeSpan: TimeSpan.create([20, 30], [21, 30]), color: '#FFDCB6'},
      {id: '1298', lineId: '__8', timeSpan: TimeSpan.create([22, 30], [23, 30]), color: '#FFDCB6'},

      {id: '1239', lineId: '__9', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '1249', lineId: '__9', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '1259', lineId: '__9', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},

      {id: '12210', lineId: '__10', timeSpan: TimeSpan.create([11, 15], [12, 30]), color: '#FFDCB6'},
      {id: '12310', lineId: '__10', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '12410', lineId: '__10', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '12510', lineId: '__10', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},
      {id: '12610', lineId: '__10', timeSpan: TimeSpan.create([18, 30], [19, 30]), color: '#FFDCB6'},
      {id: '12710', lineId: '__10', timeSpan: TimeSpan.create([19, 30], [20, 30]), color: '#FFDCB6'},
      {id: '12810', lineId: '__10', timeSpan: TimeSpan.create([20, 30], [21, 30]), color: '#FFDCB6'},
      {id: '12910', lineId: '__10', timeSpan: TimeSpan.create([22, 30], [23, 30]), color: '#FFDCB6'},

      {id: '12311', lineId: '__11', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '12411', lineId: '__11', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '12511', lineId: '__11', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},

      {id: '12312', lineId: '__12', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '12412', lineId: '__12', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '12512', lineId: '__12', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},

      {id: '12213', lineId: '__13', timeSpan: TimeSpan.create([11, 15], [12, 30]), color: '#FFDCB6'},
      {id: '12313', lineId: '__13', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '12413', lineId: '__13', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '12513', lineId: '__13', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},
      {id: '12613', lineId: '__13', timeSpan: TimeSpan.create([18, 30], [19, 30]), color: '#FFDCB6'},
      {id: '12713', lineId: '__13', timeSpan: TimeSpan.create([19, 30], [20, 30]), color: '#FFDCB6'},
      {id: '12813', lineId: '__13', timeSpan: TimeSpan.create([20, 30], [21, 30]), color: '#FFDCB6'},
      {id: '12913', lineId: '__13', timeSpan: TimeSpan.create([22, 30], [23, 30]), color: '#FFDCB6'},

      {id: '12314', lineId: '__14', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '12414', lineId: '__14', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '12514', lineId: '__14', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},

      {id: '12315', lineId: '__15', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '12415', lineId: '__15', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '12515', lineId: '__15', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},

      {id: '12216', lineId: '__16', timeSpan: TimeSpan.create([11, 15], [12, 30]), color: '#FFDCB6'},
      {id: '12316', lineId: '__16', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '12416', lineId: '__16', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '12516', lineId: '__16', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},
      {id: '12616', lineId: '__16', timeSpan: TimeSpan.create([18, 30], [19, 30]), color: '#FFDCB6'},
      {id: '12716', lineId: '__16', timeSpan: TimeSpan.create([19, 30], [20, 30]), color: '#FFDCB6'},
      {id: '12816', lineId: '__16', timeSpan: TimeSpan.create([20, 30], [21, 30]), color: '#FFDCB6'},
      {id: '12916', lineId: '__16', timeSpan: TimeSpan.create([22, 30], [23, 30]), color: '#FFDCB6'},

      {id: '12217', lineId: '__17', timeSpan: TimeSpan.create([11, 15], [12, 30]), color: '#FFDCB6'},
      {id: '12317', lineId: '__17', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '12417', lineId: '__17', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '12517', lineId: '__17', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},
      {id: '12617', lineId: '__17', timeSpan: TimeSpan.create([18, 30], [19, 30]), color: '#FFDCB6'},
      {id: '12717', lineId: '__17', timeSpan: TimeSpan.create([19, 30], [20, 30]), color: '#FFDCB6'},
      {id: '12817', lineId: '__17', timeSpan: TimeSpan.create([20, 30], [21, 30]), color: '#FFDCB6'},
      {id: '12917', lineId: '__17', timeSpan: TimeSpan.create([22, 30], [23, 30]), color: '#FFDCB6'},

      {id: '12218', lineId: '__18', timeSpan: TimeSpan.create([11, 15], [12, 30]), color: '#FFDCB6'},
      {id: '12318', lineId: '__18', timeSpan: TimeSpan.create([12, 30], [13, 30]), color: '#FFDCB6'},
      {id: '12418', lineId: '__18', timeSpan: TimeSpan.create([14, 0], [16, 30]), color: '#FFDCB6'},
      {id: '12518', lineId: '__18', timeSpan: TimeSpan.create([17, 0], [18, 30]), color: '#FFDCB6'},
      {id: '12618', lineId: '__18', timeSpan: TimeSpan.create([18, 30], [19, 30]), color: '#FFDCB6'},
      {id: '12718', lineId: '__18', timeSpan: TimeSpan.create([19, 30], [20, 30]), color: '#FFDCB6'},
      {id: '12818', lineId: '__18', timeSpan: TimeSpan.create([20, 30], [21, 30]), color: '#FFDCB6'},
      {id: '12918', lineId: '__18', timeSpan: TimeSpan.create([22, 30], [23, 30]), color: '#FFDCB6'},
    ],
    timeSpan: TimeSpan.create([10, 0], [25, 0]),
    windowHeight: calcHeight(elem)
  })

  ReactDOM.render(
    <Provider store={store}>
      <App
        lineDidClick={data => {
          store.dispatch(Actions.addEvent(
            data.lineId,
            new TimeSpan(data.time, data.time.addMin(60)),
            '#FFDCB6'
          ));
        }}
        eventDidClick={data => {
          store.dispatch(Actions.eventToDraggable(data.id));
        }}
      />
    </Provider>,
    elem
  );
}

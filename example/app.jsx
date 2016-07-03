import App from '../src/js/containers/App';
import configureStore from '../src/js/store/configureStore'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import TimeSpan from '../src/js/classes/TimeSpan'

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
      {label:'label4', id:'__4'},
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
    timeSpan: TimeSpan.create([10, 0], [25, 0]),
    windowHeight: calcHeight(elem)
  })

  ReactDOM.render(
    <Provider store={store}>
      <App
        lineDidClick={data => {
          console.log(data);
        }}
      />
    </Provider>,
    elem
  );
}

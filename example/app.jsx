import App from '../src/js/containers/App';
import configureStore from '../src/js/store/configureStore'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

const store = configureStore()

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('wrapper')
  );
}

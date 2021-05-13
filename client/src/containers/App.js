import {Provider} from 'react-redux'
import {store} from '../store/index'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import Navmenu from './Navmenu'
import Main from './Main'
import { setAuthorizationToken, setCurrenUser } from '../store/actions/auth'
import jwtDecode from 'jwt-decode'

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  try {
    store.dispatch(setCurrenUser(jwtDecode(localStorage.jwtToken)))
  } catch (error) {
    store.dispatch(setCurrenUser({}))
  }
}

function App() {
  return(
    <Provider store={store}>
      <Router>
         <Navmenu/>
         <Main/>
      </Router>
    </Provider>
 )}

export default App;

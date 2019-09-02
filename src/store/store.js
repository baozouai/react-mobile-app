import {createStore, applyMiddleware} from 'redux'
import RootReducer from './reducers/reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
let store = createStore(RootReducer, applyMiddleware(logger, thunk))
export default store
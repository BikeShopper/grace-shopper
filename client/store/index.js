import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import bikesReducer from './allProducts';
import singleBikeReducer from './singleProduct';
import cartReducer from './cart';
import adminUserReducer from './adminUserStore';

const reducer = combineReducers({
  auth,
  bikesReducer,
  singleBikeReducer,
  cartReducer,
  adminUserReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';

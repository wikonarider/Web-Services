import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducer/index';
import thunk from 'redux-thunk';
import { loadState, saveState } from '../../utils/localStorage';
import { setCartStorage } from '../actions';

// creo la store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// toma el carro del local
const cart = loadState();

// si habia carrito en localStorage
// lo dispacho
if (cart) {
  store.dispatch(setCartStorage(cart));
}

// actualizo el localStorage cada vez que cambia
store.subscribe(() => {
  const { cart } = store.getState();
  saveState(cart);
});

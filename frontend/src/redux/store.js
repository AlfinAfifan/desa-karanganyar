import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './actions/modalSlice';
import inventarisReducer from './actions/inventarisSlice';

const store = configureStore({
  reducer: { inventaris: inventarisReducer, modal: modalReducer },
});

console.log('on create store : ', store.getState());

store.subscribe(() => {
  console.log('store change : ', store.getState());
});

export default store;

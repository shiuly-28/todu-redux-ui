import React from 'react'
import {TodoApp} from './components/todoApp.jsx';
import {Provider} from 'react-redux';
import {store} from './store/store.js';

export const App = () => {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  )
}

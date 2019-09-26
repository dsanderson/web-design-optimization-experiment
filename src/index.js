import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from "redux-thunk"
import reducer from './reducers'
import generateStore from './generateStore'
import Root from './containers/Root'

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
  }

let createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore)
const tree = generateStore()
console.log(tree);
const store = createStoreWithMiddleware(reducer, tree)

render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root')
)
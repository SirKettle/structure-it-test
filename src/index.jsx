import '@babel/polyfill';
import 'sanitize.css/sanitize.css';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from 'components/App';
import { configureStore } from './state/configureStore';

const mountNode = document.getElementById('app');

const renderApp = () => {
  const store = configureStore();
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    mountNode,
  );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('components/App', () => {
    unmountComponentAtNode(mountNode);
    renderApp();
  });
}

renderApp();

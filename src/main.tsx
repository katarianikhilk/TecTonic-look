// import './tracing.ts';

import ReactDOM from 'react-dom/client';

import './index.scss';

import React from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from './index.routes.tsx';
import appUrlConfigurator from './modules/core/utils/appUrlResolver.ts';
import { persistor, store } from './modules/shared/state/store.ts';

appUrlConfigurator.setBaseHrefAndTenantCode();

//To disable consoles in production mode
if (import.meta.env.PROD) {
  if (console) {
    console.log = () => {
      return;
    };
    console.debug = () => {
      return;
    };
    console.error = () => {
      return;
    };
    console.info = () => {
      return;
    };
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: 'Lato',
              colorPrimary: '#0078D6'
            }
          }}
        >
          <Router />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

//导入reactdom
import ReactDOM from 'react-dom/client';
//主入口 router
import App from './page/router';

import reportWebVitals from './util/reportWebVitals';
//css
import "./asset/style/App.css"
//通知
import { SnackbarProvider } from 'notistack';
//导入 provider组件
import { Provider } from 'react-redux'
//导入store
import store, {persistor} from "./reducer/store";
//store 永久性存储
import {PersistGate} from "redux-persist/integration/react";
//arco css
import "@arco-design/web-react/dist/css/arco.css";
import {ViewportProvider} from "./util/viewportContext";

export const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <SnackbarProvider maxSnack={1}>
                  <ViewportProvider>
                      <App />
                  </ViewportProvider>
              </SnackbarProvider>
          </PersistGate>
      </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

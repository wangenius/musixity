//导入reactdom
import ReactDOM from 'react-dom/client';
//主入口 router
import App from './page/router';
//导入 scss
import "./asset/style/main.scss"
// google测试
import reportWebVitals from './util/reportWebVitals';
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
//导入视图
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
reportWebVitals();
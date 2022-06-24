import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CircularProgress} from "@material-ui/core";
import {Provider} from "react-redux";
import 'react-toastify/dist/ReactToastify.min.css';
import { store } from './app/store';
import {ConnectedRouter} from "connected-react-router";
import { history } from 'utils';
import {ToastContainer} from "react-toastify";
ReactDOM.render(
  <React.StrictMode>
      <Suspense fallback={<CircularProgress size="20" color="secondary" />}>
          <Provider store={store}>
              <ConnectedRouter history={history}>
                <App />
              </ConnectedRouter>

              <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
              />
          </Provider>
      </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

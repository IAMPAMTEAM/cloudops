import { jsx as _jsx } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';
// Tailwind css
import './tailwind.css';
// i18n (needs to be bundled)
import './i18n';
// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';
// Redux
import { Provider } from 'react-redux';
import store from './store/index';
// AG Grid
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(Suspense, { children: _jsx(Provider, { store: store, children: _jsx(RouterProvider, { router: router }) }) }) }));

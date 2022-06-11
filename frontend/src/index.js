import React from 'react';
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import { store } from './store/store'

import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

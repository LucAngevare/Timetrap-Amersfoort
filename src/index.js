import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import reportWebVitals from './reportWebVitals';
import {Map, Menu, Dialogue} from './pages'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/404.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Map/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/dialogue/*" element={<Dialogue/>}>
        </Route>
        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

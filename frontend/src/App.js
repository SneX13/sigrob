import React, {Component} from "react";
import './App.css';
import {Routes, Route,} from 'react-router-dom';
import Dashboard from "./pages/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer"
import Login from "./pages/Login/Login";
import CssBaseline from "@mui/material/CssBaseline";

class App extends Component {
    render() {
        return (
            <div className="App">
                <CssBaseline/>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
                <Footer/>
            </div>
        );
    }
}

export default App;

import React from 'react';
import {Outlet} from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./Footer/Footer";

const Layout = () => {
    return (
        <div className="App">
            <CssBaseline/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout;
import React from "react";
import './App.css';
import {Routes, Route,} from 'react-router-dom';
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Layout from "./components/Layout";
import Login from "./pages/Login/Login";
import PageNotFound from "./components/PageNotFound";
import RequireAuth from "./auth/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import SingleSystem from "./pages/System/SingleSystem";
import EditSystem from "./pages/System/EditSystem";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>

                {/* public routes */}
                <Route path="login" element={<Login/>}/>
                <Route path="unauthorized" element={<Unauthorized/>}/>
                <Route path="admin" element={<AdminDashboard/>}/>
                <Route path="user" element={<UserDashboard/>}/>
                <Route path="systems">
                    <Route path=":systemId" element={<SingleSystem/>}/>
                    <Route path="edit/:systemId" element={<EditSystem/>}/>
                </Route>

                {/* protect routes */}
                <Route element={<RequireAuth/>}>
                    <Route path="admin-dashboard" element={<AdminDashboard/>}/>
                    <Route path="user-dashboard" element={<UserDashboard/>}/>

                </Route>

                {/* catch all missing routes */}
                <Route path="*" element={<PageNotFound/>}/>

            </Route>
        </Routes>
    );
}

export default App;

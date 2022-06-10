import React from "react";
import './App.css';
import {Routes, Route,} from 'react-router-dom';
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Layout from "./components/Layout";
import Login from "./pages/Login/Login";
import PageNotFound from "./components/PageNotFound";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";

const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/* public routes */}
                <Route path="login" element={<Login/>}/>
                <Route path="unauthorized" element={<Unauthorized/>}/>

                {/* protect routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
                    <Route path="admin-dashboard" element={<AdminDashboard/>}/>
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]}/>}>
                    <Route path="user-dashboard" element={<UserDashboard/>}/>
                </Route>

                {/* catch all missing routes */}
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;

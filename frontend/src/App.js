import React from "react";
import './App.css';
import {Routes, Route,} from 'react-router-dom';
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Layout from "./components/Layout";
import Login from "./pages/Login/Login";
import Lounge from "./components/Lounge";
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

                {/* we want to protect these routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
                    <Route path="admin" element={<AdminDashboard/>}/>
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Editor]}/>}>
                    <Route path="editor" element={<UserDashboard/>}/>
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]}/>}>
                    <Route path="lounge" element={<Lounge/>}/>
                </Route>

                {/* catch all */}
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;

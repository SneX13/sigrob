import React, {useState, useEffect} from "react";
import UserService from '../../services/user.service';
import Box from "@mui/material/Box";
import Dashboard from "../../components/Dashboard/Dashboard";

const AdminDashboard = () => {
    return (
        <Dashboard name="Admin Dashboard" isAdmin={true}/>
    );
};
export default AdminDashboard;
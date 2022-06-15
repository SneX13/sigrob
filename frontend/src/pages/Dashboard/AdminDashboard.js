import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";

const AdminDashboard = () => {
    return (
        <Dashboard name="Admin Dashboard" isAdmin={true}/>
    );
};
export default AdminDashboard;
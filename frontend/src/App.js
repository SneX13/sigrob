import React, {Component} from "react";
import './App.css';
import {Routes, Route,} from 'react-router-dom';

import Footer from "./components/Footer/Footer"
import Login from "./pages/Login/Login";
import CssBaseline from "@mui/material/CssBaseline";
import { connect } from "react-redux";

import { clearMessage } from "./actions/message";
import { history } from './helpers/history';
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showUserBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
        history.listen((location) => {
            props.dispatch(clearMessage()); // clear message when changing location
        });
    }
    componentDidMount() {
        const user = this.props.user;
        if (user) {
            this.setState({
                currentUser: user,
                showUserBoard: user.UserRole.includes("User"),
                showAdminBoard: user.UserRole.includes("Admin"),
            });
        }
    }

    render() {
        return (
            <div className="App">
                <CssBaseline/>
                <Routes>
                    <Route path="/" element={this.state.currentUser ? <AdminDashboard/>: <Login/>}/>
                    <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
                    <Route path="/user-dashboard" element={<UserDashboard/>}/>
                </Routes>
                <Footer/>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}
export default connect(mapStateToProps)(App);

import React, { useState } from "react";
import { Box, Button, InputBase, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../../redux/actions/user";
const { container, input, heading } = require("./styles");

const { LOGIN } = require('../../apis/user');

const CustomerLogin = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const LoginHandler = () => {
        const checkuser = {
            email: email,
            password: password,
        }

        axios.post(LOGIN, checkuser)
            .then(async (resp) => {
                console.log(resp);
                dispatch(UpdateUser({ ...resp.data, isLogged: true,}));
                resp.status === 200 ? toast.success("Successfully Logged in") : toast.warn(resp.data.Message);
                if(resp.data.isAdmin === true)window.location.href='/admin'
                else window.location.href='/products'
            })
            .catch(async (err) => {
                console.log(err);
                err.response.status === 301 ? toast.warn(err.response.data.Message) : toast.warn(err.response.data.Message);
            })
    }

    return (
        <Box style={container}>
            <Typography variant="h4" style={heading}>Login</Typography>
            <InputBase
                style={input}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputBase
                style={input}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" style={loginBtn} onClick={LoginHandler}>Login</Button>
            <Typography style={{ fontSize: "18px", marginTop: '20px' }} >
                Don't have an account yet?{" "}
                <span> <Link to="/register" style={{ color: '#791314' }}> Signup </Link> </span>
            </Typography>
        </Box>
    );
}

const loginBtn = {
    width: "200px",
    marginTop: "15px",
    padding: "7px",
    textTransform: "capitalize",
    fontSize: "15px",
}

export default CustomerLogin;
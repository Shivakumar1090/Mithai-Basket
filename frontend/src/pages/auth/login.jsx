import React, { useState } from "react";
import { Box, InputBase, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../../redux/actions/user";
import ButtonContained from "../../components/Button/containedButton";
const { container, input, heading, form } = require("./styles");

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
            <Box  width={{xs: '300px',md: '400px'}} style={form}>
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
                <ButtonContained
                    text="login"
                    marginTop="15px"
                    onClick={LoginHandler}
                />
                <Typography style={{ fontSize: "17px", marginTop: '15px' }} >
                    Don't have an account yet?{" "}
                    <span> <Link to="/register" style={{ color: '#791314' }}> Signup </Link> </span>
                </Typography>
            </Box>
        </Box>
    );
}


export default CustomerLogin;
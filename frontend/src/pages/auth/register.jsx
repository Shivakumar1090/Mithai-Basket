import React, { useState } from "react";
import { Box, Button, InputBase, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const { container, input, heading } = require("./styles");

const { REGISTER } = require('../../apis/user');

const CustomerRegisteration = () => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");


    const registerHandler = () => {
        const newuser = {
            name: name,
            email: email,
            password: password,
        }

        axios.post(REGISTER, newuser)
            .then(async (res) => {
                await res.status === 200 ? toast.success(res.data.Message) : toast.warn(res.data.Message);
                Navigate('/login')
            })
            .catch(async (err) => {
                console.log(err);
                await err.response.status === 422 ? toast.warn(err.response.data.Message) : toast.error(err.response.data.Message);
            })
    }

    return (
        <div>
            <Box style={container}>
                <Typography variant="h4" style={heading}>
                    Create account
                </Typography>
                <InputBase
                    style={input}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <Button style={btn} onClick={registerHandler}> Create </Button>
                <Typography style={{ fontSize: "18px", marginTop: '20px' }} >
                    if you have account already then{" "}
                    <span><Link to="/login" style={{ color: '#791314' }}>Login Here</Link></span>
                </Typography>
            </Box>
        </div>
    );
}

const btn = {
    background: "#791314",
    width: "200px",
    marginTop: "15px",
    padding: "7px",
    textTransform: "capitalize",
    fontSize: "15px",
    color: '#fff'
}

export default CustomerRegisteration;
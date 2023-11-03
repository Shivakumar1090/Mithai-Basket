import React, { useState } from "react";
import { Box, InputBase, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonContained from "../../components/Button/containedButton";

const { container, input, heading, form } = require("./styles");

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
                <Typography style={heading}>
                    Create account
                </Typography>
                <Box  width={{xs: '300px',md: '400px'}} style={form}>
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
                    <ButtonContained
                        onClick={registerHandler}
                        text="create"
                        marginTop="15px"
                    />
                    <Typography style={{ fontSize: "17px", marginTop: '15px' }} >
                        if you have account already then{" "}
                        <span><Link to="/login" style={{ color: '#791314' }}>Login Here</Link></span>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}

export default CustomerRegisteration;
import React, { useState } from "react";
import './style.css';

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Radio, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import { ClearCart } from "../../redux/actions/cart";
const { CREATE_ORDER } = require('../../apis/order');

const Payment = (props) => {
    const { state } = useLocation();
    const dispath = useDispatch();
    const Navigate = useNavigate();

    const user = useSelector(state => state.user);

    const orderState = state.details;
    const [mode, setMode] = useState('COD');

    const address = orderState.address.houseNo + ", " +
        orderState.address.street + ", " +
        orderState.address.city;

    const handleAbort = () => {
        Navigate('/products');
        toast.info("payment aborted!");
    }

    const placeOrder = () => {
        const newOrder = {
            ...orderState, 
            paymentMode: 'COD'
        }
        console.log(newOrder);
        axios
            .post(CREATE_ORDER, newOrder, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then((res) => {
                console.log("added");
                toast.success("order placed!");
                dispath(ClearCart());
                Navigate('/products');
            })
            .catch(err => {
                toast.error("Something went wrong, Please try again!");
                Navigate('/cart');
                console.log(err);
            });
    }

    return (
        <div>
            <Box className='payment-wrapper'>
                <Accordion className='summary-accordian' expanded>
                    <AccordionSummary
                        className='accordian-summary'
                    >
                        <Typography>Order Summary</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='accordian-details'>
                        <Typography style={{ fontWeight: 600 }}>Items: </Typography>
                        <Box className='items-section'>
                            {
                                orderState?.items?.map((item) => (
                                    <Box key={item._id} display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography>{item?.name}</Typography>
                                        <Typography>{`Rs.${item?.price} x ${item?.count}`}</Typography>
                                    </Box>
                                ))
                            }
                        </Box>
                        <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
                            <Typography style={{ fontWeight: 600 }}>Delivery Address: </Typography>
                            <Typography>{address}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
                            <Typography style={{ fontWeight: 600 }}>Mobile: </Typography>
                            <Typography>{orderState.mobile}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
                            <Typography style={{ fontWeight: 600 }}>Total: </Typography>
                            <Typography>₹ {orderState.total}</Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='summary-accordian' expanded>
                    <AccordionSummary
                        className='accordian-summary'
                    >
                        <Typography>Payment Mode:</Typography>
                    </AccordionSummary>
                </Accordion>
                <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
                    <Radio value='COD' onClick={(e) => setMode(e.target.value)} checked={mode === 'COD'} />
                    <Typography>Cash on Delivery</Typography>
                </Box>
                <Box display="flex" gap="20px" justifyContent='center' className='payment-footer'>
                    <Button variant="outlined" className='cancel-btn' onClick={handleAbort}>Cancel</Button>
                    <Button variant="contained" color='primary' className='confirm-btn' onClick={placeOrder}>Order</Button>
                </Box>
            </Box>
        </div>
    );
}

export default Payment;
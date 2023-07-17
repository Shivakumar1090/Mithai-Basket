import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const { GET_ORDERS,EDIT_ORDER } = require('../../apis/order');

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);

    const statusOptions = ['Placed', 'Accepted', 'Out for Delivery', 'Completed'];


    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = () => {
        axios.post(GET_ORDERS, {})
            .then(async (res) => {
                await setOrders(res.data);
            })
            .catch(err => {
                toast.error("something went wrong!");
                console.log(err);
            })
    }

    const editOrder = async (payload, orderId) => {
        try {
            console.log(orderId);
            const resp = await axios.post(EDIT_ORDER + orderId, payload);
            if (resp.status === 200) {
                console.log(resp.data);
                return resp?.data;
            } else {
                throw Error(resp.data.error || "something went wrong!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onEditOrder = async (payload,orderId) => {
        setLoading(true);
        try {
            await editOrder(payload, orderId);
            toast.success("order updated succesfully!", { position: toast.POSITION.BOTTOM_RIGHT })
            setLoading(false);
            fetchOrders();
        } catch (err) {
            setLoading(false);
            console.log(err);
            toast.error(err.message);
        }
    }

    return (
        <>{user.isAdmin ? 
            <Box className="orders-container" padding='0px 40px 40px 40px'>
                <Typography variant="h5" style={{ margin: "2% 0" }} >
                    Orders
                </Typography>
                <TableContainer >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHead}>No. </TableCell>
                                <TableCell style={tableHead}>Date</TableCell>
                                <TableCell style={tableHead}>Items</TableCell>
                                <TableCell style={tableHead} align='right'>Amount</TableCell>
                                <TableCell style={tableHead} align='right'>Status</TableCell>
                                <TableCell style={tableHead} align='right'>Change Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders.map((order, index) => {
                                    const statusIndex = statusOptions.indexOf(order?.status || '')
                                    const nextState = (statusIndex === statusOptions.length) ? null :
                                        statusOptions[statusIndex + 1];
                                    return (
                                        <TableRow key={order._id}>
                                            <TableCell style={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }} >{order.createdDate}/{order.createdMonth}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>
                                                {order.items.map(ele => {
                                                    return (
                                                        <Box display='flex' justifyContent='space-between'>
                                                            <Typography>{ele.name}</Typography>
                                                            <Typography>{ele.count}</Typography>
                                                        </Box>
                                                    )
                                                })}
                                            </TableCell>
                                            <TableCell style={{ textAlign: 'center' }} align='right'>{order.totalPrice} </TableCell>
                                            <TableCell style={{ textAlign: 'center' }} align='right'>
                                                {order.status}
                                            </TableCell>
                                            {
                                                order.status !== "Cancelled" &&
                                                <TableCell style={{ textAlign: 'center' }} align='right'>
                                                    <Button onClick={() => onEditOrder({ status: nextState },order._id)}>Mark as {nextState}</Button>
                                                </TableCell>
                                            }
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box> : <Navigate to="/" />}
        </>)
}

const tableHead = {
    backgroundColor: '#1212',
    color: '#000',
    textAlign: 'center'
}

export default AdminOrders
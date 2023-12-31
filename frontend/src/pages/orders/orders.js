import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import Order from './orderComp';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const {GET_ORDERS} = require('../../apis/order');

const OrdersSection = () => {
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [fetching, setFetching] = useState(false);

    const user = useSelector((state) => state.user);

    const statusOptions = ['Placed', 'Accepted', 'Out for Delivery', 'Cancelled'];

    const filteredOrders = statusFilter === "" ? orders : orders.filter((order) => order.status === statusFilter);

    useEffect(() => {
      fetchOrders();
    }, [])

    const fetchOrders = async () => {
      let payload = {
        id: user._id,
        token: user.token,
        status: statusFilter
      }
      setFetching(true);
      try {
        const resp = await axios.post(GET_ORDERS, payload);
        setOrders(resp.data);
        setFetching(false);
      } catch (err) {
        toast.error("couldn't fetch orders", { position: toast.POSITION.TOP_CENTER });
        setFetching(false);
      }
    }

    return (
      <Box display="flex" flexDirection="column" justifyContent="center"  alignItems="center" gap="25px" marginTop="20px">
          <Box display="flex" alignItems="center" gap="25px">
              <Typography>Status:</Typography>
              <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
              >
                  <MenuItem value="">All</MenuItem>
                  {
                    statusOptions.map((status) => (
                      <MenuItem value={status}>{status}</MenuItem>
                    ))
                  }
              </Select>
          </Box>
          <Box className='orders-list' margin="10px auto 20px auto">
              {fetching ?
                  <CircularProgress />
                  :  filteredOrders.length > 0 &&
                    <Box display="flex" alignItems="center" justifyContent="center" flexWrap="wrap" gap="25px">
                        {filteredOrders.map(item => <Order data={item} key={item._id}  fetchOrders={fetchOrders} />)}
                    </Box>
              }
          </Box>
        </Box>
    );
};



export default OrdersSection;
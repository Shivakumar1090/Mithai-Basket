import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Chip } from '@mui/material';

const {EDIT_ORDER} = require('../../apis/order');

const Order = ({ data, fetchOrders }) => {
  const [loading, setLoading] = useState(false);
  

  const createdAt = new Date(data?.createdAt);
  const formattedDate = createdAt.getHours() + ":" + createdAt.getMinutes() + ", " +
    createdAt.getDate() + "-" + (createdAt.getMonth() + 1) + "-" + createdAt.getFullYear();

  let totalPrice = 0;
  data?.items?.forEach((item) => {
    totalPrice += (item?.count * item?.price);
  });

    const editOrder = async (payload, orderId) => {
        try {
          const resp = await axios.post(EDIT_ORDER+orderId, payload);
          if (resp.status === 200) {
            return resp?.data;
          } else {
            throw Error(resp.data.error || "something went wrong!");
          }
        } catch (err) {
            console.log(err);
        //   errorHandler(err);
        }
      }

  const onEditOrder = async (payload) => {
    setLoading(true);
    try {
      await editOrder(payload, data._id);
      toast.success("order updated succesfully!", { position: toast.POSITION.BOTTOM_RIGHT })
      setLoading(false);
      fetchOrders();
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  }

  return (
    <Card sx={{width: {xs: '300px' , sm: '350px',md: '400px'}}}>
      <CardContent>
        <KeyValue left="Order Id:" value={data?._id} />
        <KeyValue left="Ordered By:" value={data?.userId?.name} />
        <KeyValue left="Address:" value={data?.address?.houseNo + " " + data?.address?.street + " " + data?.address?.city} />
        <KeyValue left="Mobile:" value={data?.mobile} />
        <Accordion className='summary-accordian'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className='accordian-summary'
          >
            <Typography fontSize={{xs: '13px' , md: '17px'}}>Order Summary</Typography>
          </AccordionSummary>
          <AccordionDetails className='accordian-details'>
            {
              data?.items?.map((item) => (
                <Box key={item._id} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>{item?.name}</Typography>
                  <Typography>{`Rs.${item?.price} x ${item?.count}`}</Typography>
                </Box>
              ))
            }
            <Box display="flex" justifyContent="flex-start" gap="10px" alignItems="center">
              <Typography style={{ fontWeight: 600 }}>Total: </Typography>
              <Typography>{totalPrice}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <KeyValue left="Ordered:" value={formattedDate} />
        <KeyValue left="Order Status:" value={data?.status} />
        <KeyValue left="Payment Mode:" value={data?.paymentMode === 'COD' ? 'Cash On delivery' : data?.paymentMode} />
        <Box display="flex" marginTop="15px" gap="20px">
          {data?.status === 'Placed' | data?.status === 'Accepted' ?
            <Button variant="contained" className='cancel-btn' onClick={() => onEditOrder({status: 'Cancelled'})}>Cancel</Button>
            : <Chip label={data?.status}/>
          }
        </Box>
      </CardContent>
    </Card>
  );
};

const KeyValue = (props) => {
  return (
    <Box display="flex" gap="20px" className='order-info'>
      <Typography fontSize={{xs: '13px' , md: '17px',color: '#'}}>{props.left}</Typography>
      <Typography fontSize={{xs: '13px' , md: '17px'}}>{props.value}</Typography>
    </Box>
  );
}

export default Order;

import React,{useState} from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Address = ({total,setOpenAddress}) => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);

    const [address, setAddress] = useState({
        houseNo: '',
        street: '',
        city: ''
    })
    const [mobile, setMobile] = useState('');

    const handleChange = (e, key) => {
        setAddress({ ...address, [key]: e.target.value });
    }

    const placeOrder = async () => {
        if (cart.length === 0) {
            toast.info("cart is empty!");
            return;
        }
        if (!user.token || !user._id) {
            navigate('/login')
            toast.info("login to place an order!");
            return;
        }
        if (address.houseNo.length === 0 || address.street.length === 0 || address.city.length === 0) {
            toast.error("address required!");
            return;
        }
        if (mobile.length === 0) {
            toast.error("mobile number required!");
            return;
        }
        const state = {
            userId: user._id,
            items: cart,
            order_status: 'Placed',
            address,
            mobile,
            token: user._id,
            total
        }
        navigate('/payment' , {state: {details: state}})
    }
    
    return (
        <Box style={ModalStyle}>
            <Typography style={heading}>Are you sure want to place this order?</Typography>
            <TextField
                style={input}
                variant="standard"
                label='House NO.'
                id='houseNo'
                type='text'
                value={address.houseNo}
                onChange={(e) => handleChange(e, 'houseNo')}
            />
            <TextField
                style={input}
                variant="standard"
                label='Street'
                id='street'
                type='text'
                value={address.street}
                onChange={(e) => handleChange(e, 'street')}
            />
            <TextField
                style={input}
                variant="standard"
                label='City'
                id='city'
                type='text'
                value={address.city}
                onChange={(e) => handleChange(e, 'city')}
            />
            <TextField
                style={input}
                variant="standard"
                label='Mobile NO.'
                id='mobile'
                type='text'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />
            <Box display="flex" gap="20px" justifyContent='center' marginTop='10px'>
                <Button variant="outlined" onClick={() => setOpenAddress(false)}>Cancel</Button>
                <Button variant="contained" color='primary'  onClick={placeOrder}>Confirm</Button>
            </Box>
        </Box>
    )
}

const heading = {
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "15px",
    color: '#791314',
};

const input = {
    margin: "7px",
    width: "400px",
    color: "#791314",
    padding: "2px",
    background: '#fff',
};


const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: '#fff',
    border: "none",
    borderRadius: "3px",
    textAlign: 'center',
    color: "black",
    width: 400,
    p: 4,
    paddingLeft: "3rem",
    paddingRight: "3rem",
    paddingTop: '1rem',
    paddingBottom: '1rem',
}

export default Address;
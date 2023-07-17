import React, { useState } from "react";
import { Button, Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { AddCartItem } from "../../redux/actions/cart";
import axios from "axios";

const {UPDATE_CART} = require('../../apis/cart');
const DOMAIN = process.env.REACT_APP_DOMAIN;

const Product = (props) => {
    const dispath = useDispatch();
    const { state } = useLocation();
    const Navigate = useNavigate();

    const user = useSelector(state => state.user);

    const UpdateCartBackend = (item,type) => {
        const userId = user._id;
        const data = {
            itemId: item._id,
            quantity: item.count || 0,
            type: type,
        }
        console.log(data);
        axios.post(UPDATE_CART+userId, data)
            .then((res) => {
                console.log("updated");
            })
            .catch(err => {
                console.log(err);
            })
    }

    const add_item_cart = async(item) => {
        const userId = user._id;
        if(!userId){
            toast.warning("please LOGIN to continue!");
            Navigate('/login')
        }
        else{
            dispath(AddCartItem({...item}));
            UpdateCartBackend(item,"ADD_ITEM");
            toast.success("Item added successfully");
        }
    }

    return (
        <Box style={container} >

            <img src={`${DOMAIN}/${state.details.img}`} alt='' style={img}></img>
            <Box marginLeft='30px'>
                <Typography fontSize='15px'>SWEEE SHOP</Typography>
                <Typography style={name} marginTop='5px'>{state.details.name}</Typography>
                <Typography variant="h6" marginTop='10px'>Price. ₹ {state.details.price}</Typography>
                <Typography fontSize='18px' marginTop='20px'>Pack</Typography>
                <Chip
                    label={<Typography variant="caption">{state.details.grams}{" "}grams</Typography>}
                    size='medium' variant="filled" color="primary"
                />
                <Typography fontSize='12px' marginTop='20px'>add to cart if you like this item...</Typography>
                
                <Button  style={btn} onClick={()=> add_item_cart(state.details)}>Add to cart</Button>

            </Box>
            
        </Box>
    );
}

const container = {
    display: 'flex',
    padding: '30px',
}

const img = {
    width: '45%',
    height: '75vh',
    borderRadius: '30px',
    objectFit: 'cover',
    opacity: 1,
    transition: '.5s ease',
    backfaceVisibility: 'hidden',
    '&:hover': {
        opacity: 0.3,
    },
}


const name = {
    fontSize: "25px",
    fontWeight: '600',
    textTransform: 'capitailise',
}

const btn = {
    width: '350px',
    background: '#791314',
    color: '#fff',
    padding: '10px',
    marginTop: '1px',
    fontSize: '18px',
    textTransform: "capitalize",
}

export default Product;
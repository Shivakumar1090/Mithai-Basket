import React from "react";
import {  Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { AddCartItem } from "../../redux/actions/cart";
import axios from "axios";
import ButtonContained from "../../components/Button/containedButton";

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
        <Box 
            display='flex' 
            flexDirection={{xs: 'column' , sm:'row'}} 
            justifyContent={{xs: 'center', sm: 'flex-start'}} 
            alignItems= {{xs: 'center', sm: 'flex-start'}} 
            padding={{xs : '0px' , sm: '30px'}}
        >
            <Box  width={{md: '50%' , sm:'60%', xs: '90%'}} height={{md: '65vh',sm: '50vh', xs: '30vh'}}>
                <img src={`${DOMAIN}/${state.details.img}`} alt='' style={img}></img>
            </Box>
            <Box marginLeft={{xs: '0px', sm: '30px'}} marginTop={{xs: '20px', sm: '0px'}}>
                <Typography fontSize='15px'>MITHAI BASKET</Typography>
                <Typography style={name} marginTop='5px'>{state.details.name}</Typography>
                <Typography variant="h6" marginTop={{xs: '5px', sm: '10px'}}>Price. ₹ {state.details.price}</Typography>
                <Typography fontSize='18px' marginTop={{xs: '5px', sm: '20px'}}>Pack</Typography>
                <Chip
                    label={<Typography variant="caption">{state.details.grams}{" "}grams</Typography>}
                    size='medium' variant="filled" color="primary"
                />
                <Typography fontSize='12px' marginTop='20px'>add to cart if you like this item...</Typography>
                <Box width={{xs: '250px' ,md: '350px'}}>
                    <ButtonContained
                        text="Add to cart"
                        width='100%'
                        padding="12px"
                        onClick={()=> add_item_cart(state.details)}
                    />
                </Box>
            </Box>
            
        </Box>
    );
}

const img = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
    backfaceVisibility: 'hidden',
}

const name = {
    fontSize: "25px",
    fontWeight: '600',
    textTransform: 'capitailise',
}

export default Product;
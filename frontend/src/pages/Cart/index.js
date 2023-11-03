import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//MUI 
import { Chip, Divider, Modal, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import { Box } from "@mui/system";

//MUI ICONS
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

// OTHER COMPONENTS
import EmptyCart from "../../components/emptyCart";
import ButtonContained from "../../components/Button/containedButton";
import Address from "./address";

//API ENDPOINTS
import { AddCartItem, DeleteCartItem, DecreaseCartItem } from "../../redux/actions/cart";



const { UPDATE_CART } = require('../../apis/cart');
const DOMAIN = process.env.REACT_APP_DOMAIN;

const Cart = () => {
    const Navigate = useNavigate();
    const dispath = useDispatch();

    const [openAddress, setOpenAddress] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);

    const UpdateCartBackend = (item, type) => {
        const userId = user._id;
        const data = {
            itemId: item._id,
            quantity: item.count,
            type: type,
        }
        axios.post(UPDATE_CART + userId, data)
            .then((res) => {
                console.log("updated");
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleIncrease = (item) => {
        UpdateCartBackend(item, "ADD_ITEM");
        dispath(AddCartItem({ ...item }));
    }

    const handleDecrease = (item) => {
        UpdateCartBackend(item, "REMOVE_ITEM");
        dispath(DecreaseCartItem({ ...item }));
    }

    const handleDelete = (item) => {
        dispath(DeleteCartItem(item));
        UpdateCartBackend(item, "DELETE_ITEM");
    }

    useEffect(() => {
        let p = 0;
        // eslint-disable-next-line array-callback-return
        cart.map((ele, k) => {
            p = Number(ele.price) * (ele.count) + p;
        });
        setTotalPrice(p);
    }, [cart])

    return (
        <Box padding={{xs: '15px' , md: '50px 30px'}} >
            {cart.length === 0 ?
                <EmptyCart></EmptyCart>
                :
                <Box>
                    <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }} >
                        <Typography variant="heading" fontSize={{xs: '20px' , md: '28px'}}>Your Cart</Typography>
                        <Link to='/products' style={{ textDecoration: 'none'}}>
                            <Typography variant="link">Continue Shopping</Typography>
                        </Link>
                    </Box>
                    
                    <TableContainer >
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>PRODUCT</StyledTableCell>
                                <StyledTableCell>QAUNTITY</StyledTableCell>
                                <StyledTableCell align="right">TOTAL</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map(cartItem => {
                                return (
                                    <TableRow key={cartItem._id}>
                                        <StyledTableCell component="th" scope="row">
                                            <Box
                                                style={{ cursor: 'pointer' }}
                                                key={cartItem._id}
                                                display='flex'
                                                onClick={() => Navigate(`/product/${cartItem._id}`, { state: { details: cartItem } })}
                                            >
                                                <Box 
                                                    width={{xs: '70px', md:'120px'}} 
                                                    height={{xs: '70px', md:'120px'}} 
                                                    marginRight={{xs: '10px' , md:'20px'}}
                                                >
                                                    <img src={`${DOMAIN}/${cartItem.img}`} alt="img" style={img}></img>
                                                </Box>
                                                <Box margin='auto 0px auto'>
                                                    <Typography fontSize={{xs: '13px', sm:'15px', md:'20px'}} >{cartItem.name}</Typography>
                                                    <Typography fontSize={{xs: '8px', sm: '12px',md:'15px'}}>Pack: {cartItem.grams} Grams</Typography>
                                                </Box>
                                            </Box>
                                        </StyledTableCell>

                                        <StyledTableCell variant="body" align='right'>
                                            <Stack spacing={1} direction='row' >
                                                <Chip
                                                    variant="outlined"
                                                    color='primary'
                                                    label={
                                                        <Stack spacing={{xs: 1,md: 2}} direction='row' style={autoMargins}>
                                                            <AddOutlinedIcon 
                                                                style={autoMargins}
                                                                sx={{fontSize: { xs: 12, sm: 18 } }} 
                                                                cursor='pointer' 
                                                                onClick={() => handleIncrease(cartItem)} 
                                                            />
                                                            <Typography fontSize={{xs : 11,sm: 15}}>{cartItem?.count}</Typography>
                                                            <RemoveOutlinedIcon  
                                                                style={autoMargins}
                                                                sx={{fontSize: { xs: 13, sm: 18 } }} 
                                                                cursor='pointer' 
                                                                onClick={() => handleDecrease(cartItem)} 
                                                            />
                                                        </Stack>
                                                    }
                                                />
                                                <DeleteOutlineOutlinedIcon 
                                                    style={autoMargins}
                                                    sx={{fontSize: { xs: 16, sm: 18 } }} 
                                                    cursor='pointer' 
                                                    onClick={() => handleDelete(cartItem)} 
                                                />
                                            </Stack>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            ₹ {cartItem.price * cartItem?.count}
                                        </StyledTableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Divider />
                    <Box textAlign='right' marginTop='20px' >
                        <Typography >SubTotal.  ₹{totalPrice}</Typography>
                        <ButtonContained 
                            text="Check out"
                            onClick={() => setOpenAddress(true)}
                            width={{xs: "200px", md: '300px'}}
                            padding="10px"
                            fontSize={{xs: '14px' , md: '18px'}}
                        />
                    </Box>
                </Box>
            }
            <Modal open={openAddress} onClose={() => setOpenAddress(false)}>
                <Address setOpenAddress={setOpenAddress} total={totalPrice} />
            </Modal>
        </Box>
    );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.primary.main,
    [theme.breakpoints.up('xs')]: {
        fontSize: 13,
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: 15,
    },
    [theme.breakpoints.up('md')]: {
        fontSize: 17,
    },
    
  },
  [`&.${tableCellClasses.body}`]: {
    [theme.breakpoints.down('sm')]: {
        fontSize: 12,
    },
    fontSize: 15,
    border: 'none',
    color: '#791314'
  },
}));

const img = {
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    objectFit:'cover'
}


const autoMargins = {
    marginTop: 'auto' ,
    marginBottom: 'auto',
}


export default Cart;
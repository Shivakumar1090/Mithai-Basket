import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { GET_PRODUCTS } = require('../../apis/products');

const DOMAIN = process.env.REACT_APP_DOMAIN;



const Products = () => {
    const Navigate = useNavigate();

    const user = useSelector(state => state.user);
    const [selectedHover, setSelectedHovered] = useState(null);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(GET_PRODUCTS, {
                headers: {
                    Authorization: `Bearer ${user._id}`,
                },
            })
            .then(async (res) => {
                await setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Box padding='40px'>
                <Typography variant='h5' style={heading}>Our Products</Typography>
                <Divider color="#eee" light />
                <Box style={list}>
                    {products.map((single, hoveringkey) => {
                        return (
                            <Paper
                                key={single._id}
                                hoveringkey={single._id}
                                style={paper}
                                onClick={() => Navigate(`/product/${single._id}`, { state: { details: single } })}
                                elevation={hoveringkey === selectedHover ? 10 : 1}
                                onMouseOut={() => setSelectedHovered(null)}
                                onMouseOver={() => setSelectedHovered(hoveringkey)}
                            >
                                <img src={`${DOMAIN}/${single.img}`} alt={single.name} style={img}></img>
                                <Stack spacing={0.3} direction='column' padding='10px' color='#791314'>
                                    <Typography style={prodName}>{single.name}</Typography>
                                    <Typography fontWeight='700' >₹ {single.price}</Typography>
                                    <Box>
                                        <Chip
                                            label={<Typography variant="caption">{single.grams}{" "}grams</Typography>}
                                            size='small' variant="outlined" color="primary"
                                        />
                                    </Box>
                                </Stack>
                            </Paper>
                        )
                    })}
                </Box>
            </Box>
        </div>
    );
}

const heading = {
    marginBottom: "12px",
    fontWeight: '700',
}

const list = {
    marginTop: '30px',
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'auto auto auto auto',
    gap: '20px',
    rowGap: '50px',
    justifyContent: 'space-evenly',
}

const paper = {
    height: '380px',
    width: '280px',
    cursor: 'pointer',

}

const img = {
    height: '270px',
    objectFit: 'cover',
    width: '280px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',

}

const prodName = {
    fontSize: '19px',
    fontWeight: '400',
    textTransform: 'capitalize',
}

export default Products;
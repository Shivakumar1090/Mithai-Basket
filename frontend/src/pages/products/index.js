import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Chip, Divider, InputAdornment, InputBase, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';

const { GET_PRODUCTS } = require('../../apis/products');

const DOMAIN = process.env.REACT_APP_DOMAIN;



const Products = () => {
    const Navigate = useNavigate();

    const user = useSelector(state => state.user);
    const [selectedHover, setSelectedHovered] = useState(null);

    const [products, setProducts] = useState([]);
    const [search , setSearch] = useState("");

    const filteredProducts = products.filter((product) => {
        if (
          product.name.toLowerCase().includes(search)
        ) {
          return product;
        }
    });

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
                <Box display='flex' justifyContent='space-between' style={autoMargins}>
                    <Box style={autoMargins}>
                        <Typography variant='h5' style={heading}>Our Products</Typography>
                    </Box>
                    <Box style={searchBar}>
                        <InputBase
                            placeholder="Search"
                            style={{width:'500px', color: '#791314'}}
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon style={icon}/>
                                </InputAdornment>
                            }
                        />
                    </Box>
                    <Box marginLeft={15}>
                        {/* <Button variant="outlined" >Filter</Button> */}
                    </Box>
                </Box>
                <Divider color="#eee" light style={{marginTop: '15px'}}/>
                <Box style={list}>
                    {filteredProducts?.map((single, hoveringkey) => {
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

const icon = {
    fontSize: '28px',
    color: '#791314',
}

const heading = {
    // marginBottom: "12px",
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

const autoMargins = {
    marginTop: 'auto' ,
    marginBottom: 'auto',
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

const searchBar = {
    display: "flex",
    border: "1px solid #7F0606",
    borderRadius: "10px",
    padding: "7px",
    paddingLeft: "10px",
}

export default Products;
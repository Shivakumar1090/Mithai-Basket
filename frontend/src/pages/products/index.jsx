import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chip, Divider, Grid, InputAdornment, InputBase, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import { toast } from "react-toastify";
import CirculerLoader from "../../components/Loader/circularLoader";

const { GET_PRODUCTS } = require('../../apis/products');

const DOMAIN = process.env.REACT_APP_DOMAIN;

const Products = () => {
    const Navigate = useNavigate();

    const user = useSelector(state => state.user);
    const [selectedHover, setSelectedHovered] = useState(null);
    const [loading,setLoading] = useState(false);
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
        setLoading(true);
        axios
            .get(GET_PRODUCTS, {
                headers: {
                    Authorization: `Bearer ${user._id}`,
                },
            })
            .then(async (res) => {
                setLoading(false);
                await setProducts(res.data);
            })
            .catch((err) => {
                setLoading(false);
                toast.error("Something went wrong!");
                console.log(err);
            });
    }, []);

    if(loading)return <CirculerLoader />
    
    return (
        <div>
            <Box padding={{xs: '20px' , md: '40px'}}>
                <Box display='flex' justifyContent='space-between'>
                    <Box style={autoMargins}>
                        <Typography variant="heading">Our Items</Typography>
                    </Box>
                    <Box width = {{xs: '150px', sm: '250px' , md: '350px',lg: '500px'}} style={searchBar}>
                        <InputBase
                            placeholder="Search"
                            style={{width: '100%', color: '#791314',padding: '5px'}}
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon color="primary"/>
                                </InputAdornment>
                            }
                        />
                    </Box>
                </Box>
                <Divider color="#eee" light style={{margin: '15px 0px 25px 0px'}}/>
                <Grid 
                    container 
                    direction="row" 
                    justifyContent="center"  
                    alignItems="center"
                    rowSpacing={{ xs: 4, sm: 4, md: 7 }} 
                    columnSpacing={{ xs: 3, sm: 5, md: 8 }}
                >
                    {filteredProducts?.map((single, hoveringkey) => {
                        return (
                            <Grid item xs={10} sm={6} md={4} lg={3} key={single._id}>
                                <Paper
                                    hoveringkey={single._id}
                                    style={{ cursor: 'pointer'}}
                                    onClick={() => Navigate(`/product/${single._id}`, { state: { details: single } })}
                                    elevation={hoveringkey === selectedHover ? 10 : 1}
                                    onMouseOut={() => setSelectedHovered(null)}
                                    onMouseOver={() => setSelectedHovered(hoveringkey)}
                                >
                                    <Box height={{xs : '200px',md: '280px'}}  style={imageContainer}>
                                        <img src={`${DOMAIN}/${single.img}`} alt={single.name} style={img}></img>
                                    </Box>
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
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </div>
    );
}

const autoMargins = {
    marginTop: 'auto' ,
    marginBottom: 'auto',
}

const imageContainer = {
    width: '100%',
    overflow: 'hidden',
}

const img = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
}

const prodName = {
    fontSize: '19px',
    fontWeight: '400',
    textTransform: 'capitalize',
}

const searchBar = {
    border: "1px solid #7F0606",
    borderRadius: "10px",
}

export default Products;
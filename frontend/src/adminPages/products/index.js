import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import { Button, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { GET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, ADD_PRODUCT } = require("../../apis/products");

const DOMAIN = process.env.REACT_APP_DOMAIN;

const AdminProducts = () => {
    const user = useSelector(state => state.user);
    const [Data, setData] = useState([]);
    const [selectedHover, setSelectedHovered] = useState(null);

    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const [Name, setName] = useState("");
    const [Image, setImage] = useState(null);
    const [Price, setPrice] = useState("");
    const [grams, setGrams] = useState("");
    const [desc, setDesc] = useState("");

    const [editName, setEditName] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editGrams, setEditGrams] = useState("");
    const [editImg, setEditImg] = useState(null);
    const [pickedId, setPickedId] = useState("");

    useEffect(() => {
        axios.get(GET_PRODUCTS, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
            .then(async (res) => {
                await setData(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const deleteHandler = (id) => {
        console.log(id);
        axios.delete(DELETE_PRODUCT + id, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
            .then(() => {
                window.location.href = "/admin/products";
            })
            .catch(err => {
                console.log(err);
            })
    }

    const addHandler = (e) => {
        e.preventDefault();

        const newProd = new FormData();
        newProd.append("name", Name);
        newProd.append("img", Image);
        newProd.append("price", Price);
        newProd.append("grams", grams);
        newProd.append("desc", desc);

        axios
            .post(ADD_PRODUCT, newProd, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                },
            })
            .then(() => {
                console.log("saved");
                window.location.href = "/admin/products";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editHandler = (id) => {
        const editData = new FormData();
        editData.append("name", editName);
        editData.append("desc", editDesc);
        editData.append("grams", editGrams);
        editData.append("price", editPrice);
        editData.append("img", editImg);

        axios.put(EDIT_PRODUCT + id, editData, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
            .then(() => {
                window.location.href = "/admin/products";
            })
            .catch(err => {
                console.log(err);
            })
    }

    const editBox = (
        <Box style={ModalStyle}>
            <Typography style={heading}>Edit this Product</Typography>
            <TextField
                style={input}
                variant="standard"
                defaultValue={editName}
                label='Name'
                onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
                style={input}
                defaultValue={editGrams}
                label='Grams'
                variant="standard"
                onChange={(e) => setEditGrams(e.target.value)}
            />
            <TextField
                style={input}
                defaultValue={editPrice}
                label='price'
                variant="standard"
                onChange={(e) => setEditPrice(e.target.value)}
            />
            <TextField
                style={input}
                defaultValue={editDesc}
                variant="standard"
                multiline
                label='Description'
                onChange={(e) => setEditDesc(e.target.value)}
            />
            <Box textAlign='left' padding='5px'>
                <input
                    type='file'
                    size='medium'
                    onChange={(e) => setEditImg(e.target.files[0])}
                />
            </Box>
            <Button
                onClick={() => editHandler(pickedId)}
                style={{ width: '200px', background: '#222', color: '#fff', marginTop: '10px' }}
            >Edit</Button>
        </Box>
    )

    const createBox = (
        <Box style={ModalStyle}>
            <Typography style={heading}>Create a new Product</Typography>
            <TextField
                style={input}
                variant="standard"
                value={Name}
                label='Name'
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                style={input}
                variant="standard"
                value={desc}
                multiline
                label='Description'
                onChange={(e) => setDesc(e.target.value)}
            />
            <TextField
                style={input}
                variant="standard"
                value={Price}
                label='Price'
                onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
                style={input}
                variant="standard"
                value={grams}
                label='Grams'
                onChange={(e) => setGrams(e.target.value)}
            />
            <Box textAlign='left' padding='5px'>
                <input
                    type='file'
                    size='medium'
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </Box>
            <Button
                style={{ width: '200px', background: '#222', color: '#fff', marginTop: '10px' }}
                onClick={addHandler}
            >Add Product</Button>
        </Box>
    )


    return (<>{user.isAdmin ?
        <Box padding='30px'>
            <Box display='flex' justifyContent='space-between'>
                <Typography style={heading}>Products</Typography>
                <Button style={addBtn} onClick={() => setOpenCreate(true)}>Add a product</Button>
            </Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {
                    Data.map((product, hoverkey) => {
                        return (
                            <Grid item xs={6} key={product._id}>
                                <Paper style={row}
                                    key={product._id}
                                    hoverkey={product._id}
                                    elevation={hoverkey === selectedHover ? 3 : 0}
                                    onMouseOut={() => setSelectedHovered(null)}
                                    onMouseOver={() => setSelectedHovered(hoverkey)}
                                >
                                    <Box display='flex'>
                                        <img src={`${DOMAIN}/${product.img}`} alt='..' style={img}></img>
                                        <Typography style={name} >{product.name}</Typography>
                                        <Box style={{ marginTop: 'auto', marginBottom: 'auto', }}>
                                            <Typography style={word}>{product.grams} grams</Typography>
                                            <Typography style={word} fontWeight='bold'>₹ {product.price}</Typography>
                                        </Box>
                                    </Box>
                                    <Box style={{ marginTop: 'auto', marginBottom: 'auto', }}>
                                        <Button onClick={() => {
                                            setEditName(product.name);
                                            setEditGrams(product.grams);
                                            setEditPrice(product.price);
                                            setEditImg(product.img)
                                            setEditDesc(product.desc);
                                            setPickedId(product._id);
                                            setOpenEdit(true);
                                        }}
                                            style={{ padding: '5px', background: '#eb8546', color: '#fff', textTransform: "capitalize", marginRight: '12px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            style={{ padding: '5px', background: '#ed4253', color: '#fff', textTransform: "capitalize", }}
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>{editBox}</Modal>
            <Modal open={openCreate} onClose={() => setOpenCreate(false)}>{createBox}</Modal>
        </Box> : <Navigate to="/" />}</>
    );
}

const row = {
    display: 'flex',
    padding: '10px',
    justifyContent: 'space-between',
    marginBottom: '15px',
    color: '#9B4F50',
    borderBottom: '1px solid #aaa',
    // borderRight: '1px solid #eee',
}

const addBtn = {
    fontSize: '17px',
    color: '#791314',
    textDecoration: 'underline',
    textTransform: "capitalize",
}

const name = {
    fontSize: '22px',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '10px',
}

const word = {
    fontSize: '15px',
    marginLeft: '15px',
}

const img = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
}

const heading = {
    fontWeight: "bold",
    fontSize: "30px",
    marginBottom: "15px",
};

const input = {
    margin: "7px",
    width: "400px",
    color: "#791314",
    // border: "1px solid #791314",
    // borderRadius: "5px",
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

export default AdminProducts;
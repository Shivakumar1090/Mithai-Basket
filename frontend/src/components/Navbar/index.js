import { Link, useNavigate } from "react-router-dom";

import { Badge, Button, Stack, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";

import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/actions/user";
import { ClearCart } from "../../redux/actions/cart";


const Navbar = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);

    const logoutHandler = () => {
        dispatch(Logout());
        dispatch(ClearCart)
        window.localStorage.clear();
        Navigate("/");
    };

    return ( 
        <div>
            <Box style={appbar} >
                <Stack spacing={1} direction='row' style={autoMargins}>
                    {/* <img src={LadduImg} alt="" width={200}/> */}
                    <Link to={user.isAdmin ? "/admin" : "/products"} style={{ textDecoration: "none" }}>
                        <Typography sx={logo}>Mithai Basket</Typography>
                    </Link>
                </Stack>
                {/* <Box style={searchBar}>
                    <InputBase
                        placeholder="Search"
                        style={{width:'500px', color: '#791314'}}
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon style={icon}/>
                            </InputAdornment>
                        }
                    />
                </Box>
                 */}
                <Box style={autoMargins}>
                    <Stack spacing={2} direction='row' style={autoMargins}>
                        {
                            user.isLogged && 
                            <Typography color='primary' fontSize={{xs: '0px' , md: '15px'}} style={autoMargins}>
                                Hi... {user.name} 
                            </Typography>
                        }
                        {user.isLogged && !user.isAdmin &&
                            <Button sx={{fontSize: {xs: '11px' , md: '15px'}}} onClick={() => Navigate('/orders')}>Your Orders</Button>
                        } 
                        {
                            user.isLogged && !user.isAdmin &&
                            <Link to="/cart" style={{ textDecoration: "none"}} >
                                <Tooltip title='Cart' arrow disableInteractive>
                                    <Badge badgeContent={cart.length}  color="primary" overlap="circular">
                                        <LocalMallOutlinedIcon sx={icon}/>
                                    </Badge>
                                </Tooltip>
                            </Link>
                        }
                        {user.isLogged ? 
                            <Tooltip title="Logout" arrow disableInteractive>
                                <LogoutIcon sx={icon} cursor='pointer' onClick={logoutHandler}></LogoutIcon>
                            </Tooltip> : 
                            <Link to="/login" style={{ textDecoration: "none"}}>
                                <AccountCircleOutlinedIcon sx={icon} />
                            </Link>}
                    </Stack>
                </Box>
            </Box>
        </div>
     );
}

const logo = {
    fontFamily: "Raleway",
    color: "#791314",
    fontWeight: "600",
    fontSize: {xs: '18px' , sm: '22px', md: '25px'},
};

const appbar = {
    background: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "15px",
};

const icon = {
    fontSize: {xs: '22px', md: '28px'},
    color: '#791314',
}

const autoMargins = {
    marginTop: 'auto' ,
    marginBottom: 'auto',
}
  
 
export default Navbar;
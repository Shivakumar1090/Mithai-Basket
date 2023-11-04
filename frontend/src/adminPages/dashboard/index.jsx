import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import DensitySmallSharpIcon from '@mui/icons-material/DensitySmallSharp';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import CirculerLoader from '../../components/Loader/circularLoader';

const {GET_ORDERS} = require('../../apis/order');

function AdminDashBoard() {
    const navigate = useNavigate();
    const classes = styles();

    const user = useSelector(state => state.user);
    const [loading,setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [canceledOrders , setCancelledOrders] = useState(0);
    const [acceptedOrders , setAcceptedOrders] = useState(0);
    const [outfordelivaryOrders ,setOutfordelivaryOrders ] = useState(0);

    useEffect(() => {
        setLoading(true);
        axios.post(GET_ORDERS , {})
            .then(async(res) => {
                await setOrders(res.data);
                
                const cancelledCount = res.data.filter(ele => ele.status === "Cancelled").length;
                const acceptedCount = res.data.filter(ele => ele.status === "Accepted").length;
                const outForDeliveryCount = res.data.filter(ele => ele.status === "Out for Delivery").length;

                setCancelledOrders(cancelledCount);
                setAcceptedOrders(acceptedCount);
                setOutfordelivaryOrders(outForDeliveryCount);
                setLoading(false);
            })
            .catch(err => {
                toast.error("something went wrong!");
                setLoading(false);
                console.log(err);
            })
    }, [])

    if(loading)return <CirculerLoader />

    return <>{user.isAdmin ? <Box className={classes.adminDashboard}>
        <Box className={classes.dashboard}>
            <Box className={classes.sidebar}>
                <Box onClick={() => navigate("/admin")} className={classes.sidebarMenu}>
                    <GridViewSharpIcon color='primary' className={classes.menuIcon} />
                    <Typography>
                        DASHBOARD
                    </Typography>
                </Box>
                <Box onClick={() => navigate("/admin/products")} className={classes.sidebarMenu}>
                    <DensitySmallSharpIcon color="primary" className={classes.menuIcon} />
                    <Typography>
                        MY PRODUCTS
                    </Typography>
                </Box>
                <Box onClick={() => navigate("/admin/orders")} className={classes.sidebarMenu}>
                    <AddShoppingCartSharpIcon color='primary' className={classes.menuIcon}/>
                    <Typography>
                        ORDERS
                    </Typography>
                </Box>
                {/* <Box onClick={() => navigate("/dashboard")} className={classes.sidebarMenu}>
                    <ManageAccountsSharpIcon color='primary' className={classes.menuIcon} />
                    <Typography>
                        ACCOUNT SETTINGS
                    </Typography>
                </Box> */}
               


            </Box>
            <Box className={classes.statsContainer}>
                <Paper className={classes.orders} elevation={4}>
                    <Typography variant='h6' style={{ fontWeight: "bolder" }} color='primary' >Total Orders</Typography>
                    <Typography variant='h5' style={{ fontWeight: "bolder" }} >{orders?.length}</Typography>

                </Paper>
                <Paper className={classes.orders} elevation={4}>
                    <Typography variant='h6' style={{ fontWeight: "bolder" }} color='secondary' > Accepted Orders</Typography>
                    <Typography variant='h5' style={{ fontWeight: "bolder" }} >{acceptedOrders}</Typography>
                </Paper>
                <Paper className={classes.orders} elevation={4}>
                    <Typography variant='h6' style={{ fontWeight: "bolder" }} color='secondary' >Cancelled Orders </Typography>
                    <Typography variant='h5' style={{ fontWeight: "bolder" }} >{canceledOrders}</Typography>
                </Paper>
                <Paper className={classes.orders} elevation={4}>
                    <Typography style={{ fontWeight: "bolder",fontSize: '16px' }} color='secondary' >Out for Delivery Orders </Typography>
                    <Typography variant='h5' style={{ fontWeight: "bolder" }} >{outfordelivaryOrders}</Typography>
                </Paper>
            </Box>
        </Box>
    </Box> : <Navigate to="/" />}</>;
}

const styles = makeStyles({
    adminDashboard: {
        margin: 0,
        padding: 0,
    },
    dashboard:{
        display: "flex",
        flexDirection: 'row',
        height: "90vh",
        backgroundColor: "#f2ce2e",
    },
    sidebar:{
        width: '250px',
        // height: "100vh"
        backgroundColor: "white",
    },
    sidebarMenu:{
        display: "flex",
        alignItems: "center",
        margin: "10% 0",
        cursor: "pointer",
    },
    menuIcon: {
        margin: '0 5%',
    },
    statsContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
    },
    orders: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "200px",
        height: "100px",
    }
})

export default AdminDashBoard;


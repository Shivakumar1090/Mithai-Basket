import { Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import emptyCart from '../../Assets/cartImages/emptyCart.jpg';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
const EmptyCart = () => {
    const navigate = useNavigate();

    return ( 
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img width="400px" height="400px" src={emptyCart} alt="Cart is Empty" />
                    <Typography style={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem" }} >The Cart is Empty.</Typography>
                    <Button style={{ margin: "20px 0" }} onClick={() => navigate('/products')} variant="outlined" endIcon={<ArrowRightAltIcon />}>
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
     );
}
 
export default EmptyCart;
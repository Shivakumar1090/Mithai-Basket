import c1 from "../../Assets/Courasel_images/c1.png";
import c2 from "../../Assets/Courasel_images/c2.png";
import c3 from "../../Assets/Courasel_images/c3.png";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const classes = useStyles();
  const Navigate = useNavigate();
  var items = [
    {
      id: 0,
      imageName: c1,
    },
    {
      id: 1,
      imageName: c2,
    },
    {
      id: 2,
      imageName: c3,
    },
  ];
  return (
    <div className={classes.container}>
      <Box paddingTop='30px'>
        <Box
          style={{
            width: "75%",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Carousel>
            {items.map((item) => (
              <img key={item.id} src={item.imageName} className={classes.cimg} alt=""></img>
            ))}
          </Carousel>
        </Box>
        <Box textAlign='center' marginTop='20px'>
          <Typography fontSize='22px' fontWeight='bold'>You can't buy happiness, but you can buy dessert and that's kind of the same thing.</Typography>
          <Button variant="outlined"  style={{marginTop: '10px'}} onClick={() => Navigate('/products')}>Shop Now!</Button>
        </Box>
      </Box>
    </div>
  );
};

const useStyles = makeStyles({
  RightBox: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  cimg: {
    objectFit: "cover",
    width: "100%",
    height: "65vh",
    borderRadius: "30px",
    "@media only screen and (max-width: 720px)": {
      height: "30vh",
    },
  },
});

export default Welcome;

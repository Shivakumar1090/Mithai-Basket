import bg from "../../Assets/bg.jpg";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ButtonContained from "../../components/Button/containedButton";

const Welcome = () => {
  const Navigate = useNavigate();
  return (
    <div>
      <div style={{ 
        backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.5)),url(${bg})`, 
        backgroundSize: 'cover', 
        height: '95vh',
        backgroundPosition: 'center'
      }}>
        <Container
          maxWidth="md"
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%',textAlign: 'center'}}
        >
          <Typography variant="h5" sx={{color: '#ddd', fontFamily: "Raleway", fontWeight: '700'}} component="div" gutterBottom>
              You can't buy happiness, but you can buy dessert and that's kind of the same thing.
          </Typography>
          <ButtonContained 
              text="Shop Now!"
              width="200px"
              onClick={() => Navigate('/products')}
              background="#CC8023"
              HoverBg = "orange"
          />
        </Container>
      </div>
    </div>
  );
};


export default Welcome;

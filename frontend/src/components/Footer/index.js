import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Footer = () => {
  return (
    <div style={{position: 'relative'}}>
        <Box style={container}>
            <Box>
                <Typography>Mithai Shop</Typography>
                <Typography>
                We source the authentic desi "flavours" and regional savours from the
                best regional vendors who are known for generations for these amazing
                delicacies.
                </Typography>
            </Box>
            <Box>
                <Typography>QUICK LINKS</Typography>
            </Box>
        </Box>
    </div>
  );
};

const container = {
    background: '#791314',
    color: '#fff',
    // position: 'absolute',
    bottom: 0,
    fontFamily: 'Varela Round',
    display: 'flex',
    padding: '30px',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    justifyContent: 'space-around',
    "@media only screen and (max-width: 1024px)":{
        display: 'block',
        justifyContent: 'center',
    }
}

export default Footer;

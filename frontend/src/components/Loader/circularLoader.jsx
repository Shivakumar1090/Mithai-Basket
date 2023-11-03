import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const CirculerLoader = () => {
    return ( 
        <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="80vh">   
            <CircularProgress style={{color: '#791314',width : '50px',height: '50px'}}/>
        </Box>
    );
}
 
export default CirculerLoader;
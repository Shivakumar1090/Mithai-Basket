import { Button } from "@mui/material";

const ButtonContained = ({text,width,onClick,padding,fontSize,marginTop,color,background,HoverBg}) => {
    const btn = {
        width: width ? width : "50%",
        padding: padding ? padding : "7px",
        textTransform: "capitalize",
        fontSize: fontSize ? fontSize : "15px",
        background: background ? background : "#791314",
        color: color ? color : '#fff',
        marginTop: marginTop ? marginTop : '0px',
        '&:hover':{
            background: HoverBg ? HoverBg : "#791314",
        }
    }
    return ( 
        <Button sx={btn} onClick={onClick}>
            {text}
        </Button>
    );
}
 
export default ButtonContained;
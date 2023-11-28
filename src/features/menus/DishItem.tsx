import * as React from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dish from "../../shared/models/DishModel";

const DishItem: React.FunctionComponent<Dish> = ({
    name,
    picture,
    price,
    qty,
    type,
    ratings,
    isTableSelected,
    handleAddItem,
    isAdded,
})=>{
    return(
        <Card
        sx={{
            p:1,m: 1,width: 250,height:"100%"
        }}>
<img
src={picture}
style={{
    width:"100%",height:"100%",
    maxHeight: 170
}}

/>
<Typography component="h4">{name} </Typography>
<Typography>Price:{price} </Typography>
<Typography>Qty:{qty} </Typography>
<Typography>Type:{type} </Typography>
<Box
sx={{
    display: "flex",
    justifyContent:"center",
    pt:2,
    mt:2,
    borderTop:"1px solid #8888",

}}>
    <Button variant="contained"
    disabled={!isTableSelected || isAdded}
    onClick={handleAddItem}>
        {isAdded ? "Added" : "Order"}
    </Button>
</Box>
 </Card>  
    );
};
export default DishItem;

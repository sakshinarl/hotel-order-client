import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select,{ SelectChangeEvent} from "@mui/material/Select";
import User from "../../../shared/models/UserModel";

interface IOrderItemProps{
    tableNo: number;
    name: string;
    image: string;
    qty: string | number;
    timeToPrepare: number;
    status: number;
    users: User[];
    selectedChef: string;
    handleAccept:()=>void;
    handleReject:()=> void;
    handleCompleted:()=> void;
    getChef: (id: string)=> void;
    
}
const OrderItem: React.FunctionComponent<IOrderItemProps>=({
    tableNo,
    image,
    name,
    qty,
    timeToPrepare,
    users,
    getChef,
    handleAccept,
    handleCompleted,
    handleReject,
    status,
    selectedChef,

})=>{
    const [isChefSelected, setIsChefSelected] = React.useState<boolean>(false);

    const handleChange = (e: SelectChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        if(value) 
        {
            getChef(value as string);
            setIsChefSelected(true)
        }else{
            setIsChefSelected(false)

        }

    };
    return(
        <Card sx={{ p: 2}}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
                <img src={image} style={{ width: 100, height: 100}}/>
            </Grid>
<Grid item xs={12} md={4}>
<Typography component="h3">{name}</Typography>
<Typography component="h4">Quantity {qty} </Typography>
<Typography component="h4">TableNo {tableNo}</Typography>
<Typography>Prepare in: {timeToPrepare} Minutes</Typography>
</Grid>

<Grid item xs={12} md={3}
style={{ display: "flex", alignItems:"center"}}>
    <FormControl fullWidth>

    <InputLabel id="demo-simple-select-label">Chef Name</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Chef Name"
    value={selectedChef as unknown as  HTMLInputElement}
    defaultValue={selectedChef as unknown as HTMLInputElement}
    onChange={handleChange} 
    >
        <MenuItem value="">Select Chef</MenuItem>
    {Array.isArray(users) &&
    users?.map(({ _id,name })=>(
        
        <MenuItem value={_id}>
        {name?.first} {name?.last}
        </MenuItem>
    ))}
    
    </Select>
      </FormControl>
</Grid>
<Grid item xs={12}
md={3}
sx={{ display: "flex", alignItems:"center"}}
>
{ status == 0 && (
<Button variant="contained"
    color="success"
    sx={{ mr: 1}}
    size="large"
    onClick={handleAccept}
    disabled={!isChefSelected}
    >
      Accept
</Button>
)}
   {status  == 1 && (
     <Button variant="contained"
     color="primary"
     sx={{ mr: 1}}
     size="large"
     onClick={handleCompleted}
    //  disabled={!isChefSelected}
     >   
         complete
         </Button>
   )}
    <Button
    variant="contained"
    color="error"
    size="large"
    onClick={handleReject}
    >
        Reject
    </Button>
</Grid>
            </Grid>
        </Card>
    );
};
export default OrderItem;

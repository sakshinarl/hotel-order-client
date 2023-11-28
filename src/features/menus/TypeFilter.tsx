import * as React from "react";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface ITypeFilterProps{
    onChange(value: string): void;

}
const TypeFilter: React.FunctionComponent<ITypeFilterProps>=({
    onChange,

}) =>{
    const [checked,setChecked] = React.useState<string>("");
    
    const handleToggle =(value: string)=>()=>{
        if(checked == "veg"){
            setChecked("");

        }else{
            setChecked("veg");

        }
    };

    React.useEffect(()=>{
        onChange(checked);
    },[checked]);
    return(
        <Box sx={{ p:2, display: "flex", justifyContent: "space-between" }}>
            <Typography
            component="span">
                Veg only

            </Typography>
            <Switch
             edge="end"
             onChange={handleToggle("veg")}
             checked={checked.indexOf("veg") !== -1}
             inputProps={{
                "aria-labelledby":"switch-list-label-wifi",
             }}
            

            />
        </Box>
    );
};
export default TypeFilter;